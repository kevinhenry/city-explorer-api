// 'use strict';
const superagent = require('superagent');
// get variagble from a .env
require('dotenv').config();
// bring in express
const express = require('express');

const app = express();
// allow others to hit our server
const cors = require('cors');

app.use(cors());

const superagent = require('superagent');

// validate that env is working with or
const PORT = process.env.PORT || 3001;

console.log('its\'s working!');

// proof of life: just do the most simple request possible
app.get('/weather', (request, response) => {
  // USE superagent to make the api call. the DATA we care most about lives at results.body
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  // query lets us break up the query parameters using an object instead of a string
    .query({
      key: process.env.WEATHERBIT_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
    .then(weatherData => {
      response.json(weatherData.body.data.map(x => (
        {date: x.valid_date,
          description: x.weather.description})));
    });
});
      // response.status(200).send(imageResults.body.results.map(img => new ImageObject(img)));

// things I want from API
// alt_description
// urs.regular
//  user.name

// turns server on
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
