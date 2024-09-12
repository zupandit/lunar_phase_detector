from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from fastai.learner import load_learner
from fastai.vision.core import PILImage
import os

app = Flask(__name__)
app.secret_key = "secret"
model = load_learner('./static/19yearsExportGray100epoch.pkl')

ALLOWED_EXTENSIONS = {'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'moonImage' not in request.files:
            return "No file part", 400
        
        file = request.files['moonImage']
        
        if file.filename == '':
            return "No selected file", 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            temp_dir = os.path.join('./static', 'temp')
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            file_path = os.path.join(temp_dir, filename)
            file.save(file_path)
            
            # Load the image and make a prediction
            img = PILImage.create(file_path)
            pred, pred_idx, probs = model.predict(img)
            
            # Create the result string
            result = f'Prediction: Day {pred}, Probability: {probs[pred_idx]:.4f}'
            
            # Return only the result as a response
            return result

    return render_template('index.html')

if __name__ == '__main__':
    app.run()
