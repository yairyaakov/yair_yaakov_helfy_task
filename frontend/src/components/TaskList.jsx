import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks to show. Add one above!</p>
      </div>
    );
  }

  // Duplicate tasks so the CSS animation can loop continuously
  const copies = tasks.length < 3 ? 4 : 2;
  const carouselTasks = Array(copies).fill(tasks).flat();

  const duration = Math.max(tasks.length * 5, 15);

  // Reset animation when the visible task list changes
  const trackKey = tasks.map((task) => task.id).join('-');

  return (
    <div className="carousel-wrapper">
      <div
        key={trackKey}
        className="carousel-track"
        style={{ '--copies': copies, '--duration': `${duration}s` }}
      >
        {carouselTasks.map((task, index) => (
          <TaskItem
            key={`${task.id}-${index}`}
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
