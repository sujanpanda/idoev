const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const adminSchema = new Schema({
	userid: String,
	password: String
});

module.exports = mongoose.model('adminuser', adminSchema, 'admin');