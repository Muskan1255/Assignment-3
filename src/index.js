/**
 * Client Sessions is not setting the cookie so we are directly setting the cookie
 * and adding the cookie to the req object
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { create } = require('express-handlebars');
const { camelCaseToWords } = require('./utils/string');
const parseCookie = require('./middleware/cookies');
const pagesRouter = require('./Routes/Pages');
const authRouter = require('./Routes/Auth');
const connectMongo = require('./utils/mongo');
const PaymentRouter = require('./Routes/Payment');
require('dotenv').config();
const app = express();
const hbs = create({
	extname: '.hbs',
	helpers: {
		camelCaseToWords,
		if_eq: function (a, b, opts) {
			if(app.locals.isDefault) return opts.inverse(this);
			if (a === b) {
				return opts.fn(this);
			} else {
				return opts.inverse(this);
			}
		},
	},
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(parseCookie);
(async () => {
	await connectMongo();
})();

app.post('/change-image', (req, res) => {
	
	if (!req.body.image) {
		return res.redirect('/');
	}
	if(req.body.image === 'default') {
		app.locals.isDefault = true;
		app.locals.currentImage = null;
		return res.redirect('/');
	}
	app.locals.currentImage = req.body.image;
	app.locals.isDefault = false;
	res.redirect('/');
});
app.use('/api/auth', authRouter(app));
app.use('/api/payment', PaymentRouter(app));
app.use('/', pagesRouter(app));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT} 🔥 🔥 `);
});
