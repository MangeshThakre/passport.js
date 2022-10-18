const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("../db.js");
const { validPassword } = require("../lib/passwordUlits.js");
const userModel = require("../schema/userScheme.js");

const customfield = {
  usernameField: "user",
  passwordField: "pass",
  passReqToCallback: true,
};
const varifyStrategy = async (req, username, password, done) => {
  userModel
    .findOne({ userName: username })
    .then((user) => {
      if (!user)
        return done(null, {
          status: false,
          message:
            "That e-mail address or mobile doesn't have an associated user account. Are you sure you've registered?",
        });
      const isvalid = validPassword(password, user.hash, user.salt);
      if (isvalid) {
        done(null, {
          status: true,
          data: user,
        });
      } else {
        return done(null, {
          status: false,
          message: "Invalid username and password.",
        });
      }
    })
    .catch((err) => {
      done(err, { status: false, message: err });
    });
};

const strategy = new LocalStrategy(customfield, varifyStrategy);
passport.use(strategy);

//

passport.serializeUser(function (user, cb) {
  console.log("user", user.data);
  process.nextTick(function () {
    cb(null, user.data);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
