const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    // set up a connection to a local DB
    MongoClient.connect('mongodb://localhost:27017/bookstore').then((client) => {
      // return the DB connection
      dbConnection = client.db()
      // tutorial called 'cb' a 'callback'
      return cb()
    })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}