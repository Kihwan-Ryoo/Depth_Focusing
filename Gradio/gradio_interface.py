import gradio as gr # pip install gradio
import numpy as np

########## return image값이 [-1,1]로 해주지 않으면 오류 발생 ##########


def depth_model(input_img):
    """깊이 추정 이미지 계산 (depth estimation 모델 입력 예정)

    Args:
        input_img (RGB Image): 3차원 rgb이미지

    Returns:
        depth_img (1D_Tensor) : 1차원 depth 이미지
    """
    # array로 변환하지 않을 시 오류 발생. 수정하지 말 것
    input_img = np.array(input_img, dtype=float)
    """
    
    input -> depth_image 모델구현
    
    """
    return "depth_img"


def segmentation_model(input_img):
    """깊이 추정 이미지 계산 (depth estimation 모델 입력 예정)

    Args:
        input_img (RGB Image): 3차원 rgb이미지

    Returns:
        depth_img (1D_Tensor) : 1차원 segmentation 이미지
    """
    # array로 변환하지 않을 시 오류 발생. 수정하지 말 것
    input_img = np.array(input_img, dtype=float)

    """
    
    input -> segmentated_image 모델구현
    
    """
    return "segmentated_img"


def shape_img(input_img):
    return str(np.array(input_img).shape)


def get_focus(input_img, col, row, black=True):
    """포커싱할 좌표를 찾는 함수 (gradio 페이지에선 두번째 탭)

    Args:
        input_img (RGB_Image): 원본 이미지
        col (int): column 값
        row (int): row값
        black (bool): 선을 흰색(False)으로 할 지 검은색(True)으로 할 지 선택. Defaults to True.

    Returns:
        input_img: 좌표를 찾는 격자가 표현되어 있는 원본이미지
    """
    input_img = np.array(input_img, dtype=float)
    input_img /= input_img.max()
    if black:
        input_img[row, :] = 0
        input_img[:, col] = 0
    else:
        input_img[row, :] = 1
        input_img[:, col] = 1

    return input_img


def Blurring(input_img, depth_img, segmented_img, standard_depth, standard_label):
    """label, segmented_img를 받아서 처음 이미지에 블러 효과를 주는 함수

    Args:
        input_img (3D_Tensor): 원본 이미지.
        depth_img (1D_Tensor): 깊이 추정 이미지.
        segmented_img (1D_tensor): 분할 처리된 이미지

    Returns:
        final_img: 블러 효과가 처리된 이미지
    """
    return "final_img"


def image_translation(input_img, col, row):
    # 깊이 추정
    depth_img = depth_model(input_img)
    segmentated_img = segmentation_model

    standard_depth, standard_label = depth_img[row, col], segmentated_img[row, col]
    final_img = Blurring(
        input_img, depth_img, segmentated_img, standard_depth, standard_label
    )
    return final_img


get_depth_and_segmented_img = gr.Parallel(
    gr.Interface(
        fn=depth_model,
        inputs="image",
        outputs=gr.Image(image_mode="L", label="depth Image"),
    ),
    gr.Interface(
        fn=depth_model,
        inputs="image",
        outputs=gr.Image(image_mode="L", label="depth Image"),
    ),
    gr.Interface(fn=shape_img, inputs="image", outputs="text"),
)

choice_focus = gr.Interface(
    fn=get_focus,
    inputs=[
        gr.Image(),
        gr.Slider(minimum=0, maximum=2000),  # 추후 동적으로 받을 예정 (가로크기)
        gr.Slider(minimum=0, maximum=2000),  # 추후 동적으로 받을 예정 (세로크기)
        gr.Checkbox(label="Black Line"),
    ],
    outputs=gr.Image(),
    live=True,
)

get_blurring_image = gr.Interface(
    fn=image_translation,
    inputs=[
        "image",
        gr.Number(label="col", precision=0),
        gr.Number(label="row", precision=0),
    ],
    outputs="image",
)


# demo = gr.TabbedInterface([get_depth_and_segmented_img,choice_focus,])
demo = gr.TabbedInterface(
    [
        get_depth_and_segmented_img,
        choice_focus,
        get_blurring_image,
    ],
    [
        "Get Depth Image & Segmentated Image",
        "Find Focus Position",
        "Get Blur Image",
    ],
)

demo.launch()
