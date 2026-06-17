const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validateTask(req, res, next) {
  const { title, description, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and cannot be empty' });
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required and cannot be empty' });
  }

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
  }

  // Normalize whitespace before the route handler runs
  req.body.title = title.trim();
  req.body.description = description.trim();

  next();
}

module.exports = validateTask;
