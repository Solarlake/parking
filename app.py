from flask import Flask, render_template, request
import os
from yolo import Yolo

app = Flask('app')
app.static_folder = 'static'

yolo = Yolo()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get')
def get():
    return yolo.predict_image('static/images/park-sample2.png')

app.run(host='127.0.0.1', port=5000)
