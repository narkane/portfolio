const massive = require("massive");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const ac = require("./controllers/authController");

//const express = require("express");
//const session = require("express-session");
//var session = require("client-sessions");
// var RedisStore = require("connect-redis")(session);
// var redis = require("redis").createClient();

var express = require("express"),
  app = express(),
  session = require("express-session");

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(bodyParser.json());
app.use(
  cors({
    // origin: ["http://sdc.thummel.site"],
    // methods: ["GET", "POST", "PUT"],
    // credentials: true // enable set cookie
  })
);
app.use(express.static(`${__dirname}/../build`));

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected");
});

app.use(cookieParser());
var MemoryStore = session.MemoryStore;
app.use(
  session({
    name: "user_sid",
    secret: SESSION_SECRET,
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: {
      path: "/",
      domain: "sdc.thummel.site",
      secure: "auto",
      maxAge: 15 * 60 * 1000
    }
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

// // middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//     //res.redirect('/dashboard');
//     return res.status(200).json(req.session.user);
//   } else {
//     next();
//   }
// };

// route for Home-Page
// app.get("/", sessionChecker, (req, res) => {
//   res.redirect("http://sdc.thummel.site:3004/login");
// });

// app.get("/", function(req, res) {
//   res.cookie("name", "express").send("cookie set"); //Sets name = express
// });

// .get(sessionChecker, (req, res) => {
//   res.status(200);
// })

app.get("/devpool", ac.listDPTeams);
app.get("/devpool/members", ac.listDPMembers);

app.post("/login", ac.login);
app.get("/logout", ac.logout);
app.post("/register", ac.register);
app.put("/change_name", ac.edit);
app.post("/delete", ac.removeUser);

app.post("/db/join_team", ac.joinDPTeam);

const PORT = 3004;
app.listen(PORT, () => console.log(` - Listening on port (${PORT}) - `));
