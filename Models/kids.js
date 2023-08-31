'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const kidsSchema = new Schema({
  title: { type: String, require: true },
  overview: { type: String, require: true },
  imageUrl: { type: String, require: true },
  releasedOn: { type: String, require: true },
});

const KidsModel = mongoose.model('Kids', kidsSchema);

module.exports = KidsModel;
