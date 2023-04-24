const { Client } = require("pg");
const mongoose = require("mongoose");
require("dotenv").config();

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "BE-Project",
  port: 5432,
});

async function connectToDB() {
  try {
    client.connect(() => console.log("connected to postegreSQL DB"));
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to Mongo DB"));
  } catch (e) {
    console.log(e);
  }
}
module.exports = { client, connectToDB };
