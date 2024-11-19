from flask import Flask, request, jsonify, send_file
import matplotlib.pyplot as plt
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests for local React frontend

from for2 import LocationManager, visualize_weather_attributes  # Replace with actual file name

location_manager = LocationManager()

@app.route('/get_weather_visualization', methods=['POST'])
def get_weather_visualization():
    try:
        data = request.json
        city_name = data.get('city')
        
        if not city_name:
            return jsonify({"error": "City name is required"}), 400
        
        result = location_manager.get_coordinates(city_name)
        if not result:
            return jsonify({"error": f"Location '{city_name}' not found"}), 404
        
        latitude, longitude, address = result
        print(f"Generating visualization for {address}...")

        # Generate the visualization
        plt.figure()
        visualize_weather_attributes(latitude)
        
        # Save plot to a BytesIO stream
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()
        
        return send_file(img, mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Specify port 5001 for the second app
