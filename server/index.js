const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
const ac = require("./controllers/authController");
require("dotenv").config();

const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const PORT = 4000;

const app = express();

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected");
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.get("/auth/login", ac.login);
app.post("/auth/register", ac.register);

app.listen(PORT, () => console.log(` - Listening on port (${PORT}) - `));
