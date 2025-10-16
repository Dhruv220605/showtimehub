const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  poster: String,
  rating: String,
  votes: String,
  promoted: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
