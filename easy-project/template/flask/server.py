from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return 'Flask server (project created by easy-project)'


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
