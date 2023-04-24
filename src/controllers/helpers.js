const { client } = require("../database/dbConnection");
const { sign } = require("jsonwebtoken");
const Logs = require("../database/models/logsModel");

const tokenSecret = "Mji5LgDghm";

async function findUser(email) {
  const query = "SELECT email,password FROM users WHERE email=($1)";
  const { rowCount, rows } = await client.query(query, [email]);

  if (rowCount === 0) {
    throw new Error("Email doesn't exist");
  }
  return rows[0];
}

function createWebToken(user) {
  const tokenPayload = {
    email: user.email,
  };

  const token = sign(tokenPayload, tokenSecret, {
    expiresIn: "3h",
  });

  return token;
}

//these function could be async, but there's no need since we can keep them on the background
function successfulLog(type, action) {
  Logs.create({
    type,
    action,
    status: "success",
    createdAt: Date.now(),
  });
}

function failedLog(type, action, error) {
  Logs.create({
    type,
    action,
    error,
    status: "failure",
    createdAt: Date.now(),
  });
}

module.exports = {
  findUser,
  createWebToken,
  tokenSecret,
  successfulLog,
  failedLog,
};
