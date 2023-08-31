'use strict';

const axios = require('axios');

async function getTVSeries(request, response) {
    let seriesSearch = request.query.searchQuery;
    let url;

    if (seriesSearch) {
        url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${seriesSearch}&page=1&include_adult=false`;
    } else {
        // If no search query, allow the fetching of all movies
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
    }

    try {
        const seriesSearchResult = await axios.get(url);

        if (seriesSearchResult.data.results) {
            const seriesArray = seriesSearchResult.data.results.map(serie => new Series(serie));
            response.status(200).send(seriesArray);
        } else {
            response.status(404).send('No tv series found');
        }
    } catch (error) {
        console.error('Error fetching tv series:', error);
        response.status(500).send('Error fetching tv series');
    }
}

class Series {
    constructor(seriesObject) {
        this.title = seriesObject.title;
        this.overview = seriesObject.overview;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${seriesObject.poster_path}`;
        this.releasedOn = seriesObject.release_date;
    }
}

module.exports = getTVSeries;
