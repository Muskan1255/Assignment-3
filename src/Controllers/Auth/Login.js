const path = require('path');
const { readFile } = require('fs/promises');
const Gallery = require('../../Models/Gallery');

const Login = async (req, res, app) => {

	if (!req.body.username || !req.body.password) {
		app.locals.error = 'Please provide a username and password';
		return res.redirect('/login');
	}
	
	const users = await readFile(
		path.join(__dirname, '/../../data/user.json'),
		'utf-8',
	);
	const parsedUsers = JSON.parse(users);

	const user = parsedUsers[req.body.username];
	if (!user) {
		app.locals.error = 'Not a registered username';
		return res.redirect('/login');
	}
	if (user !== req.body.password) {
		app.locals.error = 'Invalid password';
		return res.redirect('/login');
	}
	app.locals.error = null;
	await Gallery.updateMany({ status: 'S' }, { status: 'A' });
	// req.session.user = req.body.username;
	//! Needed to set the cookie because the client-sessions library is not setting the cookie
	res.cookie('username', req.body.username, {
		httpOnly: true,
	});

	res.redirect('/');
};

module.exports = Login;
