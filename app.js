const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000');
    });
    db = getDb();
  }
});

app.get('/books', (req, res) => {
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch the document' });
      });
  } else {
    res.status(500).json({ error: "Not a valid Id" })
  }
});

app.post("/books", (req, res) => {
  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ err: "Could not create a new document" })
    })
})
