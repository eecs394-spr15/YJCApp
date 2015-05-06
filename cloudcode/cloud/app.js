
// These two lines are required to initialize Express in Cloud Code.
var express = require('express'),
		app = express();

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./config')(app);
require('./routes')(app);

// Attach the Express app to Cloud Code.
app.listen();
