const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn${activeFilter === filter.value ? ' active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
