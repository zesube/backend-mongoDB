const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://group4_db:Password4@group4songo.t5wsoob.mongodb.net/?appName=Group4Songo").then(() => {
    console.log('✓ MongoDB connected successfully');
}).catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
});

module.exports = mongoose;