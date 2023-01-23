from importlib.resources import path
import torch
import os
import base64

from flask import Flask, redirect, request, url_for, send_file
app = Flask(__name__)


@app.route('/')
def hello_world():
    # This is a test for the user interface/app to check if the server is running and available
    return 'Pong'

# Mark the route as a POST request, meaning it can accept files and data


@app.route('/scan', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']  # Get the file from the request

    # See if there is a file attached
    if uploaded_file.filename != '':

        # Get the file extension, used to determine the file type
        extension = uploaded_file.filename.split('.')[1]

        # Generate a random UUID for the file name, used to make sure that each file is unique and never overwritten
        uuid = base64.b64encode(os.urandom(16)).decode(
            'utf-8').replace("=", "").replace("+", "").replace("/", "")

        # Save the file to the server
        uploaded_file.save(os.path.join("images", f"{uuid}.{extension}"))

        # Load the model into Torch, to prepare for object detection
        model = torch.hub.load('ultralytics/yolov5',
                               'yolov5s', pretrained=True)

        # Put the location of where the newly saved image is at.
        imgs = [f"images/{uuid}.{extension}"]

        # Process the image using the model, and save to a variable called results.
        results = model(imgs)

        # Delete the image from the server
        os.remove(os.path.join("images", f"{uuid}.{extension}"))

        # Send the results back to the client
        return str(results.pandas().xyxy[0].to_json())


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
