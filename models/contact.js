const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const feedSchema = new Schema({
	name: String,
	email: String,
	mobile: Number,
	message: String
});

module.exports = mongoose.model('contact', feedSchema, 'contCollect');