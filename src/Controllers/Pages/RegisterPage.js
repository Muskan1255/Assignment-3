const RegisterPage = (req, res, app) => {
	res.render('register', {
		layout: 'main',
		error: app.locals.error,
	});
};

module.exports = RegisterPage;
