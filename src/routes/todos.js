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

module.exports = router;
