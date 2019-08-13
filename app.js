const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const usersRoutes = require("./routes/users");
const mysql = require("mysql2");
const app = express();

const db = require("./config/keys");

//middleware

app.use(morgan("dev"));
app.use(bodyParser.json());
//Routes
app.use("/users", usersRoutes);

//connection server
const PORT = process.env.PORT || 3000;
db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server run on port ${PORT}`));
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
