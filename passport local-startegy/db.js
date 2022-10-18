const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/express-session")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => console.log(error));

module.exports = mongoose;
