const Gallery = require('../../Models/Gallery');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const Register = async (req, res, app) => {
	if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
		app.locals.error = 'Please provide a username and password';
		return res.redirect('/register');
	}
	if (req.body.password !== req.body.confirmPassword) {
		app.locals.error = 'Passwords do not match';
		return res.redirect('/register');
	}
	const users = await readFile(
		path.join(__dirname, '/../../data/user.json'),
		'utf-8',
	);
	const parsedUsers = JSON.parse(users);

	if (parsedUsers[req.body.username]) {
		app.locals.error = 'Username already exists';
		return res.redirect('/register');
	}
	parsedUsers[req.body.username] = req.body.password;
	await writeFile(
		path.join(__dirname, '/../../data/user.json'),
		JSON.stringify(parsedUsers, null, 2),
	);
	await Gallery.updateMany({ status: 'S' }, { status: 'A' });
	app.locals.error = null;
	// req.session.user = req.body.username;
	//! Needed to set the cookie because the client-sessions library is not setting the cookie
	res.cookie('username', req.body.username, {
		httpOnly: true,
	});
	res.redirect('/');
};

module.exports = Register;
