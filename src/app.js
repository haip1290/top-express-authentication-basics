const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const usersRouter = require("./routes/usersRouter");

app.set("views", path.join(__dirname, "" + "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "cat", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
