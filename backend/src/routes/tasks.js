const express = require('express');
const router = express.Router();
const store = require('../data/store');
const validateTask = require('../middleware/validateTask');

function getId(req) {
  return parseInt(req.params.id, 10);
}

router.get('/', (req, res) => {
  res.json(store.getAllTasks());
});

router.post('/', validateTask, (req, res) => {
  const { title, description, priority } = req.body;
  const task = store.createTask({ title, description, priority });
  res.status(201).json(task);
});

router.put('/:id', validateTask, (req, res) => {
  const id = getId(req);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  const { title, description, priority, completed } = req.body;
  const task = store.updateTask(id, { title, description, priority, completed });
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const id = getId(req);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  const deleted = store.deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
});

router.patch('/:id/toggle', (req, res) => {
  const id = getId(req);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  const task = store.toggleTask(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

module.exports = router;
