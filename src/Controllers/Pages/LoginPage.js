const LoginPage = (req, res, app) => {
	res.render('login', {
		layout: 'main',
		error: app.locals.error,
	});
};

module.exports = LoginPage;
