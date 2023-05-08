const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
};
app.use(express.json());
app.use(cors(corsOptions));



let todos = [
  { id: uuidv4(), name: "Buy groceries", description: 'Get bread, milk, and eggs', priority: 0 },
  { id: uuidv4(), name: "Do laundry", description: 'Wash clothes and fold them', priority: 0 },
  { id: uuidv4(), name: "Clean the house", description: 'Vacuum, dust, and scrub the floors', priority: 2 },
];

// Create a new todo item
app.post('/todos', (req, res) => {
  const { name, description, priority } = req.body;
  const newTodo = { id: uuidv4(), name, description, priority };
  todos.push(newTodo);
  res.json(newTodo);
});

// Retrieve all todo items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Retrieve a single todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Update a todo item by ID
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const { name, description, priority } = req.body;
    todo.name = name;
    todo.description = description;
    todo.priority = priority;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Delete a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});