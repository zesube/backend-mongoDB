// app.js
console.log("Backend server starting...");

const express = require("express");
const Song = require("../models/songs");
var cors = require('cors')
const mongoose = require("./db");



const app = express();
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

// Get list of all songs in the database
router.get("/songs", async(req, res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }

})

//Get a single song in the database
router.get("/songs/id:", async (req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err){
        res.status(400).send(err)

    }
})



router.post("/songs", async(req, res) => {
    try{
        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err) {
        res.status(400).send(err)

    }

})


app.use("/api", router);

// Log connection state and start server only after Mongoose connects
mongoose.connection.on('connected', () => console.log('Mongoose connected'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

mongoose.connection.once('open', () => {
    // Seed sample songs if collection is empty, then start server
    (async () => {
        try {
            const count = await Song.countDocuments();
            if (count === 0) {
                console.log('No songs found — seeding sample songs...');
                const samples = [
                    { title: 'Amore', artist: 'Fally Ipupa', popularity: 10, genre: ['Rhumba'] },
                    { title: 'Mrembo', artist: 'Alikiba', popularity: 9, genre: ['Mapenzi'] },
                    { title: 'Paracitamal', artist: 'Gasper', popularity: 8, genre: ['Amapiano'] }
                ];
                await Song.insertMany(samples);
                console.log('Sample songs inserted.');
            } else {
                console.log(`Songs collection has ${count} document(s).`);
            }
        } catch (err) {
            console.error('Error seeding songs:', err);
        }
        app.listen(3000, () => console.log('Server listening on port 3000'));
    })();
});

// Optional: if connection doesn't open within 15s, log and exit (helps detect network/auth issues)
setTimeout(() => {
    if (mongoose.connection.readyState !== 1) {
        console.error('Mongoose connection did not open within 15s. Current readyState:', mongoose.connection.readyState);
    }
}, 15000);