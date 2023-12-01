from flask import Flask, request, jsonify
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/check', methods=['POST'])
def getData():
    received_data = request.get_json()
    return jsonify({'data': received_data})

@api.route('/sendData', methods=['GET'])
def sendData():
    return jsonify({"data": "mydata"})

if __name__ == '__main__':
    api.run(debug=True)
