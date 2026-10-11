const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const db = require('./database');
const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;




let data = [{"name": "Task API", "version":"1.0", "endpoint":["/tasks"]}];
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET all tasks from SQLite
app.get('/tasks', (req, res) => {
  const tasks = db.prepare(
    'SELECT id, title, done FROM tasks ORDER BY id'
  ).all();

  // Convert SQLite's 0/1 values into JavaScript booleans
  const formattedTasks = tasks.map(task => ({
    ...task,
    done: Boolean(task.done)
  }));

  res.json(formattedTasks);
});


// GET a single task by ID from SQLite
app.get('/tasks/:id', (req, res) => {
  const task = db.prepare(
    'SELECT id, title, done FROM tasks WHERE id = ?'
  ).get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  res.json({
    ...task,
    done: Boolean(task.done)
  });
});

//stage 3:


app.post('/tasks', (req, res) => {
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Request body:', req.body);

  const { title } = req.body || {};
  // Validate the title
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      error: 'Title is required'
    });
  }

  try {
    const result = db.prepare(
      'INSERT INTO tasks (title, done) VALUES (?, ?)'
    ).run(title.trim(), 0);
    console.log('Inserted task ID:', result.lastInsertRowid);
    console.log('Tasks currently in database:',
    db.prepare('SELECT * FROM tasks').all()
    );
    const newTask = db.prepare(
      'SELECT id, title, done FROM tasks WHERE id = ?'
    ).get(result.lastInsertRowid);

    res.status(201).json({
      ...newTask,
      done: Boolean(newTask.done)
    });
  } catch (error) {
    console.error('Error creating task:', error);

    res.status(500).json({
      error: 'Failed to create task'
    });
  }
});


//stage 4: Update and delete


app.put('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const { title, done } = req.body || {};

  // Validate the task ID
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      error: 'Invalid task ID'
    });
  }

  // Validate the request body
  if (
    title === undefined &&
    done === undefined
  ) {
    return res.status(400).json({
      error: 'Provide a title or done field'
    });
  }

  if (
    title !== undefined &&
    (typeof title !== 'string' || !title.trim())
  ) {
    return res.status(400).json({
      error: 'Title must be a non-empty string'
    });
  }

  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({
      error: 'Done must be true or false'
    });
  }

  // Find the task in SQLite
  const task = db.prepare(
    'SELECT id, title, done FROM tasks WHERE id = ?'
  ).get(taskId);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  // Keep existing values for fields not provided
  const updatedTitle =
    title !== undefined ? title.trim() : task.title;

  const updatedDone =
    done !== undefined ? Number(done) : task.done;

  // Update the task in SQLite
  db.prepare(
    'UPDATE tasks SET title = ?, done = ? WHERE id = ?'
  ).run(updatedTitle, updatedDone, taskId);

  // Read the updated task
  const updatedTask = db.prepare(
    'SELECT id, title, done FROM tasks WHERE id = ?'
  ).get(taskId);

  res.json({
    ...updatedTask,
    done: Boolean(updatedTask.done)
  });
});



app.delete('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      error: 'Invalid task ID'
    });
  }

  const result = db.prepare(
    'DELETE FROM tasks WHERE id = ?'
  ).run(taskId);

  if (result.changes === 0) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  res.json({
    message: 'Task deleted successfully'
  });
});






app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});