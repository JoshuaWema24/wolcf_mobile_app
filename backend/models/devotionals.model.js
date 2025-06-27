const mongoose = require('mongoose');
 
const devotionalsSchema = new mongoose.Schema({
     devotionalId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});