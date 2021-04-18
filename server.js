'use strict';
// server.js has the job of tying everyhting together
// most of your requires
// setup of PORT
// app.get/app.use
// app.listen

// bring in express
const express = require('express');
const app = express();

// actually use the .env file I created - where I hide api keys and etc... 
require('dotenv').config();

// allow others to hit our server 
const cors = require('cors');

// makes sure our data is accessible from the React frontend
app.use(cors());

// get handlers from their own files
const weatherHandler = require('./handlers/weather');
// const weather = require('./handlers/weather');
const movieHandler = require('./handlers/movies');
// const { response } = require('express');

// validate that env is working with or
const PORT = process.env.PORT || 3001;

// proof of life
app.get('/proof-of-life', (request, response) => response.send('PROOF of LIFE'));

app.use((error, request, response, next) => {
  console.error(error.stack)
  response.status(500).send('Server Error!')
});

// most of your actual server definition goes here
// a server's job is to listen at some path for a particular method

// listening for GET requests at the path
app.get('/weather', weatherHandler);

app.get('/movies', movieHandler);
  // console.log('Made it to movies', request.query)

app.get('/', (request, response) => {
  response.send('Check Weather!');
});

app.get('*', (request, response) => {
  response.status(500).send('Interal Server Error');
});

// server is on and listening
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
