from ultralytics import YOLO
import torch
import json
import cv2

class Yolo:
    def __init__(self):
        self.model = YOLO('yolov8x.pt')
        self.has_cuda = torch.cuda.is_available()
        self.current = {
            "width": 0,
            "height": 0,
            "data": None
        }

    # uses cv2 to show the video with the bounding boxes
    def predict_video_track(self, video_path):
        print(f"has cuda: {self.has_cuda}")
        cap = cv2.VideoCapture(video_path)

        self.current["width"] = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.current["height"] = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            results = self.model.track(frame, persist=True)
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
                self.current["data"] = output

            annotated_frame = results[0].plot()
            cv2.imshow("frame", annotated_frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cv2.destroyAllWindows()

    # def predict_image(self, image_path, conf=0.1):
    #     results = self.model.predict(image_path, conf=conf)
    #     result = results[0]

    #     boxes = result.boxes
    #     names = result.names

    #     xyxy = boxes.xyxy.tolist()
    #     cls = boxes.cls.tolist()

    #     output = []
    #     for i, item in enumerate(cls):
    #         output.append({names[item]: xyxy[i]})

    #     return json.dumps(output)
    
    # def predict_video(self, video_path, conf=0.1):
    #     results = self.model.predict(video_path, conf=conf, stream=True)
    #     result = results[0]

    #     boxes = result.boxes
    #     names = result.names

    #     xyxy = boxes.xyxy.tolist()
    #     cls = boxes.cls.tolist()

    #     output = []
    #     for i, item in enumerate(cls):
    #         output.append({names[item]: xyxy[i]})

    #     return json.dumps(output)
        
    

