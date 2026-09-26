const express = require('express');
const app = express();
const port = 3000;





let tasks = [
  { id: 1, title: "Learn Express basics", done: false },
  { id: 2, title: "Build a REST API", done: true },
  { id: 3, title: "Test endpoints with Postman", done: false }
];

let data = [{"name": "Task API", "version":"1.0", "endpoint":["/tasks"]}];
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/task', (req, res) => {
  res.json(data);
});


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});