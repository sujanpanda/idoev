const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const citySchema = new Schema({
	id: Number,
	name: String,
	state: String,
});

module.exports = mongoose.model('city', citySchema, 'cities');