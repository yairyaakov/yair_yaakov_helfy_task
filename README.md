# Task Manager App

A small fullstack task manager app built as a home assignment.

The backend is a simple Express API that stores tasks in memory.

The frontend is a React app that lets you create, edit, delete, and filter tasks.

Tasks are displayed in an endless animated carousel. The carousel was built manually with CSS, without using a carousel library.

---

## Technologies

**Backend**
- Node.js
- Express
- In-memory array (no database)

**Frontend**
- React (with Vite)
- Regular CSS (no framework)
- Fetch API

---

## Features

- View all tasks in an animated endless carousel
- Add a new task with title, description, and priority
- Edit an existing task
- Delete a task (with confirmation)
- Toggle a task between completed and pending
- Filter tasks by All / Completed / Pending
- Priority badge for each task (low, medium, high)
- Completed tasks are visually faded with strikethrough
- The carousel pauses when you hover over it
- Basic responsive layout for mobile

---

## How to Run

You need two terminals — one for the backend and one for the frontend.

### Backend

```bash
cd backend
npm install
npm run dev
```

The server runs on **http://localhost:4000**

The data is stored in memory, so it resets every time the server restarts. Five example tasks are loaded automatically on startup.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on **http://localhost:5173**

Make sure the backend is running before opening the frontend.

---

## API Endpoints

Base URL: `http://localhost:4000/api/tasks`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completed status |

### Task shape

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "createdAt": "2026-01-01T00:00:00.000Z",
  "priority": "low"
}
```

### POST / PUT body

```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "low"
}
```

`priority` must be one of: `low`, `medium`, `high`

All fields are required. The server returns `400` if any field is missing or empty.

---

## Notes

- Tasks are stored in memory. Restarting the backend clears all data.
- There is no authentication.
- The carousel is implemented manually using CSS `@keyframes` and a duplicated task array. No external library is used.
- The frontend calls the backend at `http://localhost:4000` directly. Both servers need to be running at the same time.
- IDs are auto-incremented integers starting from 1.
