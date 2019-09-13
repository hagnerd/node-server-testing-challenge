const router = require("express").Router();

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
  res.status(201);
});

module.exports = router;
