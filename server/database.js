/**
 * Mongo Database Connection
 * This file is used for establishing and maintaining a connection to mongodb
 */

const MongoClient = require('mongodb').MongoClient;
const databaseName = 'watchthis';
const databaseURL = `mongodb://localhost:27017/${databaseName}`;

const connect = function () {
  return new Promise(handler);

  function handler(resolve, reject) {
    MongoClient.connect(databaseURL, (err, db) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(db)
      // Cache the same database connection while the app is running
      module.exports.db = db;
    });
  }
};

module.exports = {connect};
