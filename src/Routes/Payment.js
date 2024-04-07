const { Router } = require('express');

const { VerifyUser } = require('../middleware/VerifyUser');

const PlaceOrder = require('../Controllers/Payment/PlaceOrder');

const PaymentRouter = (app) => {
	const paymentRouter = Router();
	paymentRouter.post('/placeOrder', (req, res) =>
		PlaceOrder(req, res, app),
	); 

	return paymentRouter;
};

module.exports = PaymentRouter;
