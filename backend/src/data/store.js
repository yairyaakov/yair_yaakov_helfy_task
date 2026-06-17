// In-memory task storage with seed data so the carousel has content on first load

let tasks = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and coffee',
    completed: false,
    createdAt: new Date(),
    priority: 'low',
  },
  {
    id: 2,
    title: 'Finish project report',
    description: 'Complete the Q2 analysis and send to manager',
    completed: false,
    createdAt: new Date(),
    priority: 'high',
  },
  {
    id: 3,
    title: 'Schedule dentist appointment',
    description: 'Call the clinic and book a slot for next week',
    completed: true,
    createdAt: new Date(),
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Read a book',
    description: 'Continue reading "Clean Code" chapter 4',
    completed: false,
    createdAt: new Date(),
    priority: 'low',
  },
  {
    id: 5,
    title: 'Fix login bug',
    description: 'Users are getting 401 on valid tokens — investigate middleware',
    completed: false,
    createdAt: new Date(),
    priority: 'high',
  },
];

let nextId = 6;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function createTask({ title, description, priority }) {
  const task = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority,
  };
  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.priority !== undefined) task.priority = updates.priority;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function toggleTask(id) {
  const task = getTaskById(id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, toggleTask };
