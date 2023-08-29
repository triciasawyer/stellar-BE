"use strict";

const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, require: true },
  overview: { type: String, require: true },
  imageUrl: { type: String, require: true },
  releasedOn: { type: String, require: true },
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;
