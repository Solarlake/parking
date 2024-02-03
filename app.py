from flask import Flask, render_template, request
import os

app = Flask('app')
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')



app.run(host='127.0.0.1', port=5000)
