const { request, response } = require('express');
const superagent = require('superagent');

function Forecast(day) {
  this.date = day.datetime;
  this.description = ` Low of ${day.low_temp} %, High of ${day.high_temp} % with ${day.weather.description}.`;
}

const forecast = (request, response) => {
// module.exports = (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    // .query lets us break up the query parameters using an object instead of a string
    .query({
      key: process.env.WEATHER_API_KEY,
      units: 'I',
      lat: request.query.lat,
      lon: request.query.lon
    })
      
    .then(result => {
      const data = result.body.data.map(dailyWeather => new Forecast(dailyWeather))
      response.status(200).send(data)
    }
  );
}
// node syntax for what we are exporting
module.exports = forecast;