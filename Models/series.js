'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const seriesSchema = new Schema({
  title: { type: String, require: true },
  overview: { type: String, require: true },
  imageUrl: { type: String, require: true },
  releasedOn: { type: String, require: true },
});

const SeriesModel = mongoose.model('Series', seriesSchema);

module.exports = SeriesModel;
