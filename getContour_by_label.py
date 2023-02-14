import numpy as np
import cv2
import pickle

### 'test_imgs/classroom__rgb_00283.jpg' 이미지에 대한 각 클래스별 contour를 확인할 수 있다.
### imgContour 변수를 확인해보면 contour에 해당하는 픽셀의 값이 현재는 255로 나타나는 것을 볼 수 있을 것이다.

def getContour_by_label(predicted_segmentation : dict, label : int):
    img_seg = np.array(predicted_segmentation['segmentation'] == label).astype(np.uint8)
    imgContour = img_seg.copy()

    contours, hierarchy = cv2.findContours(img_seg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    for cnt in contours:
        cv2.drawContours(imgContour, cnt, -1, (255, 0, 0), 3)

    cv2.imshow('imgContour', imgContour)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


if __name__ == '__main__':
    with open('test_imgs/classroom__rgb_00283_predicted_segmentation.pkl','rb') as f:
        predicted_segmentation = pickle.load(f)
    print(type(predicted_segmentation))
    print(predicted_segmentation)
    getContour_by_label(predicted_segmentation, 10)