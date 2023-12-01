from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

api = Flask(__name__)
CORS(api)

api.config['stored_data'] = None

# model = pickle.load(open('nn_model.pkl', 'rb'))
X_scaler = pickle.load(open('X_scaler.pkl', 'rb'))
y_scaler = pickle.load(open('y_scaler.pkl', 'rb'))

@api.route('/check', methods=['POST'])
def handle_post():
    stored_data_dict = api.config.get('stored_data', {})
    stored_data_list = list(stored_data_dict.values())
    
    print(stored_data_list)


@api.route('/sendData', methods=['GET'])
def handle_get():
    data = api.config['stored_data']
    return jsonify({"data": data})

if __name__ == '__main__':
    api.run(debug=True)
