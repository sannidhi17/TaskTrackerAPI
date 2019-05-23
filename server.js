const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express(),
      task       = require('./api/models/todoListModel'),
      routes     = require('./api/routes/todoListRoutes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
  res.setHeader('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}

app.use(allowCrossDomain);

routes(app);

/////////
// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
///////////

app.get('/', (req, res) => {
	res.json({"message": "Welcome message :D"});
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
