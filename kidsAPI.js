'use strict';

const axios = require('axios');

async function getKids(request, response) {
    let kidSearch = request.query.searchQuery;
    let url;

    if (kidSearch) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&certification_country=US&certification.lte=G&with_genres=16&query=${kidSearch}&page=1`;
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&certification_country=US&certification.lte=G&with_genres=16&page=1`;
    }

    try {
        const kidSearchResult = await axios.get(url);

        if (kidSearchResult.data.results) {
            const kidArray = kidSearchResult.data.results.map(kid => new Kid(kid));
            response.status(200).send(kidArray);
        } else {
            response.status(404).send('No kid movies found');
        }
    } catch (error) {
        console.error('Error fetching kid movies:', error);
        response.status(500).send('Error fetching kid movies');
    }
}

class Kid {
    constructor(kidObject) {
        this.title = kidObject.title;
        this.overview = kidObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${kidObject.poster_path}`;
        this.releasedOn = kidObject.release_date;
    }
}

module.exports = getKids;
