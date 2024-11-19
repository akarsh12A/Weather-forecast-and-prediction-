from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import numpy as np
import cirq
from geopy.geocoders import Nominatim
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains (optional)

class QuantumWeatherPredictor:
    def __init__(self, location: str, prediction_window: int = 7):
        self.location = location
        self.prediction_window = prediction_window
        self.num_qubits = 3  # Using 3 qubits for demonstration

    def get_historical_weather_data(self):
        historical_data = []
        base_date = datetime(2023, 1, 1)
        for i in range(30):  # 30 days of historical data
            date = base_date + timedelta(days=i)
            temperature = random.uniform(-10, 45)  # Temperature range from -10°C to 45°C
            historical_data.append((date, temperature))
        return historical_data

    def preprocess_data(self, historical_data):
        binary_data = []
        for _, temperature in historical_data:
            norm_temp = (temperature + 10) / 55  # Normalize between -10°C to 45°C
            binary_value = int(norm_temp * (2**self.num_qubits - 1))  # Map to binary range
            binary_data.append(bin(binary_value)[2:].zfill(self.num_qubits))
        return binary_data

    def prepare_quantum_circuit(self, binary_data):
        qubits = [cirq.NamedQubit(f'q{i}') for i in range(self.num_qubits)]
        circuit = cirq.Circuit()

        for qubit in qubits:
            circuit.append(cirq.H(qubit))  # Create superposition

        for i, bitstring in enumerate(binary_data):
            for j, bit in enumerate(bitstring):
                if bit == '1':
                    circuit.append(cirq.X(qubits[j]))

        circuit.append(cirq.measure(*qubits, key='measurement'))
        return circuit

    def simulate_quantum_circuit(self, circuit):
        simulator = cirq.Simulator()
        result = simulator.run(circuit, repetitions=1000)
        measurement_results = result.measurements['measurement']

        bitstrings = [
            ''.join(map(str, measurement[::-1]))  # Reverse order for little-endian
            for measurement in measurement_results
        ]

        counts = {}
        for bitstring in bitstrings:
            counts[bitstring] = counts.get(bitstring, 0) + 1

        return counts

    def analyze_quantum_results(self, counts):
        total_shots = sum(counts.values())
        weighted_score = 0

        for bitstring, count in counts.items():
            prob = count / total_shots
            numeric_value = int(bitstring, 2) / (2**self.num_qubits - 1)
            weighted_score += prob * numeric_value

        return weighted_score

    def predict_extreme_weather(self, historical_data):
        binary_data = self.preprocess_data(historical_data)
        circuit = self.prepare_quantum_circuit(binary_data)
        counts = self.simulate_quantum_circuit(circuit)
        prediction_score = self.analyze_quantum_results(counts)
        return prediction_score

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    location = data['location']

    # Initialize Quantum Weather Predictor
    predictor = QuantumWeatherPredictor(location=location)
    historical_data = predictor.get_historical_weather_data()

    # Predict extreme weather events
    prediction = predictor.predict_extreme_weather(historical_data)

    # Return prediction as a response
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True,port=5003)
