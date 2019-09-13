const express = require("express");
const todosRouter = require("./routes/todos");
const server = express();

server.use(express.json());
server.use("/todos", todosRouter);

server.get("/test", (_req, res) => {
  res.json({ message: "Hello, World" });
});

module.exports = server;
