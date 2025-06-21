const express = require("express");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "cat", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
