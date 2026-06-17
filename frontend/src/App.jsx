import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(formData) {
    try {
      setError(null);
      const newTask = await createTask(formData);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(id, formData) {
    try {
      setError(null);
      // Preserve the existing completed status — the form does not expose it
      const existing = tasks.find((t) => t.id === id);
      const updated = await updateTask(id, { ...formData, completed: existing.completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      setError(null);
      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <main className="app-main">
        <TaskForm
          editingTask={editingTask}
          onSubmit={editingTask ? (data) => handleUpdate(editingTask.id, data) : handleCreate}
          onCancel={() => setEditingTask(null)}
        />

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TaskFilter activeFilter={filter} onFilterChange={setFilter} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}
      </main>
    </div>
  );
}

export default App;
