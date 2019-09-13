const request = require("supertest");
const db = require("../db");
const server = require("../server");

beforeEach(async () => {
  await db.from("todos").truncate();
});

describe("POST /todos", () => {
  it("should return a status of 201 when succesfully created", () => {
    request(server)
      .post("/todos")
      .send({ description: "cool" })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  it("should add a new todo to the database", () => {
    request(server)
      .post("/todos")
      .send({ description: "a cool task" })
      .then(() => {
        console.log("what");
        db.select("*")
          .from("todos")
          .then(todos => {
            console.log(todos);
            expect(todos.length).toBe(1);
            expect(todos[0].description).toBe("a cool task");
            expect(todos[0].completed).toBe(false);
          });
      });
  });

  it("should return the todo upon creation", () => {
    request(server)
      .post("/todos")
      .send({ description: "a really cool task" })
      .then(todo => {
        expect(todo.id).toBe(1);
        expect(todo.description).toBe("a really cool task");
        expect(todo.completed).toBe(false);
      });
  });
});
