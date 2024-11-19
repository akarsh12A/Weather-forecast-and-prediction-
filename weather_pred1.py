import base64
from io import BytesIO
import cirq
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
from typing import List, Tuple, Dict
from matplotlib.dates import DateFormatter
from geopy.geocoders import Nominatim
from scipy.optimize import minimize

class WeatherQuantumForecaster:
    def __init__(self, n_qubits: int = 4):
        self.n_qubits = n_qubits
        self.qubits = [cirq.GridQubit(0, i) for i in range(n_qubits)]
        self.simulator = cirq.Simulator()
        self.geocoder = Nominatim(user_agent="quantum_weather_app")

    def search_locations(self, query: str) -> List[Dict[str, str]]:
        """Search for locations matching the query."""
        try:
            locations = self.geocoder.geocode(query, exactly_one=False)
            return [{"address": loc.address,
                     "lat": loc.latitude,
                     "lon": loc.longitude} for loc in locations[:5]]
        except Exception as e:
            print(f"Error searching locations: {e}")
            return []

    def generate_simulated_weather_data(self, latitude: float, days_past: int = 30, days_future: int = 14) -> Tuple[Dict[str, List[float]], List[datetime]]:
        """Generate simulated weather data for temperature, humidity, and thunderstorm probability."""
        now = datetime.utcnow()
        past_start = now - timedelta(days=days_past)
        future_end = now + timedelta(days=days_future)

        total_hours = (days_past + days_future) * 6  # Sample every 4 hours
        timestamps = [past_start + timedelta(hours=4 * i) for i in range(total_hours)]

        base_temp = 30 - abs(latitude) / 2
        temperatures, humidity, thunderstorms = [], [], []

        for ts in timestamps:
            hour_factor = -np.cos((ts.hour - 14) * 2 * np.pi / 24) * 5
            seasonal_factor = np.cos((ts.timetuple().tm_yday - 172) * 2 * np.pi / 365) * 10
            noise = np.random.normal(0, 1)

            temp = base_temp + hour_factor + seasonal_factor + noise
            humid = 60 + np.sin(ts.hour * 2 * np.pi / 24) * 10 + np.random.normal(0, 5)
            thunderstorm_chance = max(0, min(1, 0.1 * abs(np.cos(ts.hour * 2 * np.pi / 24)) + np.random.normal(0, 0.05)))

            temperatures.append(temp)
            humidity.append(humid)
            thunderstorms.append(thunderstorm_chance * 100)

        return {
            "temperature": temperatures,
            "humidity": humidity,
            "thunderstorm_chance": thunderstorms
        }, timestamps

    def normalize_data(self, data: List[float]) -> np.ndarray:
        arr = np.array(data)
        return (arr - np.min(arr)) / (np.max(arr) - np.min(arr))

    def create_quantum_circuit(self, params: np.ndarray) -> cirq.Circuit:
        circuit = cirq.Circuit()
        for i, qubit in enumerate(self.qubits):
            circuit.append(cirq.rx(params[i])(qubit))
        for i in range(len(self.qubits) - 1):
            circuit.append(cirq.CNOT(self.qubits[i], self.qubits[i + 1]))
        for i, qubit in enumerate(self.qubits):
            circuit.append(cirq.ry(params[i + len(self.qubits)])(qubit))
        return circuit

    def simulate_circuit(self, params: np.ndarray) -> float:
        circuit = self.create_quantum_circuit(params)
        result = self.simulator.simulate(circuit)
        return np.real(result.final_state_vector[0])

    def train_model(self, temperatures: List[float]) -> Tuple[np.ndarray, float]:
        normalized_temps = self.normalize_data(temperatures)
        def cost_function(params):
            predictions = [self.simulate_circuit(params) for _ in range(10)]  # Sample only a subset
            return np.mean((predictions - normalized_temps[:10])**2)

        initial_params = np.random.randn(2 * self.n_qubits)
        result = minimize(cost_function, initial_params, method='L-BFGS-B')
        return result.x, result.fun

    def visualize_forecast(self, weather_data: Dict[str, List[float]], timestamps: List[datetime], location_name: str):
        """Visualize forecast with user-friendly plots and return as base64."""
        now = datetime.utcnow()
        current_idx = min(range(len(timestamps)), key=lambda i: abs(timestamps[i] - now))

        plt.figure(figsize=(15, 10))
        colors = {"past": "skyblue", "present": "limegreen", "future": "salmon"}

        for i, (key, values) in enumerate(weather_data.items()):
            plt.subplot(3, 1, i + 1)

            plt.plot(timestamps[:current_idx], values[:current_idx], color=colors["past"], label=f"Historical {key.capitalize()}", linewidth=2)
            plt.plot(timestamps[current_idx], values[current_idx], 'o', color=colors["present"], label=f"Current {key.capitalize()}", markersize=8)
            plt.plot(timestamps[current_idx:], values[current_idx:], '--', color=colors["future"], label=f"Forecast {key.capitalize()}", linewidth=2)

            plt.xlabel("Time")
            plt.ylabel(key.capitalize())
            plt.title(f"{key.capitalize()} Forecast for {location_name}")
            plt.grid(True, alpha=0.3)
            plt.legend(loc="upper left")
            plt.gca().xaxis.set_major_formatter(DateFormatter("%Y-%m-%d %H:%M"))
            plt.xticks(rotation=45)

        plt.tight_layout()

        buf = BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_str = base64.b64encode(buf.read()).decode("utf-8")
        buf.close()

        return img_str
