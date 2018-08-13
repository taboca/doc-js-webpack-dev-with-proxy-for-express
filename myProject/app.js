'use strict';

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/test', (req, res, next) => {

  var outputJSON = {
    'status' : null
  }

  console.log("Data received from client: ")
  console.log(req.body);

  res
    .status(200)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(outputJSON))
    .end();

});

// This cab be used in case you are serving production
//app.use('/', express.static(path.join(__dirname, 'dist')));

// [START listen]
const PORT = process.env.PORT || 8090;
app.listen(process.env.PORT || 8090, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END listen]
// [END app]

module.exports = app;
