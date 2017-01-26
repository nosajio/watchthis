const db = require('../database').db;

module.exports = handleEditContentRequest;

function handleEditContentRequest(req, res) {
  if (! db) {
    return res.status(500).json({error: 'No database connection has been established'});
  }
  const {query, params} = req;
  if (! params.id) {
    return res.status(400).json({error: 'The :id param is missing: /my-list/:id'});;
  }
  if (! query.flag) {
    return res.status(400).json({error: 'The `flag` query param is required. Example: ?flag=watched, ?flag=remove etc'});;
  }

  const contentId = parseInt(params.id);
  switch (query.flag) {
    case 'watched': return handleWatched();
    case 'remove': return handleRemove();
    default: return handleError();
  }

  function handleWatched() {
    db.collection('lists')
      .find({name: 'Nosaj List'})
      .toArray((err, doc) => {
        if (err) {
          return res.status(500).json({error: err});
        }
        const cachedItem = doc[0].towatch.filter(it => it.id === contentId)[0];
        db.collection('lists').update(
          {name: 'Nosaj List'},
          {
            $push: { watched: cachedItem },
            $pull: { towatch: {id: contentId} }
          }
        );
        res.status(200).json({ done: true, });
      });
  }

  function handleRemove() {

  }

  function handleError() {

  }

}
