'use strict';
console.log('server running');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());

const mongoose = require('mongoose');

mongoose.connect(
  process.env.URL_DB
)
  .then(() => console.log('Mongo DB is connected!'))
  .catch(e => console.log(e));

const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
  response.send('Welcome to the Movie Streaming Service API!');
});

// Import movie-api functions
const getMovies = require('./movieAPI.js');
// Movie route
app.get('/movies', getMovies);


// Import tv series functions
const getTVSeries = require('./tvSeriesAPI.js');
// TV series route
app.get('/series', getTVSeries);

// const getPopTVSeries = require('./tvSeriesAPI.js');
// app.get('/series', getPopTVSeries);

const getKids = require('./kidsAPI.js');
app.get('/kids', getKids);

const getTrendingActors = require('./trendingActors.js');
app.get('/trending-actors', getTrendingActors);

const MovieModel = require('./Models/movie.js');

app.get('/movies/:id', async (request, response) => {
  try {
    const movieId = request.params.id;
    const movie = await MovieModel.findById(movieId);
    if (!movie) {
      return response.status(404).json({ message: 'Movie not found' });
    }
    response.json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
});


app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
