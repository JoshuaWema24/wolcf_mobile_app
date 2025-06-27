const mongoose = require('mongoose');
const { title } = require('process');


const testimonySchema = new mongoose.Schema({
    testimonyId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    mediaUrl: { type: String, required: false },
    date: { type: Date, default: Date.now },  
});