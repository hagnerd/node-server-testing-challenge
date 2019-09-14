const db = require("../db");

function getAllTodos() {
  return db.select("*").from("todos");
}

async function createTodo(description) {
  const input = {
    description,
    completed: false
  };

  const [id] = await db.from("todos").insert(input);
  const [todo] = await db
    .select("*")
    .from("todos")
    .where({ id });

  todo.completed = !!todo.completed;

  return todo ? todo : null;
}

async function deleteTodo(id) {
  const res = await db
    .from("todos")
    .where({ id })
    .delete();

  return res === 1;
}

async function getTodoById(id) {
  const [todo] = await db
    .select("*")
    .from("todos")
    .where({ id });

  return todo ? todo : null;
}

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  getTodoById
};
