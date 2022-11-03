let express = require("express");
const userController = require("./controllers/UserController");
const db = require("./database/db");
require("dotenv").config();
let app = express();

db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: "Deu certo" });
});

app.post("/user", userController.createUser);

module.exports = app;
