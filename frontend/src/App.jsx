import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from './services/api';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError('');
      const tasksFromServer = await getTasks();
      setTasks(tasksFromServer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(formData) {
    try {
      setError('');
      const newTask = await createTask(formData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateTask(formData) {
    if (!editingTask) {
      return;
    }

    try {
      setError('');

      const updatedTask = await updateTask(editingTask.id, {
        ...formData,
        completed: editingTask.completed,
      });

      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTask.id) {
          return updatedTask;
        }
        return task;
      });

      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteTask(id) {
    const confirmed = window.confirm('Are you sure you want to delete this task?');

    if (!confirmed) {
      return;
    }
    try {
      setError('');

      await deleteTask(id);

      const remainingTasks = tasks.filter((task) => task.id !== id);
      setTasks(remainingTasks);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleTask(id) {
    try {
      setError('');
      const updatedTask = await toggleTask(id);

      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return updatedTask;
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (err) {
      setError(err.message);
    }
  }

  function getFilteredTasks() {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }

  function handleFormSubmit(formData) {
    if (editingTask) {
      handleUpdateTask(formData);
    } else {
      handleCreateTask(formData);
    }
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <main className="app-main">
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingTask(null)}
        />

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError('')}>x</button>
          </div>
        )}

        <TaskFilter
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;