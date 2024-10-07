from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = load_model('models.h5')  # Path to your model

# Directory where the images will be saved
UPLOAD_FOLDER = 'images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Image upload route
@app.route('/images', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({'message': 'Image uploaded successfully', 'filename': filename})


# Serve images statically
@app.route('/images/<filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    file = data.get('file')
    file_name = data.get('fileName')
    comment = data.get('comment')

    if not file_name:
        return jsonify({'error': 'No file uploaded.'}), 400

    # Load image and preprocess for the model
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))  # Resize as per model input
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = image / 255.0  # Normalize

    # Expand dimensions for batch size
    image = tf.expand_dims(image, 0)

    # Perform prediction using the loaded model
    prediction = model.predict(image)
    predicted_class = prediction.argmax()  # Assuming it's a classification model

    return jsonify({'message': 'Prediction successful', 'predicted_class': int(predicted_class), 'comment': comment})


# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, port=5000)
