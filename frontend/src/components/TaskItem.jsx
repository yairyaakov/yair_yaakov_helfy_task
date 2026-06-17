function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className={`task-card${task.completed ? ' task-completed' : ''}`}>
      <div className="task-card-header">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-date">Created: {formatDate(task.createdAt)}</p>

      <div className="task-actions">
        <button className="btn btn-toggle" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
