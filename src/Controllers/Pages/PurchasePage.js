const Gallery = require("../../Models/Gallery");

const PurchasePage = async (req, res, app) => { 
    const image = app.locals.currentImage;
    if (!image) {
        app.locals.error = 'Please select an image';
        return res.redirect('/');
    }
    const imageUrl = `/images/${image}.jpeg`;
    const imageDetails = await Gallery.findOne({ fileName: image });

    res.render('purchase', {
        layout: 'main',
        error: app.locals.error,
        currentImage: image,
        imageUrl,
        ...imageDetails.toJSON(),
    });
}

module.exports = PurchasePage;