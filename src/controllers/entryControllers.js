const { client } = require("../database/dbConnection");
const { findUser, createWebToken } = require("./helpers");
const bcrypt = require("bcrypt");

async function signUp(req, res, next) {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const query =
      "INSERT INTO users (email,password) VALUES($1,$2) RETURNING email";

    const { rows } = await client.query(query, [email, hashedPassword]);
    res.status(200).json({ email: rows[0].email });
  } catch (e) {
    return next({ status: 400, message: e.message });
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);
    //verify Password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Email and Password doesn't match");
    }
    //create a token and save it on the clients cookie
    const userToken = createWebToken(user);
    res
      .status(200)
      .cookie("token", userToken, { maxAge: 1000 * 60 * 60 * 3 })
      .json(`Logged In successfully with the email ${user.email}`);
  } catch (e) {
    return next({ status: 400, message: e.message });
  }
}

module.exports = {
  signUp,
  signIn,
};
