const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const missingSchema = new Schema({
	city: String,
	venue: String,
	date: {type: Date, default: Date.now},
	email: String,
	item: String,
	message: String
});

module.exports = mongoose.model('missing', missingSchema, 'missingCollect');