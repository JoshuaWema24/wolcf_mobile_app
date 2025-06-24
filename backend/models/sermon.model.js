'use strict';
const mongoose = require('mongoose');

const SermonSchema = new mongoose.Schema({
  title: String,
  preacher: String,
  date: Date,
  mediaUrl: String,
  description: String
});

module.exports = mongoose.model('Sermon', SermonSchema);
