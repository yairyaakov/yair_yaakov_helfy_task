import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks to show. Add one above!</p>
      </div>
    );
  }

  // For ≤2 unique tasks, repeat 4× so the carousel fills the screen naturally.
  // For larger lists, 2× is enough — moving -50% of the track lands exactly
  // at the start of copy 2, which is visually identical to copy 1 → seamless loop.
  const copies = tasks.length < 3 ? 4 : 2;
  const carouselTasks = Array.from({ length: copies }, () => tasks).flat();

  // Each task adds 5 s to one full loop; floor of 15 s keeps 1–3 tasks
  // slow enough to read while 3+ tasks settle at a natural ~60 px/s.
  const duration = Math.max(tasks.length * 5, 15);

  // Changing the key unmounts/remounts the track element, resetting the CSS
  // animation when tasks are added, deleted, or the filter changes.
  // Toggle and edit leave IDs unchanged, so the animation runs uninterrupted.
  const trackKey = tasks.map((t) => t.id).join('-');

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
