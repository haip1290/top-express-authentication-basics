const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();
const usersRouter = require('./routes/usersRouter');
const db = require('./db/queries');

app.set('views', path.join(__dirname, '' + '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'cat', resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      console.log('Authenticated user successfully.');
      return done(null, user);
    } catch (err) {
      console.log('Error in authentication process ', err);
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
