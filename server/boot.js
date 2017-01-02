const fs          = require('fs');
const path        = require('path');
const morgan      = require('morgan');
const express     = require('express');
const compression = require('compression');

module.exports = bootApplication;

function bootApplication(env, port) {
  const app = express();
  const serverRoot = path.join(__dirname, '..', 'dist');
  const reactRoutes = [
    '/',
  ];

  if (env === 'production') {
    app.use( compression() );
  }

  app.use('/api', require('./api'));

  // Tell express where the base should be for static files,
  // like images, js, css, index.html etc
  app.use(express.static(serverRoot));

  // Configure logging
  if (env === 'production') {
    const logDir = path.join(__dirname, 'logs');
    // Create the logs directory if it doesn't already exist
    fs.existsSync(logDir) || fs.mkdirSync(logDir);
    const logStream = fs.createWriteStream(path.join(logDir, 'access.log'), {flags: 'a'});
    app.use(morgan('combined', {stream: logStream}));
  }


  // Alwsays send the index file for routes in the react app. Let React handle the routing
  app.get(reactRoutes, (req, res) => {
    const indexFile = path.join(serverRoot, 'index.html');
    res.sendFile(indexFile);
  });

  app.listen(port, () => {
    console.log(`💚  HTTP Server is listening on port ${port} ENV: ${env}`);
  });
}
