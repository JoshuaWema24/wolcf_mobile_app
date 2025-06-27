'use strict';
const { required } = require('joi');
const mongoose = require('mongoose');
const { ref } = require('process');



const PrayerRequestSchema = new mongoose.Schema({
  prayerId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  memberName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  request: String,
  isAnonymous: Boolean,
  date: { type: Date, default: Date.now },
  info: {type: string, required : true},
});

module.exports = mongoose.model('PrayerRequest', PrayerRequestSchema);
