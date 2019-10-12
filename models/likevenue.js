const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const likeVenue = new Schema({
	venueid: Number,
	usersUniqId: String
});

module.exports = mongoose.model('likevnu', likeVenue, 'likeVenues');