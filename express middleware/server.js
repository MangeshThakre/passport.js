const express = require("express");
const app = express();

function middleware1(req, res, next) {
  console.log("milldeware 1");
  next();
}

function middlewar2(req, res, next) {
  console.log("milldeware 2");
  next(new Error("error"));
}

function errorHandler(err, req, res, next) {
  res.send("<h1>error</h1>");
  next();
}

app.use(middleware1);

app.get("/", middlewar2, (req, res) => {
  res.send(`<h1>hello world</h1>`);
});
app.use(errorHandler);

app.listen(8081, () => console.log("listnint on http://localhost:8081"));
