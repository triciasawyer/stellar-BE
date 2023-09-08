'use strict';

const axios = require('axios');

async function getMovies(req, res) {
    let movieSearch = req.query.searchQuery;
    let category = req.query.category;
    
    let url;

    // edit url to get popular movies (may make seperate component for that)
    if (category === 'popular') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&sort_by=popularity.desc`;
    } else if (movieSearch) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&page=1&include_adult=false`;
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
    }

    try {
        const movieSearchResult = await axios.get(url);

        if (movieSearchResult.data.results) {
            const movieArray = movieSearchResult.data.results.map(movie => new Movie(movie));
            res.status(200).send(movieArray);
        } else {
            res.status(404).send('No movies found');
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
}

class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
        this.releasedOn = movieObject.release_date;
        // this.trailerKey = movieObject.trailerKey;

    }
}

module.exports = getMovies;
