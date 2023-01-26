import numpy as np
import cv2

def Focusing(img , img_depth , label : int , label_map , blur_strength = 1, split = 100):
    ### 이미지 cv2로 불러와 array로 변환
    img = cv2.imread(img, cv2.IMREAD_COLOR)
    img_depth = cv2.imread(img_depth, cv2.IMREAD_ANYDEPTH)
    label_map = cv2.imread(img_depth, cv2.IMREAD_UNCHANGED)

    layer = []
    depth_range = img_depth.max() - img_depth.min()
    sep = depth_range/split

    ### 포커싱 영역 저장
    label_index = np.where(label_map == label)
    label_mask = np.where(label_map == label,1,0)
    label_mask = label_mask.astype(np.uint8)
    foucsing_img = np.zeros(img.shape)
    for i in range(len(label_index[0])):
        foucsing_img[label_index[0][i]][label_index[1][i]] = img[label_index[0][i]][label_index[1][i]]
    
    label_depth_mean = label_depth(img_depth, label, label_map)
    
    ### split 수 만큼 layer 나누고 블러 처리
    for k in range(split):

        img_index = np.where((img_depth >= img_depth.min()+sep*k) & (img_depth <= img_depth.min()+sep*(k+1)))
        layer.append(np.zeros(img.shape))

        for i in range(len(img_index[0])):
            layer[k][img_index[0][i]][img_index[1][i]] = img[img_index[0][i]][img_index[1][i]]
        
        layer[k] = cv2.GaussianBlur(layer[k], (45, 45), abs((k-int(img_depth.min()-label_depth_mean/sep))/15*blur_strength))


    result_img = np.zeros(img.shape)
    for k in range(split):
        result_img = result_img + layer[k]
    cv2.copyTo(foucsing_img, label_mask, result_img)
    return result_img


def label_depth(img_depth , label : int, label_map):
    img_index = np.where(label_map == label)
    depth_sum = 0
    for i in range(len(img_index[0])):
        depth_sum += img_depth[i][i]
    return depth_sum/len(img_index[0])

