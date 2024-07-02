const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors'); // Import cors package
const port = 3000;
// const uri = 'mongodb://localhost:27017';
// const dbName = 'swapi';

let db;
app.use(cors());
app.use(express.static('./public'))

 
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;
 
const url = "mongodb://localhost:27017";
const dbName = "swapi";
 
const collectionCharacters ="characters"
const collectionFilms = "films";
const collectionPlanets = "planets";
const collectionFilmsCharacters = "films_characters"
const collectionFilmsPlanets = "films_planets";
 
app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionCharacters);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting characters");
    }
});
 
app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionFilms);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting films");
    }
});
 
app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionPlanets);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting planets");
    }
});
 
app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionCharacters);
        const character = await collection.find({id:parseInt(id)}).toArray();
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting character");
    }
});
 
app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionFilms);
        const film = await collection.find({id:parseInt(id)}).toArray();
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting film");
    }
});
 
app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionPlanets);
        const planet = await collection.find({id:parseInt(id)}).toArray();
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting planet");
    }
});
 
app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionC = db.collection(collectionCharacters);
        const collectionFC = db.collection(collectionFilmsCharacters);
        const characterIds = (await collectionFC.find({film_id: parseInt(id)},
                                               {projection : {character_id: 1, _id:0}})
                                               .toArray()).map(character=>character.character_id);
        //console.log(characterIds);
        const charactersData = (await collectionC.find().toArray());
        //console.log(`charactersData: ${charactersData}\n`);
        let response = [];
        for(var charId of characterIds){
            //console.log(`Looping... CharId: ${charId}`);
            let char = charactersData.filter(char => char.id === charId)
            //console.log(`Char: ${char}`);
            response = [...response, char[0]];
            //console.log(`Response: ${response}\n`);
        }
        //console.log(response);
        res.json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting characters");
    }
});
 
app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionP = db.collection(collectionPlanets);
        const collectionFP = db.collection(collectionFilmsPlanets);
        const planetIds = (await collectionFP.find({film_id: parseInt(id)},
                                               {projection : {planet_id: 1, _id:0}})
                                               .toArray()).map(planet=>planet.planet_id);
        //console.log(planetIds);
        const planetsData = (await collectionP.find().toArray());
        //console.log(`planetsData: ${planetsData}\n`);
        let response = [];
        for(var planId of planetIds){
            //console.log(`Looping... CharId: ${charId}`);
            let plan = planetsData.filter(plan => plan.id === planId)
            //console.log(`Char: ${char}`);
            response = [...response, plan[0]];
            //console.log(`Response: ${response}\n`);
        }
        //console.log(response);
        res.json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting planets");
    }
});
 
app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionF = db.collection(collectionFilms);
        const collectionFC = db.collection(collectionFilmsCharacters);
        const filmIds = (await collectionFC.find({character_id: parseInt(id)},
                                               {projection : {film_id: 1, _id:0}})
                                               .toArray()).map(film=>film.film_id);
        //console.log(filmIds);
        const filmsData = (await collectionF.find().toArray());
        //console.log(`filmsData: ${filmsData}\n`);
        let response = [];
        for(var fId of filmIds){
            //console.log(`Looping... fId: ${fId}`);
            let f = filmsData.filter(f => f.id === fId)
            //console.log(`f: ${f}`);
            response = [...response, f[0]];
            //console.log(`Response: ${response}\n`);
        }
        //console.log(response);
        res.json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting films");
    }
});
 
app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionF = db.collection(collectionFilms);
        const collectionFP = db.collection(collectionFilmsPlanets);
        const filmIds = (await collectionFP.find({planet_id: parseInt(id)},
                                               {projection : {film_id: 1, _id:0}})
                                               .toArray()).map(film=>film.film_id);
        //console.log(filmIds);
        const filmsData = (await collectionF.find().toArray());
        //console.log(`filmsData: ${filmsData}\n`);
        let response = [];
        for(var fId of filmIds){
            //console.log(`Looping... fId: ${fId}`);
            let f = filmsData.filter(f => f.id === fId)
            //console.log(`f: ${f}`);
            response = [...response, f[0]];
            //console.log(`Response: ${response}\n`);
        }
        //console.log(response);
        res.json(response);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting films");
    }
});
 
app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionCharacters);
        const characters = await collection.find({homeworld:parseInt(id)}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error getting planet");
    }
});
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});