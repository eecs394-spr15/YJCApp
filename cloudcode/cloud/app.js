
// These two lines are required to initialize Express in Cloud Code.
var express = require('express'),
		app = express();

var job = require('cloud/job');
var profile = require('cloud/profile');



// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('cloud/config')(app);
require('cloud/routes')(app);


//define actions
app.post('/createJob', job.create);
app.post('/login', profile.login);
app.get('/logout', profile.logout);

// Attach the Express app to Cloud Code.
app.listen();