'use strict';
const mongoose = require('mongoose');
const { ref } = require('process');



const PrayerRequestSchema = new mongoose.Schema({
  memberName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  request: String,
  isAnonymous: Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrayerRequest', PrayerRequestSchema);
