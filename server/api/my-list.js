const db = require('../database').db;

module.exports = handleListRequest;

function handleListRequest(req, res) {
  if (! db) {
    return req.status(500).json({error: 'No database connection has been established'});
  }
  db
    .collection('lists')
    .find({})
    .toArray((err, results) => {
      res.json(results[0])
    });
}
