const express = require("express");
const passport = require("passport");
const router = express.Router();
const path = require("path");
const genPassword = require("../lib/passwordUlits").genPassword;
const userModel = require("../schema/userScheme.js");

/// POST ROUTES
router.post("/register", async (req, res, next) => {
  // generating hashed password  using genPassword function()
  const { salt, hash } = genPassword(req.body.pass);
  try {
    // storing the new user in database and redirecting to login page
    const result = new userModel({ userName: req.body.user, hash, salt });
    result.save();
    //   console.log(result);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
    });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user.status) {
    res.redirect("/login-success");
  } else {
    res.redirect("/login-failure");
  }
});

///// GET REQUES

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/register", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/protected-route", (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
  if (req.isAuthenticated()) {
    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );
  } else {
    res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
    );
  }
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  //   console.log(req.user);
  //   console.log(req.session);
  req.logout((error) => {
    if (error) return next(error);
    res.redirect("/protected-route");
  });
});

router.get("/login-success", (req, res, next) => {
  //   console.log(req.user);
  //   console.log(req.session);
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

module.exports = router;
