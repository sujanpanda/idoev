const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const evntBookSchema = new Schema({
	MOBILE_NO: Number,
	EMAIL: String,
	ORDER_ID: String,
	TXN_AMOUNT: Number,
	venuetype: String,
	guest: Number,
	hours: Number,
	date: {type: Date, default: Date.now},
	stime: {type: Date, default: Date.now},
	city: String,
	venue: String,
	equip: Array,
	flowers: String,
	food: Array,
	foodgan: String,
	foodtype: String,
	lighting: String,
	seating: String,
	bookStatus: {type: String, default: "request"}
});

module.exports = mongoose.model('bookev', evntBookSchema, 'eventbooking');