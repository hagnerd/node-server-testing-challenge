const request = require("supertest");
const db = require("../db");
const server = require("../server");

beforeEach(async () => {
  await db.from("todos").truncate();
});

describe("", () => {
  describe("POST /todos", () => {
    it("should return a status of 201 when succesfully created", async () => {
      try {
        let res = await request(server)
          .post("/todos")
          .send({ description: "cool" });

        expect(res.status).toEqual(201);
      } catch (err) {
        console.error(err);
      }
    });

    it("should add a new todo to the database", async () => {
      try {
        await request(server)
          .post("/todos")
          .send({ description: "cool task" });

        const todos = await db.select("*").from("todos");
        expect(todos.length).toBe(1);
      } catch (err) {
        console.error(err);
      }
    });

    it("should return the todo upon creation", async () => {
      try {
        let res = await request(server)
          .post("/todos")
          .send({ description: "a really cool task" });

        const { todo } = res.body;
        expect(todo.id).toBe(1);
      } catch (err) {
        console.error(err);
      }
    });
  });

  it("should return 200 when delete is successful", () => {
    request(server).del("/todos/1");
  });

  describe("DELETE /todos", () => {
    it("should return 200 when delete is successful", async () => {
      await db.from("todos").insert({ description: "cool", completed: false });

      const res = await request(server).del("/todos/1");
      expect(res.status).toEqual(200);
    });
    it("should return 404 when attempting to delete a resource that doesnt exist", async () => {
      const res = await request(server).del("/todos/12");

      expect(res.status).toEqual(404);
    });
  });
});
