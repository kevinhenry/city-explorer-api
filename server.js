const express = require('express');
const cors = require('cors');
// import the json file
// const {response} = require('express');
const weatherData = require('./data/weather.json');
const { response } = require('express');
// actually use the .env file I created - where I hide api keys and etc... 
require('dotenv').config();
// 
const app = express();

// makes sure our data is accessible from the React frontend
app.use(cors());
// needed for all servers as a default port
const PORT = process.env.PORT || 3001;

// most of your actual server definition goes here
// a server's job is to listen at some path for a particular method
// listening for GET requests at the path
app.get('/weather', (request, response) => {
  // when we get that request, send a response that says 'hello!'
  // response has some methods that are very helpful, such as a send method
  response.json(weatherData);
});

app.get('/', (request, response) => {
  response.send('hello!');
});

app.get('*', (request, response) => {
  response.status(500).send('Interal Server Error');
});

let forecastData = [];

function Forcast (data, description){
  this.date = date;
  this.description = description;
  forcastData.push(this);
}
// server is on and listening
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

console.log('hello!');