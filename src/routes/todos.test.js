const request = require("supertest");
const db = require("../db");
const server = require("../server");

describe("POST /todos", () => {
  it("should return a status of 201 when succesfully created", async () => {
    const res = await request(server).post("/todos", {
      description: "a cool task"
    });

    expect(res.status).toBe(201);
  });

  it.skip("should add a new todo to the database", async () => {
    await request(server).post("/todos", { description: "a cool task" });

    const todos = await db.select("*").from("todos");

    expect(todos.length).toBe(1);
    expect(todos[0].description).toBe("a cool task");
    expect(todos[0].completed).toBe(false);
  });
  it.skip("should return the todo upon creation", () => {});
});
