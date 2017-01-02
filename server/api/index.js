const express = require('express');
const api = express();

const handleSearchRequest = require('./search');
const handleSaveRequest = require('./save');
const handleListRequest = require('./my-list');

api.get('/search',   handleSearchRequest);
api.get('/my-list',  handleListRequest);
api.put('/my-list',  handleSaveRequest);

module.exports = api;
