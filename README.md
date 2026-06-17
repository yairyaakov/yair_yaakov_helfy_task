# Task Manager App

A fullstack Task Manager application built with Express.js and React.

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev      # development (nodemon)
# or
npm start        # production
```

Server runs on **http://localhost:4000**

### Frontend

_(Coming soon)_

---

## API Documentation

Base URL: `http://localhost:4000/api`

### Task Model

```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "priority": "low | medium | high"
}
```

### Endpoints

| Method | Path | Description | Success |
|--------|------|-------------|---------|
| GET | `/api/tasks` | Get all tasks | 200 |
| POST | `/api/tasks` | Create a task | 201 |
| PUT | `/api/tasks/:id` | Update a task | 200 |
| DELETE | `/api/tasks/:id` | Delete a task | 204 |
| PATCH | `/api/tasks/:id/toggle` | Toggle completed | 200 |

### POST / PUT Request Body

```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "low"
}
```

### Error Response

```json
{ "error": "Meaningful error message" }
```

---

## Assumptions

- Data is stored in-memory and resets on server restart
- No authentication required
- IDs are auto-incremented integers starting from 1
- 5 seed tasks are pre-loaded on startup for demo purposes

## Time Spent

_(Fill in after completion)_
