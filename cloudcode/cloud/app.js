
// These two lines are required to initialize Express in Cloud Code.
var express = require('express'),
		app = express();

var job = require('cloud/job');


// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('cloud/config')(app);
require('cloud/routes')(app);


//define actions
app.post('/createJob', job.create);

// Attach the Express app to Cloud Code.
app.listen();
