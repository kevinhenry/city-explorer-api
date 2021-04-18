const superagent = require('superagent');

function Movie(movie) {
  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  // this.image_url = `${process.env.MOVIE_IMG_PREFIX_URL}${movie.poster_path}`;
  this.image_url = movie.poster_path;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
  this.description = ` | Overview ${movie.overview} | Average Votes ${movie.votes_average} | Total Votes ${movie.vote_count} | Poster ${movie.poster_path} | Popularity ${movie.popularity} | Released On ${movie.release_date}`;
}

  const movies = (request, response) => {
  // USE superagent to make the api call. the DATA most care about lives at results.body
  superagent.get('https://api.themoviedb.org/3/search/movie')
    // .query lets us break up the query parameters using an object instead of a string
    .query({
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.location
    })
    .then(response => response.body.results)
    .then(movies => movies.map(movie => new Movie(movie)))
    .then(result => response.send(result));
}
// node syntax for what we are exporting
module.exports = movies;