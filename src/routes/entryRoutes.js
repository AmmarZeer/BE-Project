const express = require("express");
const { userInputSchema } = require("../utils/joiValidationSchemas");
const { signUp, signIn } = require("../controllers/entryControllers");

const router = express.Router();

router.post("/sing-up", (req, res, next) => {
  const { error } = userInputSchema.validate(req.body);
  if (error) return next({ status: 400, message: error.message });
  signUp(req, res, next);
});

router.post("/sign-in", (req, res, next) => {
  const { error } = userInputSchema.validate(req.body);
  if (error) return next({ status: 400, message: error.message });
  signIn(req, res, next);
});

module.exports = router;
