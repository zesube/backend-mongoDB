const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://group4_db:Password4@group4songo.t5wsoob.mongodb.net/?appName=Group4Songo",
{useNewUrlParser: true})

module.exports = mongoose;
const mongoose = require('mongoose')

// Connect without deprecated/unsupported options
mongoose.connect(
	"mongodb+srv://group4_db:Password4@group4songo.t5wsoob.mongodb.net/?appName=Group4Songo"
)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
