const { urlencoded } = require("body-parser");
const express = require("express");
const expressSession = require("express-session");
const app = express();
const MongoStore = require("connect-mongodb-session")(expressSession);

//  create sore for session
const store = new MongoStore({
  url: "mongodb://localhost:27017/express-session",
  databaseName: "express-session",
  collection: "sessions",
});

app.use(express.json());
app.use(urlencoded({ extended: true }));

//  use express-session middleware
app.use(
  expressSession({
    name: "Express-session",
    secret: "secrete",
    sotre: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //  24hr in miliseconds
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.visitCount) req.session.visitCount++;
  else req.session.visitCount = 1;
  res.send(`<h1>total ${req.session.visitCount} till now</h1>`);
});

app.listen(8081, () => console.log(`listening on http://localhost:8081`));
