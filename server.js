'use strict'
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
// import the json file
// const weatherData = require('./data/weather.json');

// const {response} = require('express');

// actually use the .env file I created - where I hide api keys and etc... 
require('dotenv').config();
// 
const app = express();

// needed for all servers as a default port
const PORT = process.env.PORT || 3001;

function Forecast(day) {
  this.date = day.datetime;
  this.description = `Low temp of ${day.low_temp}, high temp of ${day.high_temp} with ${day.weather.description}`;
}

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `${process.env.MOVIE_IMG_PREFIX_URI}${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

// makes sure our data is accessible from the React frontend
app.use(cors());
app.use((error, request, response, next) => {
  console.error(error.stack)
  response.status(500).send('Server Error!')
});

// most of your actual server definition goes here
// a server's job is to listen at some path for a particular method
// listening for GET requests at the path
app.get('/weather', (request, response) => {
  // when we get that request, send a response that says 'hello!'
  // response has some methods that are very helpful, such as a send method
  // USE superagent to make the api call. the DATA we care most about lives at results.body
  // superagent.get(`${process.env.WEATHERBIT_FORECAST_URI}/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHERBIT_API_KEY}`)

  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    // .query lets us break up the query parameters using an object instead of a string
    .query({
      key: process.env.WEATHERBIT_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
    // .then(weatherData => {
    //   response.json(weatherData.body.data.map(x => (
    //     {date: x.valid_date,
    //       description: x.weather.description})));
    // });
  // query lets us break up the query parameters using an object instead of a string
    .then(response => response.body.data)
    .then(data => data.map(dailyWeather => new Forecast(dailyWeather)))
    .then(result => result.send(result));
});

app.get('/movies', (request, response) => {
  // superagent.get(`${process.env.MOVIE_URI}/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.location}`)

  superagent.get('https://api.themoviedb.org/3/movie/550')
  // superagent.get('https://api.themoviedb.org/3/search/movie')
    // .query lets us break up the query parameters using an object instead of a string
    .query({
      key: process.env.MOVIE_API_KEY,
      location: request.query.location
    })
    .then(response => response.body.results)
    .then(movies => movies.map(movie => new Movie(movie)))
    .then(result => response.send(result));
});

app.get('/', (request, response) => {
  response.send('Check Weather!');
});

app.get('*', (request, response) => {
  response.status(500).send('Interal Server Error');
});

// server is on and listening
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));