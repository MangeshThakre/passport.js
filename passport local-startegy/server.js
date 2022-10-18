require("dotenv").config();
const express = require("express");
const app = express();
const expressSession = require("express-session");
const MongodbStore = require("connect-mongodb-session")(expressSession);
const path = require("path");
const mongoose = require("./db");
var crypto = require("crypto");
const router = require("./router/index.js");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  session store
const store = MongodbStore({
  url: "mongodb://localhost:27017/express-session",
  databaseName: "express-session",
  collection: "sessions",
});

// session middleware
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60, //24hr in milesecond
    },
  })
);
// password authentication
require("./Config/passport.js");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use(express.static(path.join(__dirname, "./public")));
app.use("/", router);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(8081, () => console.log("listning on http://localhost:8081"));
