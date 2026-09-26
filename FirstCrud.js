const express = require('express');
const app = express();
const port = 3000;



let data = [{"name": "Task API", "version":"1.0", "endpoint":["/tasks"]}];
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.json(data);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});