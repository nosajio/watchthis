const express = require('express');
const api = express();

const handleSearchRequest = require('./search-movies');

api.get('/search', handleSearchRequest);

module.exports = api;
