const express = require("express");
const { bookValidationSchema } = require("../utils/joiValidationSchemas");
const {
  createNewBook,
  getAllBooks,
  getBookByName,
  deleteBookById,
  updateBookById,
} = require("../controllers/bookControllers");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:name", getBookByName);
router.delete("/:id", validateToken, deleteBookById);
router.post("/", validateToken, (req, res, next) => {
  const { error } = bookValidationSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.message });
  }
  createNewBook(req, res, next);
});
router.put("/:id", validateToken, (req, res, next) => {
  const { error } = bookValidationSchema.validate(req.body);
  if (error) {
    return next({ status: 400, message: error.message });
  }
  updateBookById(req, res, next);
});

module.exports = router;
