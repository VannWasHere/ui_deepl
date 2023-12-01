from flask import Flask, request, jsonify, g
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

api.config['stored_data'] = None

@api.route('/check', methods=['POST'])
def handle_post():
    received_data = request.get_json()
    api.config['stored_data'] = received_data
    
    return jsonify({'data': received_data})

@api.route('/sendData', methods=['GET'])
def handle_get():
    data = api.config['stored_data']
    return jsonify({"data": data})

if __name__ == '__main__':
    api.run(debug=True)
