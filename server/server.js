'use strict';
const PORT = 5000;
const express = require('express');
const app = express();
const { sharksList, catsList } = require('./images.js');

app.get('/', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
