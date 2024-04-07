const LogOut = (req, res) => {
	console.log('Logging out');
	res.clearCookie('username');
	res.redirect('/login');
};

module.exports = LogOut;
