require('dotenv').config();

const database = require('./database');
const boot     = require('./boot');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 84560;

database
  .connect()
  .then(() => {
    console.log('☁️  Database connection established');
    boot(env, port)
  });
