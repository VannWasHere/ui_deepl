from flask import Flask, request, jsonify
import numpy as np
import json
from flask_cors import CORS
import pickle

api = Flask(__name__)
CORS(api)

api.config['stored_data'] = {}

@api.route('/check', methods=['POST'])
@api.route('/check', methods=['POST'])
def handle_post():
    try:
        received_data = request.get_json()
        stored_data_list = received_data.get('data', [])

        print("Received Data:", stored_data_list)

        if not stored_data_list:
            return jsonify({'error': 'No data stored'})

        stored_data_list = [float(i) for i in stored_data_list]
        prediction = ValuePredictor(stored_data_list)

        api.config['prediction'] = prediction

        return prediction
    except Exception as e:
        return jsonify({'error': str(e)})




def ValuePredictor(to_predict_list):
    to_predict = np.array(to_predict_list).reshape(-1, 1)

    loaded_model = pickle.load(open("nn_model.pkl", "rb"))
    X_scaler = pickle.load(open('X_scaler.pkl', 'rb'))
    y_scaler = pickle.load(open('y_scaler.pkl', 'rb'))
    # Scale user input
    to_predict_scaled = X_scaler.transform(to_predict)

    # Reshape to original shape
    backshape = to_predict_scaled.reshape(1, -1)
    # Predict
    result = loaded_model.predict(backshape)

    # Inverse transform the result
    result = y_scaler.inverse_transform(result)

    # Convert the result to a JSON
    result = result.tolist()
    result_json = json.dumps(result)
    return result_json

@api.route('/sendData', methods=['GET'])
def handle_get():
    prediction = api.config.get('prediction')
    return jsonify({"output": prediction})


if __name__ == '__main__':
    api.run(debug=True)
