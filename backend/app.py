from flask import Flask, jsonify, request  # Add 'request' here
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

# Configure MongoDB
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# Route to load data into MongoDB
@app.route('/load_data', methods=['GET'])
def load_data():
    # Check if data is already loaded
    if mongo.db.insights.count_documents({}) > 0:
        return jsonify({"message": "Data already loaded"}), 200

    # Load data from JSON file
    try:
        with open('../data/jsondata.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
    except UnicodeDecodeError:
        return jsonify({"error": "Unable to decode the JSON file. Please ensure it's saved with UTF-8 encoding."}), 500
    
    # Insert data into MongoDB
    mongo.db.insights.insert_many(data)
    return jsonify({"message": "Data loaded successfully"}), 200

# Route to get all data
@app.route('/api/data', methods=['GET'])
def get_data():
    # Get filter parameters from the request
    end_year = request.args.get('end_year')
    topic = request.args.get('topic')
    sector = request.args.get('sector')
    region = request.args.get('region')
    pest = request.args.get('pest')
    source = request.args.get('source')
    swot = request.args.get('swot')
    country = request.args.get('country')
    city = request.args.get('city')

    # Build the query based on the filters
    query = {}
    if end_year:
        query['end_year'] = int(end_year)
    if topic:
        query['topic'] = topic
    if sector:
        query['sector'] = sector
    if region:
        query['region'] = region
    if pest:
        query['pestle'] = pest
    if source:
        query['source'] = source
    if swot:
        query['swot'] = swot
    if country:
        query['country'] = country
    if city:
        query['city'] = city

    # Query the database with filters
    data = list(mongo.db.insights.find(query, {'_id': 0}))
    return jsonify(data)

# Add more API endpoints for filters here

if __name__ == '__main__':
    app.run(debug=True)
