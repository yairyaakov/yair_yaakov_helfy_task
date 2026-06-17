const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
