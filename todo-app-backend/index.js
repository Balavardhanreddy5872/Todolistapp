const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let currentId = 1;


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const newTask = { id: currentId++, title, description, status, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    const { title, description, status, dueDate } = req.body;
    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
