const db = require('../db/queries');
const passport = require('passport');
const usersController = {
  index: (req, res) => {
    res.render('index', { title: 'Hello World' });
  },

  signUp: (req, res) => {
    res.render('sign-up', { title: 'Sign Up' });
  },

  createUser: async (req, res) => {
    const { username, password } = req.body;
    await db.createUser({ username, password });
    res.redirect('/');
  },

  login: passport.authenticate('local', {
    successRedirect: '/info',
    failureRedirect: '/',
  }),

  info: (req, res) => {
    res.render('info', { title: 'Info', user: req.user });
  },

  logOut: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
};

module.exports = usersController;
