const { Router } = require('express');

const { VerifyNoUser } = require('../middleware/VerifyUser');
const Register = require('../Controllers/Auth/Register');
const Login = require('../Controllers/Auth/Login');
const LogOut = require('../Controllers/Auth/LogOut');

const AuthRouter = (app) => {
	const authRouter = Router();
	authRouter.post('/register', VerifyNoUser, (req, res) =>
		Register(req, res, app),
	);
	authRouter.post('/login', VerifyNoUser, (req, res) => Login(req, res, app));
	authRouter.get('/logout', LogOut);

	return authRouter;
};
module.exports = AuthRouter;
