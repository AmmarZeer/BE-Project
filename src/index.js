const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const { connectToDB } = require("./database/dbConnection");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

//Express configuration
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/entry", require("./routes/entryRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/logs", require("./routes/logsRoutes"));
//middlewares

app.use(errorHandler);

//connections
const PORT = process.env.PORT || 3000;
connectToDB();
app.listen(PORT, "localhost", () => console.log(`listenning to port ${PORT}`));
