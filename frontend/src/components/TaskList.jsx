import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks to show. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper">
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
