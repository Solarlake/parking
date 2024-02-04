from ultralytics import YOLO
from PIL import Image
import cv2
import json
import torch

model = YOLO('yolov8n.pt')
print(f"has cuda: {torch.cuda.is_available()}")

results = model.predict("images/gilbert.mp4", conf=0.1, stream=True)
results = results[0]

boxes = results.boxes
names = results.names

xyxy = boxes.xyxy.tolist()
cls = boxes.cls.tolist()

output = []
for i, item in enumerate(cls):
    output.append({names[item]: xyxy[i]})
    print(names[item], xyxy[i])

with open("results.json", "w") as file:
    json.dump(output, file)
