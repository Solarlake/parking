from ultralytics import YOLO
from PIL import Image
import cv2
import json
import torch

model = YOLO('yolov8x.pt')
print(f"has cuda: {torch.cuda.is_available()}")

video_path = "images/gilbert.mp4"
cap = cv2.VideoCapture(video_path)

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break

    results = model.track(frame, persist=True)
    result = results[0]
    boxes = result.boxes
    names = result.names
    xyxy = boxes.xyxy.tolist()
    cls = boxes.cls.tolist()
    ids = boxes.id.tolist()
    output = []
    for i, id in enumerate(ids):
        output.append({id: xyxy[i]})
        print(output[-1])

    annotated_frame = results[0].plot()
    cv2.imshow("frame", annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()




# with open("results.json", "w") as file:
#     json.dump(output, file)
