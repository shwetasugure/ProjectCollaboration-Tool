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


`/`
1. Analytics section
2. create project
3. view all projects (project that are owned and project where user is collaborator will be viewed)

`/project/<project_id>`
1. project details
2. edit project details (title, description, add collaborator)
3. Create task (title, description, assigned user, status, due date, priority)
4. view all project tasks
    - list view
    - Kanban board view
5. search bar 

`/project/<project_id>/tasks/<task_id>`
1. task details
2. edit task details ( title, description, assigned user, status, due date, priority)
3. search bar 

`/login` -> login page (username, password)
`/register` -> register page (username, email, password)

## other feature
1. notification
2. task comment (each task detail view will have a comment section)



1 Login / register 
2 dashboard page - display projects  
3 Project Management Page
4 Task Management Page
5 Task Details Page
6 Analytics Dashboard Page
7 Search and Filtering Page/Section
8 Notifications Page-real time