function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const cardClass = task.completed ? 'task-card task-completed' : 'task-card';
  const statusClass = task.completed ? 'status-completed' : 'status-pending';
  const statusText = task.completed ? 'Completed' : 'Pending';
  const toggleText = task.completed ? 'Mark Pending' : 'Mark Completed';
  return (
    <div className={cardClass}>
      <div className="task-card-header">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>

        <span className={`status-badge ${statusClass}`}>
          {statusText}
        </span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-date">Created: {formatDate(task.createdAt)}</p>

      <div className="task-actions">
        <button className="btn btn-toggle" onClick={() => onToggle(task.id)}>
          {toggleText}
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