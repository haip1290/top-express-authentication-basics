const { Router } = require('express');

const usersRouter = Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/', usersController.index);
usersRouter.get('/sign-up', usersController.signUp);
usersRouter.post('/sign-up', usersController.createUser);
usersRouter.post('/log-in', usersController.login);
usersRouter.get('/info', usersController.info);
usersRouter.get('/log-out', usersController.logOut);

module.exports = usersRouter;
