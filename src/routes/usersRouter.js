const { Router } = require('express');

const usersRouter = Router();
const usersQueries = require('../db/queries');

usersRouter.get('/', (req, res) => {
  res.render('index', { title: 'Hello World' });
});

usersRouter.get('/sign-up', (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
});

usersRouter.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;
  await usersQueries.createUser({ username, password });
  res.redirect('/');
});

module.exports = usersRouter;
