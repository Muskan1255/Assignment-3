const Gallery = require('../../Models/Gallery');

const PlaceOrder = async (req, res, app) => {
	const { action } = req.body;
	if (action === 'cancel') {
		return res.redirect('/');
	}
	const image = app.locals.currentImage;
	if (!image) {
		app.locals.error = 'Please select an image';
		return res.redirect('/');
	}
	await Gallery.updateOne({ fileName: image }, { status: 'S' });
	app.locals.currentImage = null;
	app.locals.isDefault = true;
	res.redirect('/');
	
	return;
};

module.exports = PlaceOrder;
