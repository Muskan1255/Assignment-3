const parseCookie = (req, res, next) => {
	if (req.headers.cookie) {
		const cookies = req.headers.cookie.split(';').map((c) => {
			const [key, value] = c.trim().split('=');
			return { [key]: value };
		});
		req.cookies = cookies;
	} else {
		req.cookies = [];
	}
	next();
};

module.exports = parseCookie;
