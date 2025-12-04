const mongoose = require('../db');

// Define the Song schema
const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: String,
    popularity: { type: Number, min: 1, max: 10 },
    releaseDate: { type: Date, default: Date.now },
    genre: [String]
});

// Create and export the Song model
module.exports = mongoose.model('Song', songSchema);
