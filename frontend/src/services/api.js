const BASE_URL = 'http://localhost:4000/api/tasks';

async function handleError(res, message) {
  const body = await res.json();
  throw new Error(body.error || message);
}

export async function getTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}

export async function createTask(taskData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    await handleError(res, 'Failed to create task');
  }
  return res.json();
}

export async function updateTask(id, taskData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    await handleError(res, 'Failed to update task');
  }

  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    await handleError(res, 'Failed to delete task');
  }
}

export async function toggleTask(id) {
  const res = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });

  if (!res.ok) {
    await handleError(res, 'Failed to toggle task');
  }
  return res.json();
}