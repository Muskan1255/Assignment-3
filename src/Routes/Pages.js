const { Router } = require('express');
const { VerifyUser, VerifyNoUser } = require('../middleware/VerifyUser');
const Index = require('../Controllers/Pages/IndexPage');
const RegisterPage = require('../Controllers/Pages/RegisterPage');
const LoginPage = require('../Controllers/Pages/LoginPage');
const PurchasePage = require('../Controllers/Pages/PurchasePage');

const getPageRouter = (app) => {
	const pageRouter = Router();

	pageRouter.get('/register', VerifyNoUser, (req, res) =>
		RegisterPage(req, res, app),
	);
	pageRouter.get('/login', VerifyNoUser, (req, res) =>
		LoginPage(req, res, app),
	);
	pageRouter.get('/purchase', VerifyUser, (req, res) => PurchasePage(req, res, app));
	pageRouter.get('/', VerifyUser, (req, res) => Index(req, res, app));

	return pageRouter;
};

module.exports = getPageRouter;
