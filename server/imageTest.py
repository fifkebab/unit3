from importlib.resources import path
import torch
import os
import base64

from flask import Flask, redirect, request, url_for, send_file
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Pong'


@app.route('/testrun')
def test_run():
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

    # Images
    imgs = ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80']  # batch of images

    # Inference
    results = model(imgs)

    # Results
    results.print()

    results.xyxy[0]  # img1 predictions (tensor)

    return str(results.pandas().xyxy[0])  # img1 predictions (pandas)


@app.route('/scan', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        extension = uploaded_file.filename.split('.')[1]
        uuid = base64.b64encode(os.urandom(16)).decode(
            'utf-8').replace("=", "").replace("+", "").replace("/", "")
        print(uuid)

        uploaded_file.save(os.path.join("images", f"{uuid}.{extension}"))
        # Model
        model = torch.hub.load('ultralytics/yolov5',
                               'yolov5s', pretrained=True)
        # Images
        # batch of images
        imgs = [f"http://localhost:5000/images/{uuid}.{extension}"]

        # Inference
        results = model(imgs)

        # Results
        results.print()

        os.remove(os.path.join("images", f"{uuid}.{extension}"))

        # img1 predictions (pandas)
        return str(results.pandas().xyxy[0].to_json())


@app.route('/images/<imagename>')
def image_serve(imagename):
    return send_file(os.path.join('images', imagename))


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
