const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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



//stage 3:

app.post('/tasks', (req, res) => {
    const {title} = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  };

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});



//stage 4: Update and delete

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }


  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Request body cannot be empty'
    });
  }


  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted' });
});





// stage 5: Swagger UI 





app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});