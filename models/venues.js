const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const venueSchema = new Schema({
	id: Number,
	name: String,
	city: String,
	owner: String,
	detail: String,
	baseprice: Number,
	type: Array,
	venueimg: String,
	loadvenueimg: String,
	ownerimg: String
});

module.exports = mongoose.model('venue', venueSchema, 'venues');