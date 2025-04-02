# ⚽ Football Dashboard Web Page

This project is a Football Dashboard created for the course **Information Visualisation** (Master 1) at **Vrije Universiteit Brussel (VUB)**.

It combines modern web technologies (Vite + JS/CSS) with **Python's Bokeh library** to provide interactive, data-driven football statistics visualizations.

## 📊 Dataset

- [Football Player Scores (Kaggle)](https://www.kaggle.com/datasets/davidcariboo/player-scores)

## 👥 Contributions

- Elliott Octave  
- Marouane Benslimane  
- Rayane Kouidane  
- Zakaria Rabahi

## 📦 Prerequisites

Make sure the following are installed on your machine:

- Node.js (with npm): https://nodejs.org  
- Python 3.8+  
- pip (Python package installer)  
- (Optional) A virtual environment tool like `venv` or `conda`

## 🖥️ Installation & Usage

### 🔧 Frontend Setup (Vite)

1. Clone the repository:

   git clone https://github.com/your-repo/footballdashboard  
   cd footballdashboard

2. Install dependencies:

   npm install

3. Start the frontend dev server:

   npm run dev

### 🐍 Backend Setup (Bokeh - Python)

1. Create and activate a virtual environment (recommended):

   python -m venv venv  
   .\venv\Scripts\Activate.ps1     (on PowerShell)  

2. Install Python dependencies:

   pip install -r requirements.txt

3. Run the Bokeh server:

   bokeh serve --show main.py
