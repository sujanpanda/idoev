const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const etypeSchema = new Schema({
	// id: Number,
	type: String
});

module.exports = mongoose.model('eventtype', etypeSchema, 'evType');