const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';
const dbName = 'swapi';

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error(err));


app.get('/api/characters', async (req, res) => {
    const characters = await db.collection('characters').find().toArray();
    res.json(characters);
});

app.get('/api/films', async (req, res) => {
    const films = await db.collection('films').find().toArray();
    res.json(films);
});

app.get('/api/planets', async (req, res) => {
    const planets = await db.collection('planets').find().toArray();
    res.json(planets);
});

app.get('/api/characters/:id', async (req, res) => {
    const character = await db.collection('characters').findOne({ _id: ObjectId(req.params.id) });
    res.json(character);
});

app.get('/api/films/:id', async (req, res) => {
    const film = await db.collection('films').findOne({ _id: ObjectId(req.params.id) });
    res.json(film);
});

app.get('/api/planets/:id', async (req, res) => {
    const planet = await db.collection('planets').findOne({ _id: ObjectId(req.params.id) });
    res.json(planet);
});

app.get('/api/films/:id/characters', async (req, res) => {
    const film = await db.collection('films').findOne({ _id: ObjectId(req.params.id) });
    const characters = await db.collection('characters').find({ _id: { $in: film.characterIds } }).toArray();
    res.json(characters);
});

app.get('/api/films/:id/planets', async (req, res) => {
    const film = await db.collection('films').findOne({ _id: ObjectId(req.params.id) });
    const planets = await db.collection('planets').find({ _id: { $in: film.planetIds } }).toArray();
    res.json(planets);
});

app.get('/api/characters/:id/films', async (req, res) => {
    const character = await db.collection('characters').findOne({ _id: ObjectId(req.params.id) });
    const films = await db.collection('films').find({ characterIds: character._id }).toArray();
    res.json(films);
});

app.get('/api/planets/:id/films', async (req, res) => {
    const planet = await db.collection('planets').findOne({ _id: ObjectId(req.params.id) });
    const films = await db.collection('films').find({ planetIds: planet._id }).toArray();
    res.json(films);
});

app.get('/api/planets/:id/characters', async (req, res) => {
    const planet = await db.collection('planets').findOne({ _id: ObjectId(req.params.id) });
    const characters = await db.collection('characters').find({ planetIds: planet._id }).toArray();
    res.json(characters);
});
