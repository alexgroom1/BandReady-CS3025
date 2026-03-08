# Band Ready

Band Ready is a tablet-first music learning prototype for grade 4-5 students. The frontend is a React + Vite app, and persistence is now handled by a Flask + SQLite backend.

## Quick start

Open two terminals in the project root.

### 1. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
python3 -m pip install -r backend/requirements.txt
```

### 2. Initialize the database

Run this once before first launch, or anytime you want to recreate the local SQLite data file:

```bash
npm run backend:init
```

This creates and seeds `backend/instance/bandready.db`.

### 3. Start the backend

In terminal 1:

```bash
npm run backend:dev
```

The Flask API runs at `http://127.0.0.1:5000`.

### 4. Start the frontend

In terminal 2:

```bash
npm run frontend:dev
```

The Vite app runs at `http://localhost:5173`.

The frontend expects the API at `http://127.0.0.1:5000` by default.

### 5. Open the app

Visit:

```text
http://localhost:5173
```

## Development notes

- Both the frontend and backend must be running for learner progress and teacher dashboard data to work.
- Learner profiles are seeded automatically into SQLite.
- Teacher PIN defaults to `3025`.
- If the database file is deleted, run `npm run backend:init` again.

## Frontend setup

If you only need the frontend commands:

```bash
npm install
npm run frontend:dev
```

## Backend setup

If you only need the backend commands:

```bash
python3 -m pip install -r backend/requirements.txt
npm run backend:init
npm run backend:dev
```

## Environment variables

- `VITE_API_BASE_URL`: frontend API base URL
- `FLASK_SECRET_KEY`: Flask session secret
- `BANDREADY_TEACHER_PIN`: teacher PIN, defaults to `3025`
- `FRONTEND_ORIGIN`: CORS origin, defaults to `http://localhost:5173`

## Main endpoints

- `GET /api/health`
- `GET /api/learners`
- `GET /api/learners/:learnerId/progress`
- `PUT /api/learners/:learnerId/modules/:moduleId/progress`
- `POST /api/learners/:learnerId/modules/:moduleId/assessment/start`
- `PUT /api/learners/:learnerId/modules/:moduleId/assessment/:attemptId`
- `POST /api/teacher/login`
- `POST /api/teacher/logout`
- `GET /api/teacher/dashboard`
