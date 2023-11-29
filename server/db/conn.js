const { MongoClient } = require('mongodb');
const Db = process.env.ATLAS_URI; // Set in my .env file
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect()
      .then((connectedClient) => {
        _db = connectedClient.db('StockTracking'); // The DB name
        console.log('Successfully connected to MongoDB.');
        callback();
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        callback(err);
      });
  },

  getDb: function () {
    return _db;
  },
};
