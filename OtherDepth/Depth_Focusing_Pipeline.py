# -*- coding: utf-8 -*-
import numpy as np
import cv2
import torch
from transformers import AutoImageProcessor, Mask2FormerForUniversalSegmentation
from PIL import Image, ImageOps
from collections import defaultdict
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib import cm
import torch.nn.functional as F

exec(open("./models/disparity-estimation.py", "r").read())
exec(open("./models/disparity-adjustment.py", "r").read())
exec(open("./models/disparity-refinement.py", "r").read())
exec(open("./models/pointcloud-inpainting.py", "r").read())


def predict_segmentation(image):
    processor = AutoImageProcessor.from_pretrained(
        "facebook/mask2former-swin-base-coco-panoptic"
    )
    model = Mask2FormerForUniversalSegmentation.from_pretrained(
        "facebook/mask2former-swin-base-coco-panoptic"
    )

    inputs = processor(image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    predicted_segmentation = processor.post_process_panoptic_segmentation(
        outputs, target_sizes=[image.size[::-1]]
    )[0]
    print(predicted_segmentation.keys())  # dict_keys(['segmentation', 'segments_info'])
    return model, predicted_segmentation


def predict_depth(image):
    fltFocal = max(image.shape[1], image.shape[0]) / 2.0
    fltBaseline = 40.0

    TensorImage = torch.FloatTensor(
        np.ascontiguousarray(
            image.transpose(2, 0, 1)[None, :, :, :].astype(np.float32)
            * (1.0 / 255.0)
        )
    ).cuda()

    TensorDisparity = disparity_estimation(TensorImage)
    TensorDisparity = disparity_refinement(
        F.interpolate(
            input=TensorImage,
            size=(TensorDisparity.shape[2] * 4, TensorDisparity.shape[3] * 4),
            mode='bilinear',
            align_corners=False,
        ),
        TensorDisparity,
    )
    TensorDisparity = (
        F.interpolate(
            input=TensorImage,
            size=(TensorDisparity.shape[2], TensorDisparity.shape[3]),
            mode='bilinear',
            align_corners=False,
        )
        * (max(TensorImage.shape[2], TensorImage.shape[3]) / 256.0)
    )

    TensorDepth = (fltFocal * fltBaseline) / (TensorDisparity + 1e-7)
    
    NpyDisparity = TensorDisparity[0, 0, :, :].cpu().numpy()
    NpyDepth = TensorDepth[0, 0, :, :].cpu().numpy()
    
    DepthMap = (NpyDepth / fltBaseline * 255.0).clip(0.0, 255.0).astype(np.uint8)
    
    return NpyDisparity, NpyDepth, DepthMap


def draw_panoptic_segmentation(model, segmentation, segments_info):
    # get the used color map
    viridis = cm.get_cmap("viridis", torch.max(segmentation))
    fig, ax = plt.subplots()
    ax.imshow(segmentation)

    # legend (this part will be edited depending on web environment)
    instances_counter = defaultdict(int)
    handles = []
    # for each segment, draw its legend
    num = 1
    for segment in segments_info:
        segment_id = segment["id"]
        segment_label_id = segment["label_id"]
        segment_label = model.config.id2label[segment_label_id]
        label = f"{num}. {segment_label}-{instances_counter[segment_label_id]}"
        instances_counter[segment_label_id] += 1
        color = viridis(segment_id - 1)
        handles.append(mpatches.Patch(color=color, label=label))
        num += 1
    ax.legend(handles=handles, loc="center left", bbox_to_anchor=(1, 0.5))

    plt.axis("off")
    plt.show()
    print(f"choose a label to be focused (1 ~ {len(segments_info)})")


def blur_image(image, predicted_depth, predicted_segmentation, label, split_num):
    # 초점 label을 기준으로 한 depth 차이 맵핑
    depth_std = abs(
        predicted_depth
        - predicted_depth[predicted_segmentation["segmentation"] == label].mean()
    ) * np.array(predicted_segmentation["segmentation"] != label).astype(int)
    dep_max = np.max(depth_std)

    channel1_label = predicted_segmentation["segmentation"] == label
    label3channel = np.repeat(channel1_label[:, :, np.newaxis], 3, -1)
    img_filtered = image * np.array(label3channel)

    split = np.arange(0, dep_max, dep_max / split_num)

    result = np.zeros(np.array(image).shape)
    k = 1
    for i in split:
        channel1_range = np.logical_and(
            depth_std > i, depth_std <= (i + dep_max / split_num)
        )
        img_range_mask = (
            np.ones(np.array(image).shape[:-1]) * np.array(channel1_range)
        ).astype(np.uint8)
        result = cv2.copyTo(
            cv2.GaussianBlur(np.array(image), (k, k), 3), img_range_mask, result
        )
        k += 2
    result += img_filtered

    plt.axis("off")
    plt.imshow(result.astype(np.uint16))
    plt.show()

    return result


if __name__ == "__main__":
    image_path = "test_imgs/1.png"  # User Input

    # image pre-processing 1 && get segmentation map
    image = Image.open(image_path)
    image = ImageOps.exif_transpose(image)  # 이미지 업로드시 회전되는 문제 해결
    image = Image.fromarray(np.array(image)[:, :, 0:3])  # for input format

    print(np.array(image).shape)
    plt.imshow(image)
    plt.axis('off')
    plt.show()

    # depth
    ratio = 640 / max(np.array(image).shape[0], np.array(image).shape[1])
    image_resized = cv2.resize(np.array(image), dsize=(0, 0), fx=ratio, fy=ratio)
    disp_resized, depth_resized, depthmap = predict_depth(np.array(image_resized))
    disp = np.array(cv2.resize(disp_resized, dsize=np.transpose(np.zeros(np.array(image).shape[:-1]), (1, 0)).shape))
    depth = np.array(cv2.resize(depth_resized, dsize=np.transpose(np.zeros(np.array(image).shape[:-1]), (1, 0)).shape))

    print(disp.shape, depth.shape, depthmap.shape)
    plt.subplot(1, 3, 1)
    plt.imshow(disp, cmap='gray')
    plt.axis('off')
    plt.subplot(1, 3, 2)
    plt.imshow(depth, cmap='gray')
    plt.axis('off')
    plt.subplot(1, 3, 3)
    plt.imshow(depthmap, cmap='gray')
    plt.axis('off')
    plt.show()

    model, segmentation = predict_segmentation(image)

    draw_panoptic_segmentation(model, **segmentation)

    # blur, show, and save blurred-image (blurred using segmentation map and depth map)
    label = 9
    blurring_power = 8
    split_num = 5 * blurring_power
    image_blurred = blur_image(
        image, disp, segmentation, label, split_num
    )
#     plt.imsave(f"./Result/Kenburn/{image_path}_blurred.png", image_blurred)


