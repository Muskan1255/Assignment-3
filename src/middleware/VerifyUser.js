const VerifyUser = (req, res, next) => {
	if (req.cookies[0]?.username !== undefined) {
		next();
		return;
	}
	res.redirect('/login');
};

const VerifyNoUser = (req, res, next) => {
	
	if (!req.cookies[0]?.username) {
		
		next();
		return;
	}
	res.redirect('/');
};

module.exports = { VerifyUser, VerifyNoUser };
