const db = require("../db");
const Todo = require("./todos");

beforeEach(async () => {
  await db.from("todos").truncate();
});

it("should create a new todo", async () => {
  const input = "testing 123";
  await Todo.createTodo(input);
  const todos = await db.from("todos");

  expect(todos.length).toBe(1);
  expect(todos[0].description).toBe(input);
  expect(todos[0].completed).toBe(0);
});

it("should return the todo when creating it", async () => {
  const input = "testing 123";
  const todo = await Todo.createTodo(input);

  expect(todo.description).toBe(input);
  expect(todo.completed).toBe(false);
});

it("should delete a todo by id", async () => {
  const id = 2;
  await Todo.createTodo("todo 1");
  await Todo.createTodo("todo 2");
  await Todo.createTodo("todo 3");

  const successful = await Todo.deleteTodo(id);
  const todos = await db.from("todos");

  expect(successful).toBe(true);
  expect(todos.length).toBe(2);
  expect(todos[0].description).toBe("todo 1");
  expect(todos[1].description).toBe("todo 3");
});
