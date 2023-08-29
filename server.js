'use strict';
console.log('server running');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(
  process.env.URL_DB
)
  .then(() => console.log('Mongo DB is connected!'))
  .catch(e => console.log(e));

const PORT = process.env.PORT || 5005;

// Import movie-api functions
const getMovies = require('./movieAPI.js');

app.get('/', (request, response) => {
  response.send('Welcome to the Movie Streaming Service API!');
});

// Movie route
app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));