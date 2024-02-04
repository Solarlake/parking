from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
# import os
import json
from yolo import Yolo

app = Flask('app')
app.static_folder = 'static'
socketio = SocketIO(app)

yolo = Yolo()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/start')
def start():
    yolo.predict_video_track('static/videos/backing.mp4')
    return json.dumps({"status": "done"})

@app.route('/api/get')
def get():
    return yolo.current["data"]

# app.run(host='127.0.0.1', port=5000)

# === socket ===

import time
from threading import Thread

def send_data():
    while True:
        socketio.emit('data', yolo.current["data"])
        time.sleep(0.0416666667) # 24 fps

if __name__ == "__main__":
    t = Thread(target=send_data)
    t.daemon = True
    t.start()
    socketio.run(app)
