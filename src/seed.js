const { downloadImage } = require('./utils/image');
const lineByline = require('linebyline');
const imageInfo = require('./data/imagesInfo.json')
const fs = require('fs');
const path = require('path');

const pexels = require('pexels');
const { camelCaseToWords, removeExtension } = require('./utils/string');
const Gallery = require('./Models/Gallery');
const mongoose = require('mongoose');
require('dotenv').config();
(async () => {
	await mongoose.connect(process.env.MONGO_URI);
	await Gallery.deleteMany({});
	console.log('Connected to MongoDB 🔥 🚀 ');
})();

const client = pexels.createClient(
	'4OtS4BNLpHggxTitGtTQtCA4nklTw9xhxipBRzAups6reldM1DUfmAJm',
);
const downloadedImages = fs.readdirSync(
	path.join(__dirname, '../public/images'),
);

const rl = lineByline(__dirname + '/data/imagelist.txt');
console.log(imageInfo)
rl.on('line', async (line, lineCount, byteCount) => {
	console.log('Processing line: ', line);
	const filename = path.basename(removeExtension(line));
	const query = camelCaseToWords(removeExtension(line));
	const filepath = path.join(__dirname, '../public/images', filename + '.jpeg');
	// Check if the file already exists
	if (downloadedImages.find((img) => removeExtension(img) === filename)) {
		console.log(`Image already exists: ${filename}`);
		const image = await Gallery.findOne({
			fileName:
				filename,
		});
		console.log('Image: ', filename, imageInfo[filename]);
		if (!image) {
			await Gallery.create({
				fileName: filename,
				description: imageInfo[filename] || `${query} image`,
				status: 'A',
				price: Math.floor(Math.random() * 10000),
			});
			console.log(`Saved to DB: ${filename}`);
		}
		else {
			console.log('Already saved to DB');
		}
		return;
	}
	console.log(`Downloading image for ${query}...`);
	const resp = await client.photos.search({ query, per_page: 10 });
	const imageURL =
		resp.photos[Math.floor(Math.random() * resp.photos.length)]?.src.original;
	console.log('Image Fetching URL: ', imageURL);

	const savedPath = await downloadImage(imageURL, filepath);
	console.log(`Downloaded and saved: ${savedPath}`);
	await Gallery.create({
		fileName: filename,
		description: `${query} image`,
		status: 'A',
		price: Math.floor(Math.random() * 1000),
	});
	console.log(`Saved to DB: ${filename}`);
});
rl.on('end', () => {
	console.log('Finished downloading images');
	
});
rl.on('error', (err) => {
	console.error(err);
});
