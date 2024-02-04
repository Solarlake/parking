from ultralytics import YOLO
import torch
import json

class Yolo:
    def __init__(self):
        self.model = YOLO('yolov8n.pt')
        self.has_cuda = torch.cuda.is_available()

    def predict_image(self, image_path, conf=0.1):
        results = self.model.predict(image_path, conf=conf)
        result = results[0]

        boxes = result.boxes
        names = result.names

        xyxy = boxes.xyxy.tolist()
        cls = boxes.cls.tolist()

        output = []
        for i, item in enumerate(cls):
            output.append({names[item]: xyxy[i]})

        return json.dumps(output)
    
    def predict_video(self, video_path, conf=0.1):
        results = self.model.predict(video_path, conf=conf, stream=True)
        result = results[0]

        boxes = result.boxes
        names = result.names

        xyxy = boxes.xyxy.tolist()
        cls = boxes.cls.tolist()

        output = []
        for i, item in enumerate(cls):
            output.append({names[item]: xyxy[i]})

        return json.dumps(output)