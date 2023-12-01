from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/check', methods=['POST'])
def getData():
    getData = request.get_json()
    return jsonify({'data': getData})

@api.route('/sendData', methods=['GET'])
def sendData():
    response = api.test_client().post('/check', json={"key": "value"})
    received_data = response.get_json()

    return jsonify({'fromFlask': received_data})    

if __name__ == '__main__':
    api.run(debug=True)