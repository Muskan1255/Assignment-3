const { Schema, model } = require('mongoose');

const GallerySchema = new Schema(
	{
		fileName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['A', 'S'],
		},
	},
	{
		timestamps: true,
	},
);
const Gallery = model('Gallery', GallerySchema);

module.exports = Gallery;
