require('dotenv').config();
const fs          = require('fs');
const path        = require('path');
const morgan      = require('morgan');
const express     = require('express');
const compression = require('compression');

const app = express();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 84560;

const serverRoot = path.join(__dirname, '..', 'dist');

const reactRoutes = [
  '/',
];

if (env === 'production') {
  app.use( compression() );
}

// Tell express where the base should be for static files,
// like images, js, css, index.html etc
app.use(express.static(serverRoot));

// Configure logging
const logDir = path.join(__dirname, 'logs');
// Create the logs directory if it doesn't already exist
fs.existsSync(logDir) || fs.mkdirSync(logDir);
const logStream = fs.createWriteStream(path.join(logDir, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));


// Alwsays send the index file for routes in the react app. Let React handle the routing
app.get(reactRoutes, (req, res) => {
  const indexFile = path.join(serverRoot, 'index.html');
  res.sendFile(indexFile);
});

app.listen(port, () => {
  console.log(`HTTP Server is listening on port ${port} ENV: ${env}`);
});
