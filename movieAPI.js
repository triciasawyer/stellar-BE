'use strict';

const axios = require('axios');

// Movie route
async function getMovies(request, response) {
    let cityMovieSearch = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityMovieSearch}&page=1&include_adult=false`;
    
    try {
        const movieSearch = await axios.get(url);
        const movieArray = movieSearch.data.results.map(movie => new Movie(movie));
        response.status(200).send(movieArray);
    } catch (error) {
        console.error('Error fetching movies:', error);
        response.status(500).send('Error fetching movies');
    }
}

class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
        this.releasedOn = movieObject.release_date;
    }
}

module.exports = getMovies;
