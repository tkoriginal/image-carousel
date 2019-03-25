'use strict';
const PORT = 5000;
const express = require('express');
const app = express();
const images = require('./images.js');

app.get('/images/:category', (req, res) => {
  let category = req.params.category;
  console.log(category);
  if (!category || !Object.keys(images).includes(category)) {
    return res.status(400).send('Category does not exist');
  }
  res.send({ images: images[category] });
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
