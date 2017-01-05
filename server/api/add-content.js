const db = require('../database').db;

module.exports = handleAddContentRequest;

function handleAddContentRequest(req, res) {
  if (! db) {
    return req.status(500).json({error: 'No database connection has been established'});
  }
  const item = req.body;
  // Just update the only list for now
  db.collection('lists').update(
    {name: 'Nosaj List'},
    {$push: { towatch: item }}
  );
  res.status(201).json({ done: true, });
}
