const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
const ac = require("./controllers/authController");
require("dotenv").config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/../build`));

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

app.get("/devpool", ac.listDPTeams);
app.get("/devpool/members", ac.listDPMembers);
app.get("/logout", ac.logout);
app.post("/login", ac.login);
app.post("/register", ac.register);
app.put("/change_name", ac.edit);
app.delete("/delete", ac.removeUser);

app.post("/db/join_team", ac.joinDPTeam);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(` - Listening on port (${PORT}) - `));
