from flask import Flask, render_template, request
import os
import json
from yolo import Yolo

app = Flask('app')
app.static_folder = 'static'

yolo = Yolo()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/start')
def start():
    yolo.predict_video_track('static/videos/gilbert.mp4')
    return json.dumps({"status": "done"})

@app.route('/api/get')
def get():
    # return yolo.predict_image('static/images/park-sample2.png')
    return yolo.current["data"]

app.run(host='127.0.0.1', port=5000)
