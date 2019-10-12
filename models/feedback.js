const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const feedSchema = new Schema({
	name: String,
	title: String,
	message: String,
	order: Number
});

module.exports = mongoose.model('feedback', feedSchema, 'feedCollect');