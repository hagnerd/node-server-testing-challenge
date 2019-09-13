const express = require("express");
const server = express();

server.get("/test", (_req, res) => {
  res.json({ message: "Hello, World" });
});

module.exports = server;
