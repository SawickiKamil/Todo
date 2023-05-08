const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
};
app.use(express.json());
app.use(cors(corsOptions));



let todos = [
  { id: 1, text: "Buy groceries", isSelected: false },
  { id: 2, text: "Do laundry", isSelected: false },
  { id: 3, text: "Clean the house", isSelected: false },
];

// Create a new todo item
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const id = todos.length + 1;
  const newTodo = { id, text };
  todos.push(newTodo);
  res.json(newTodo);
});

// Retrieve all todo items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Retrieve a single todo item by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Update a todo item by ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const { text } = req.body;
    todo.text = text;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Delete a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
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
