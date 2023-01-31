import numpy as np
import cv2

def Focusing(img :np.ndarray , img_depth :np.ndarray , label : int , label_map :np.ndarray , blur_strength = 1, split = 100):
    layer = []
    depth_range = img_depth.max() - img_depth.min()
    sep = depth_range/split
    label_depth_mean = label_depth(img_depth, label, label_map)

    ### 포커싱 영역 마스크 저장
    label_mask = np.where(label_map == label,1,0)
    label_mask = label_mask.astype(np.uint8)
    

    
    ### split 수 만큼 depth별로 나누고 영역 마스크 저장
    for k in range(split+1):

        layer.append(np.where((img_depth >= img_depth.min()+sep*k) & (img_depth < img_depth.min()+sep*(k+1)),1,0))
        layer[k] = layer[k].astype(np.uint8)

    ### 이미지 합성
    ### 사진 전체를 blur 처리 한 후에 depth별로 나눈 마스크를 이용하여 해당 영역만 합성하는 방법 사용
    ### 마지막 포커싱 영역 마스크 이용하여 이미지 합성
    result_img = np.zeros(img.shape)
    for k in range(split+1):
        result_img = cv2.copyTo(cv2.GaussianBlur(img, (45, 45), abs((k-int(img_depth.min()-label_depth_mean/sep))/15*blur_strength)), layer[k], result_img)
    result_img = cv2.copyTo(img, label_mask, result_img)
    return result_img


def label_depth(img_depth , label : int, label_map):
    img_index = np.where(label_map == label)
    depth_sum = 0
    for i in range(len(img_index[0])):
        depth_sum += img_depth[i][i]
    return depth_sum/len(img_index[0])

