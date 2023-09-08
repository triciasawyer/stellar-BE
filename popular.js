// 'use strict';

// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// // Route for fetching popular movies
// router.get('/popular-movies', async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://api.themoviedb.org/3/movie/popular',
//       {
//         params: {
//           api_key: process.env.MOVIE_API_KEY,
//           language: 'en-US',
//           page: 1,
//         },
//       }
//     );

//     res.json(response.data.results);
//   } catch (error) {
//     console.error('Error fetching popular movies:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route for fetching popular TV shows
// router.get('/popular-tv-shows', async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://api.themoviedb.org/3/tv/popular',
//       {
//         params: {
//           api_key: process.env.MOVIE_API_KEY,
//           language: 'en-US',
//           page: 1,
//         },
//       }
//     );

//     res.json(response.data.results);
//   } catch (error) {
//     console.error('Error fetching popular TV shows:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// module.exports = router;
