const express = require("express");
const Song = require("./module/songs");
const cors = require('cors');
const { EventEmitterAsyncResource } = require("node:events");

const app = express();
app.use(cors());

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

// Get list of all songs in the database
router.get("/songs", async function(req, res) {
   try {
      const songs = await Song.find();
      res.json(songs);
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

//Grab a single song in the database
router.get('/songs/:id', async (req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


router.post("/songs", async(req,res) =>{
    try{
        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log("Song created:", song)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

//update is to update an existing record/resource/database entry.. it uses a put request
router.put("/songs/:id", async(req,res) => {
    try{
        const song = req.body
        await Song.updateOne({_id : req.params.id}, song)
        console.log("Song updated:", song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

// Delete a song from the database
router.delete("/songs/:id", async(req,res) => {
    try{
        await Song.deleteOne({_id : req.params.id})
        console.log("Song deleted with id:", req.params.id)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.use("/api", router);

const server = app.listen(3000, () => {
    console.log("Express server on port 3000");
});

// Graceful shutdown - close Mongoose connection when server stops
const closeConnection = async () => {
    try {
        await require('./db').connection.close();
        console.log('✓ MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB:', err.message);
        process.exit(1);
    }
};
