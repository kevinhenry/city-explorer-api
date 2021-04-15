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

function Forecast(day){
  this.date = day.datetime;
  this.description = `Low temp of ${day.low_temp}, high temp of ${day.high_temp} with ${day.weather.description}`;
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
  superagent.get(`${process.env.WEATHERBIT_FORECAST_URL}/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHERBIT_API_KEY}`)
  // query lets us break up the query parameters using an object instead of a string
    .then(response => response.body.data)
    .then(data => data.map(dailyWeather => new Forecast(dailyWeather)));
});

app.get('/', (request, response) => {
  response.send('Check Weather!');
  });

app.get('*', (request, response) => {
  response.status(500).send('Interal Server Error');
  });

// server is on and listening
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));