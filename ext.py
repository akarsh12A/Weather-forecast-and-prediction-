import numpy as np
import cirq
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
from geopy.geocoders import Nominatim
import matplotlib.pyplot as plt
import random
import folium


class QuantumWeatherPredictor:
    def __init__(self, location: str, prediction_window: int = 7):
        self.location = location
        self.prediction_window = prediction_window
        self.num_qubits = 3  # Using 3 qubits for demonstration

    def get_historical_weather_data(self) -> List[Tuple[datetime, float]]:
        """Generate mock historical weather data for the location."""
        historical_data = []
        base_date = datetime(2023, 1, 1)
        for i in range(30):  # 30 days of historical data
            date = base_date + timedelta(days=i)
            temperature = random.uniform(-10, 45)  # Temperature range from -10°C to 45°C
            historical_data.append((date, temperature))
        return historical_data

    def preprocess_data(self, historical_data: List[Tuple[datetime, float]]) -> List[int]:
        """Preprocess historical data to create binary input for quantum computing."""
        binary_data = []
        for _, temperature in historical_data:
            norm_temp = (temperature + 10) / 55  # Normalize between -10°C to 45°C
            binary_value = int(norm_temp * (2**self.num_qubits - 1))  # Map to binary range
            binary_data.append(bin(binary_value)[2:].zfill(self.num_qubits))
        return binary_data

    def prepare_quantum_circuit(self, binary_data: List[str]) -> cirq.Circuit:
        """Prepare a quantum circuit to predict extreme weather events."""
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

    def simulate_quantum_circuit(self, circuit: cirq.Circuit) -> Dict[str, int]:
        """Simulate the quantum circuit and return the results."""
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

    def analyze_quantum_results(self, counts: Dict[str, int]) -> float:
        """Analyze quantum measurement results."""
        total_shots = sum(counts.values())
        weighted_score = 0

        for bitstring, count in counts.items():
            prob = count / total_shots
            numeric_value = int(bitstring, 2) / (2**self.num_qubits - 1)
            weighted_score += prob * numeric_value

        return weighted_score

    def predict_extreme_weather(self, historical_data: List[Tuple[datetime, float]]) -> float:
        """Predict extreme weather events using quantum algorithms."""
        binary_data = self.preprocess_data(historical_data)
        circuit = self.prepare_quantum_circuit(binary_data)
        counts = self.simulate_quantum_circuit(circuit)
        prediction_score = self.analyze_quantum_results(counts)
        return prediction_score


class WeatherVisualizer:
    def __init__(self):
        pass

    def plot_historical_data(self, historical_data: List[Tuple[datetime, float]]):
        """Plot historical weather data."""
        dates = [entry[0] for entry in historical_data]
        temperatures = [entry[1] for entry in historical_data]
        plt.figure(figsize=(12, 6))
        plt.plot(dates, temperatures, marker='o', linestyle='-', color='teal', linewidth=2)
        plt.fill_between(dates, temperatures, color='lightblue', alpha=0.3)
        plt.xlabel('Date', fontsize=14)
        plt.ylabel('Temperature (°C)', fontsize=14)
        plt.title('Historical Weather Data', fontsize=16)
        plt.xticks(rotation=45)
        plt.grid(alpha=0.5)
        plt.tight_layout()
        plt.show()

    def create_location_map(self, location: str):
        """Display location on an interactive map."""
        geolocator = Nominatim(user_agent="weather_predictor")
        location_info = geolocator.geocode(location)

        if location_info:
            print(f"Location: {location_info.address}")
            print(f"Latitude: {location_info.latitude}, Longitude: {location_info.longitude}")

            # Create an interactive map
            weather_map = folium.Map(location=[location_info.latitude, location_info.longitude], zoom_start=10)
            folium.Marker(
                location=[location_info.latitude, location_info.longitude],
                popup=f"{location_info.address}",
                icon=folium.Icon(color="blue", icon="info-sign"),
            ).add_to(weather_map)

            weather_map.save("location_map.html")
            print("Interactive map saved as location_map.html")
        else:
            print("Could not find location. Please check the input.")

    def create_prediction_gauge(self, prediction: float):
        """Visualize prediction result using a gauge-style bar."""
        fig, ax = plt.subplots(figsize=(8, 4))

        ax.barh(['Extreme Weather Likelihood'], [prediction], color='orange', height=0.5)
        ax.set_xlim(0, 1)
        ax.set_xticks(np.linspace(0, 1, 6))
        ax.set_xlabel("Likelihood", fontsize=12)
        ax.set_title("Extreme Weather Prediction", fontsize=14)
        ax.grid(axis='x', alpha=0.5)

        # Adding annotations for clarity
        for i, value in enumerate([prediction]):
            ax.text(value + 0.02, i, f"{value:.2f}", va='center', fontsize=12, color='black')

        plt.tight_layout()
        plt.show()


# Main Execution
location = input("Enter a location (e.g., New York, USA): ")

# Get historical weather data
predictor = QuantumWeatherPredictor(location=location, prediction_window=7)
historical_data = predictor.get_historical_weather_data()

# Predict extreme weather events
prediction = predictor.predict_extreme_weather(historical_data)

# Visualize results
visualizer = WeatherVisualizer()
visualizer.plot_historical_data(historical_data)
visualizer.create_location_map(location)
visualizer.create_prediction_gauge(prediction)
