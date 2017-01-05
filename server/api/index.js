const express = require('express');
const api = express();

const handleSearchRequest          = require('./search');
const handleListRequest            = require('./my-list');
const handleAddContentRequest      = require('./add-content');
const handleEditContentRequest     = require('./edit-content');
const handleDeleteContentRequest  = require('./delete-content');

api.get('/search',                  handleSearchRequest);
api.get('/my-list',                 handleListRequest);
api.post('/my-list/content',        handleAddContentRequest);
api.put('/my-list/content/:id',     handleEditContentRequest);
api.delete('/my-list/content/:id',   handleDeleteContentRequest)

module.exports = api;
