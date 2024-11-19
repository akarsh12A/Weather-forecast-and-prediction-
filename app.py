from flask import Flask, jsonify, request
from flask_cors import CORS
from weather_pred1 import WeatherQuantumForecaster  # Adjust to match your file structure

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        # Parse JSON request data
        data = request.get_json()
        if not data or 'location' not in data:
            return jsonify({"error": "Missing 'location' field in the request."}), 400

        location_query = data["location"]
        forecaster = WeatherQuantumForecaster(n_qubits=4)

        # Search for locations matching the query
        locations = forecaster.search_locations(location_query)
        if not locations:
            return jsonify({"error": "Location not found"}), 404

        # Use the first found location for simplicity
        location = locations[0]
        latitude = location['lat']

        # Generate weather data
        weather_data, timestamps = forecaster.generate_simulated_weather_data(latitude)

        # Train the quantum model (optional)
        optimized_params, final_cost = forecaster.train_model(weather_data["temperature"])

        # Generate the base64 plot image
        plot_image = forecaster.visualize_forecast(weather_data, timestamps, location["address"])

        # Respond with weather data and plot image
        return jsonify({
            "weather_data": weather_data,
            "timestamps": [ts.isoformat() for ts in timestamps],
            "location": location,
            "plot_image": plot_image
        })

    except Exception as e:
        print(f"Error occurred: {e}")  # Optional logging for debugging
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Specify port 5000 for the first app
