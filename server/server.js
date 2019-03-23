'use strict';
const PORT = 5000;
const express = require('express');
const app = express();
const { sharksList, catsList, allImages } = require('./images.js');

app.get('/images/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  if (id === 'cats') {
    res.send({ images: catsList });
  }
  if (id === 'sharks') {
    res.send({ images: sharksList });
  }
  if (id === 'all') {
    res.send({ images: allImages });
  }
});
app.get('/user', (req, res) => res.send({ user: 'Travis' }));

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
