const router = require("express").Router();
const Todo = require("../controllers/todos");

function validateTodoInput(req, res, next) {
  const { description } = req.body;

  if (!description) {
    res.status(400).json({
      message: "A valid todo must have a description"
    });
  } else {
    next();
  }
}

async function validateTodoExists(req, res, next) {
  const { id } = req.params;

  try {
    const todo = await Todo.getTodoById(id);

    if (todo) {
      next();
    } else {
      res.status(404).json({
        message: "no todo exists with that id"
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "internal server error",
      message: err.message
    });
  }
}

router.get("/", async (_, res) => {
  const todos = await Todo.getAllTodos();
  res.json({
    todos
  });
});

router.post("/", validateTodoInput, async (req, res) => {
  const { description } = req.body;

  try {
    const todo = await Todo.createTodo(description);

    res.status(201).json({
      todo
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message
    });
  }
});

router.delete("/:id", validateTodoExists, async (req, res) => {
  const { id } = req.params;

  try {
    const isTodoDeleted = await Todo.deleteTodo(id);

    if (isTodoDeleted) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(500).json({ message: "what" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "internal server error",
      message: err.message
    });
  }
});

module.exports = router;
