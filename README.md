# ProjectCollaboration-Tool
## Overview
This project is a collaboration tool that allows users to create, assign, and track tasks in projects. It features advanced search, real-time notifications, and analytics dashboards for team productivity insights.

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/shwetasugure/ProjectCollaboration-Tool.git
```

### 2. Navigate to the Project Directory
Change to the project directory:
```bash
cd PROJECTCOLLABORATION-TOOL/BackEnd/
```

### 3. Create and Activate the Virtual Environment
If you haven't already created a virtual environment, do so using the following command:
```bash
python -m venv venv
```
To activate the virtual environment, run:
- On **Windows**:
  ```bash
  venv\Scripts\activate
  ```
- On **macOS/Linux**:
  ```bash
  source venv/bin/activate
  ```

### 4. Install Dependencies
Install the required packages using:
```bash
pip install -r requirements.txt
```

### 5. Run Migrations
Apply database migrations:
```bash
python manage.py migrate
```

### 6. Start the Development Server
Run the development server:
```bash
python manage.py runserver
```
You can now access the project at `http://127.0.0.1:8000/`.

