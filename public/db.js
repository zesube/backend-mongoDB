const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://group4_db:Password4@group4songo.t5wsoob.mongodb.net/?appName=Group4Songo", 
{useNewUrlParser: true})

module.exports = mongoose;