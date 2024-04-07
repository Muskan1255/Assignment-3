const Gallery = require('../../Models/Gallery');
const path = require('path');
const { camelCaseToWords } = require('../../utils/string');
const Index = async (req, res, app) => {
	const user = req.cookies[0]?.username;
	const images = await Gallery.find({ status: 'A' });
	if (!app.locals.currentImage) {
		app.locals.currentImage = images[ 0 ].fileName;
		app.locals.isDefault = true;
	}
	const imageUrl = path.join(`/images/${app.locals.currentImage}.jpeg`);
	res.render('index', {
		layout: 'main',
		images: images.map((image) => image.fileName),
		imageUrl: imageUrl,
		currentImage: app.locals.currentImage,
		user: user,
	
	});
};

module.exports = Index;
