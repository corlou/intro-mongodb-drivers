const express = require('express')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()

// db connection
let db

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})


// routes
app.get('/books', (req, res) => {
  // empty array
  let books = []

  db.collection('books')
    .find()// cursor toArray forEach
    .sort({ author: 1 })
    // for each singular book found, add it to the books array
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" })
    })
})