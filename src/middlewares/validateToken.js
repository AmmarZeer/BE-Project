const { verify } = require("jsonwebtoken");
const { tokenSecret } = require("../controllers/helpers");

function validateToken(req, res, next) {
  const userToken = req.cookies["token"];

  if (!userToken) {
    next({ status: 400, message: "You should Login to complete your request" });
  }

  try {
    verify(userToken, tokenSecret);
    next();
  } catch (e) {
    next({
      status: 400,
      message: "Invalid token, please re-login and try again later",
    });
  }
}

module.exports = validateToken;
