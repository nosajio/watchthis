const db = require('../database').db;

module.exports = handleDeleteContentRequest;

function handleDeleteContentRequest(req, res) {
  if (! db) {
    return req.status(500).json({error: 'No database connection has been established'});
  }
  const contentId = req.params.id;
  if (! contentId) {
    return res.status(400).json({
      error: 'id param is missing from url'
    });
  }
  db.collection('lists').update(
    {name: 'Nosaj List'},
    {$pull: { towatch: {id: contentId} }}
  );
  res.status(201).json({ done: true, });
}
