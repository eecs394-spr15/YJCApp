
// These two lines are required to initialize Express in Cloud Code.
var express = require('express'),
		app = express();

//app.job = require('cloud/job');
//app.profile = require('cloud/profile');


user = null;


// Require the configuration and the routes files, and pass
// the app as argument to the returned functions.
require('cloud/config')(app);
require('cloud/routes')(app);


// Attach the Express app to Cloud Code.
app.listen();

