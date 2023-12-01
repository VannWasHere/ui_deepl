from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route('/check', methods=['POST'])
def getData():
    getData = request.get_json()
    return jsonify({'data': getData})



if __name__ == '__main__':
    api.run(debug=True)