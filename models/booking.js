const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
	venuid: Number,
	djprice: Number,
	mikeprice: Number,
	projectorprice: Number,
	breaknorm: Number,
	lunchnorm: Number,
	dinnorm: Number,
	snacknorm: Number,
	tnbevrnorm: Number,
	breaksemi: Number,
	lunchsemi: Number,
	dinsemi: Number,
	snacksemi: Number,
	tnbevrsemi: Number,
	breakdlx: Number,
	lunchdlx: Number,
	dindlx: Number,
	snackdlx: Number,
	tnbevrdlx: Number,
	lightnorm: Number,
	lightsemi: Number,
	lightdlx: Number,
	flowernorm: Number,
	flowersemi: Number,
	flowerdlx: Number,
	seatnorm: Number,
	seatsemi: Number,
	seatdlx: Number,
	addNonveg: Number
});

module.exports = mongoose.model('booking', bookSchema, 'bookingcalc');