# InsightBlaze 🔥🔍

InsightBlaze is a data visualization dashboard that provides interactive insights into various global trends and forecasts. This project uses a Flask backend with MongoDB for data storage and a React frontend for visualization.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
3. [Running the Application](#running-the-application)
4. [User Guide](#user-guide)
5. [Features](#features)
6. [Contributing](#contributing)
7. [License](#license)

## Prerequisites 📋

- Python 3.7+
- Node.js 14+
- MongoDB 4.4+

## Installation 🛠️

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/insightblaze.git
   cd insightblaze
   ```

2. Set up a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/insightblaze
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application 🚀

1. Start MongoDB on your local machine.

2. In one terminal, start the backend server:
   ```bash
   cd backend
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   python app.py
   ```

3. In another terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## User Guide 📚

1. **Data Loading** 💾: On first run, navigate to `http://localhost:5000/load_data` to populate the database with initial data.

2. **Dashboard Overview** 📊: The main dashboard displays various charts and statistics based on the loaded data.

3. **Filtering Data** 🔍:
   - Use the date range picker to filter data by specific time periods.
   - Select topics of interest from the topic dropdown menu.
   - Choose specific regions or countries to focus on particular geographical areas.
   - Use the PESTLE filter to view data related to Political, Economic, Social, Technological, Legal, or Environmental factors.

4. **Changing Visualizations** 📈: Click on different chart types (e.g., bar, line, pie) to switch between visualization styles for the same data.

5. **Detailed Insights** 🔬: Click on specific data points in charts to view more detailed information about that particular insight.

6. **Exporting Data** 📤: Use the export button to download the currently displayed data as a CSV file.

## Features ✨

- Interactive data filtering and visualization
- Multiple chart types (bar, line, pie, etc.)
- PESTLE analysis view
- Geographic data representation
- Time-based trend analysis
- Data export functionality
- Responsive design for various screen sizes

## Contributing 🤝

Contributions to InsightBlaze are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines on how to make contributions.

## License 📄

This project is licensed under the MIT License - see the `LICENSE.md` file for details.