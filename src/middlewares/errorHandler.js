function errorHandler(err, req, res, next) {
  console.log("Handeling Error", err);

  res.status(err.status).json(err.message);
}

module.exports = {
  errorHandler,
};
