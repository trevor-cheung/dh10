from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

user_input = ""
from flask import Response

@app.route("/api/get", methods=['GET'])
def get_data():
    global user_input
    return {"response": [user_input]}

@app.route("/api/submit", methods=['POST', 'GET'])
def submit_data():
    input_data = request.json.get('inputValue')
    print("received info")
    global user_input
    user_input = input_data + " response from backend"
    get_data()
    return {"response": ["response:", input_data]}

if __name__ == '__main__':
    app.run()