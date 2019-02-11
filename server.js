const express = require('express');
const path = require('path');

const app = express();

// Connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/troytips')

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Tip model
const Tip = require('./models/Tip');

app.use(express.static(path.join(__dirname, 'public')));

// Get all tips in the database
// TODO: Error handling
app.get('/', (req, res) => {
  Tip.find({}, null, {sort: {created: -1}}, function (err, tips) {
    if (!err) {
      res.render('home', {
        tips: tips
      });
    }
  });
});

// Create a new tip
// TODO: Error handling
app.post('/tip/new', (req, res) => {
  var tip = new Tip({
    content: req.body.content,
    author: req.body.author
  });

  tip.save(function (err) {
    res.redirect('/');
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Launching our app on port 3000 🚀'));
