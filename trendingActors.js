'use strict';

const axios = require('axios');

async function getTrendingActors(req, res) {
    const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';

    try {
        const response = await axios.get(url, {
            params: {
                api_key: process.env.MOVIE_API_KEY,
            },
        });

        if (response.data.results) {
            const actorArray = response.data.results.map(actor => new Actor(actor));
            res.status(200).send(actorArray);
        } else {
            res.status(404).send('No actors found');
        }
    } catch (err) {
        console.error('Error fetching actors:', err);
        res.status(500).send('Error fetching actors');
    }
}

class Actor {
    constructor(actorObject) {
        this.id = actorObject.id;
        this.name = actorObject.name;
        this.profileImageUrl = `https://image.tmdb.org/t/p/w500${actorObject.profile_path}`;
        this.biography = actorObject.biography;
    }
}

module.exports = getTrendingActors;

