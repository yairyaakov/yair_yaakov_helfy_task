const BASE_URL = 'http://localhost:4000/api/tasks';

export async function getTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(taskData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error || 'Failed to create task');
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
    const body = await res.json();
    throw new Error(body.error || 'Failed to update task');
  }
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error || 'Failed to delete task');
  }
  // 204 No Content — nothing to parse
}

export async function toggleTask(id) {
  const res = await fetch(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error || 'Failed to toggle task');
  }
  return res.json();
}
