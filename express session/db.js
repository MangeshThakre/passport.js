const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/express-session").then(
  () => {
    console.log(`connected to database`);
  },
  (err) => {
    console.log(err);
  }
);

module.exports = mongoose;
