import express = require('express');
import bodyParser = require('body-parser');

// Create a new express application instance
const app: express.Application = express();
const port:number =  3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/json2db',require('./routes/controllers/json-to-db/json-to-db.controller'));
app.use('/api/users',require('./routes/controllers/users/user.controller'));

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});