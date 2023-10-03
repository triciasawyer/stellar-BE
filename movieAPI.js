'use strict';

const axios = require('axios');

async function getMovies(req, res) {
    let movieSearch = req.query.searchQuery;
    let category = req.query.category;

    let url;

    if (category === 'playing') {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=2`;
    } else if (category === 'playing2') {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=3`
    } else if (category === 'popular') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&sort_by=popularity.desc`;
    } else if (movieSearch) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&page=1&include_adult=false`;
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`
    }

    try {
        const movieSearchResult = await axios.get(url);

        if (movieSearchResult.data.results) {
            const movieArray = movieSearchResult.data.results.map(movie => new Movie(movie));
            res.status(200).send(movieArray);
        } else {
            res.status(404).send('No movies found');
        }
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).send('Error fetching movies');
    }
}


// Define a function to get a movie by ID
// async function getMovieById(req, res) {
// Get the movie ID from the route parameters
// const movieId = req.params.id;

// Make a request to TMDb API using the movieId
//     const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`;

//     try {
//       const response = await axios.get(url);
//       const movieData = new Movie(response.data);
//       res.status(200).send(movieData);
//     } catch (err) {
//       console.error('Error fetching movie by ID:', err);
//       res.status(500).send('Error fetching movie by ID');
//     }
//   }


class Movie {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview = movieObject.overview;
        this.imageUrl = movieObject.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`
            : '';
        this.releasedOn = movieObject.release_date;
    }
}

// module.exports = { getMovies, getMovieById };
module.exports = getMovies;
