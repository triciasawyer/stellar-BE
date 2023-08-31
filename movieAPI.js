'use strict';

const axios = require('axios');

async function getMovies(request, response) {
    let movieSearch = request.query.searchQuery;
    let url;

    if (movieSearch) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&page=1&include_adult=false`;
    } else {
        // If no search query, allow the fetching of all movies
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
    }

    try {
        const movieSearchResult = await axios.get(url);

        if (movieSearchResult.data.results) {
            const movieArray = movieSearchResult.data.results.map(movie => new Movie(movie));
            response.status(200).send(movieArray);
        } else {
            response.status(404).send('No movies found');
        }
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
