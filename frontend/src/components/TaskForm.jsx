import { useState, useEffect } from 'react';

const EMPTY_FORM = { title: '',
  description: '',
  priority: 'medium' 
};

function TaskForm({ editingTask, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingTask]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]:value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    if (!editingTask) setForm(EMPTY_FORM);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task description"
          required
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
