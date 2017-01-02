const request = require('request');

const api_key = process.env.MOVIEDB_API_KEY;

module.exports = handleSearchRequest;

function handleSearchRequest(req, res) {
  const searchString = req.query.q;
  if (! searchString) {
    return res.status(400).json({error: '?q=<searchString> is missing from the URL'});
  }
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchString}&page=1&include_adult=false`;

  request(endpoint, handleResponse);

  function handleResponse(err, response, body) {
    if (! err && response.statusCode === 200) {
      return res.json(JSON.parse(body));
    }
  }

}
