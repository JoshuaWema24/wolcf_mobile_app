const mongoose = require('mongoose');


const testimonySchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    mediaUrl: { type: String, required: false },
    date: { type: Date, default: Date.now },  
});