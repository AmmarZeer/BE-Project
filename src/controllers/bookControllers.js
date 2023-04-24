const { client } = require("../database/dbConnection");
const { API_TYPE } = require("../utils/enums");
const { successfulLog, failedLog } = require("./helpers");

async function getAllBooks(req, res, next) {
  const query = "SELECT * FROM books";
  try {
    const { rows, rowCount } = await client.query(query);
    res.status(200).json(rowCount === 0 ? "No Books were Found" : rows);
    successfulLog(API_TYPE.GET, "Get all books");
  } catch (e) {
    failedLog(API_TYPE.GET, "Get all books", e.message);
    next({ status: 500, message: e.message });
  }
}

async function getBookByName(req, res, next) {
  const { name } = req.params;
  const query = "SELECT * FROM books WHERE name = ($1)";
  try {
    const { rows, rowCount } = await client.query(query, [name]);
    if (rowCount === 0) {
      throw new Error("Book doesn't exist");
    }
    res.status(200).json(rows);
    successfulLog(API_TYPE.GET, "Get A book");
  } catch (e) {
    failedLog(API_TYPE.GET, "Get A books", e.message);
    next({ status: 400, message: e.message });
  }
}

async function createNewBook(req, res, next) {
  const { name } = req.body;
  const query = "INSERT INTO books (name) VALUES ($1)";
  try {
    await client.query(query, [name]);
    res.status(200).json(`${name} has been created successfully`);
    successfulLog(API_TYPE.POST, "Create A book");
  } catch (e) {
    failedLog(API_TYPE.POST, "Create A book", e.message);
    next({ status: 400, message: e.message });
  }
}

async function deleteBookById(req, res, next) {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ($1)";
  try {
    const { rowCount } = await client.query(query, [bookId]);
    if (rowCount === 0) {
      throw new Error("Book doesn't exist");
    }
    res.status(200).json("Book has been deleted successfully");
    successfulLog(API_TYPE.DELETE, "Delete A book");
  } catch (e) {
    failedLog(API_TYPE.DELETE, "Delete A book", e.message);
    next({ status: 400, message: e.message });
  }
}

//--To Do: look how  this function would work if we were updating multiple columns
async function updateBookById(req, res, next) {
  const bookId = req.params.id;
  const query = "UPDATE books SET name=($1) WHERE id = ($2)";
  try {
    const { rowCount } = await client.query(query, [req.body.name, bookId]);
    if (rowCount === 0) {
      throw new Error("Book doesn't exist");
    }
    res.status(200).json("Book has been deleted successfully");
    successfulLog(API_TYPE.PUT, "Updated A book");
  } catch (e) {
    failedLog(API_TYPE.PUT, "Updated A book", e.message);
    next({ status: 400, message: e.message });
  }
}

module.exports = {
  createNewBook,
  getAllBooks,
  getBookByName,
  deleteBookById,
  updateBookById,
};
