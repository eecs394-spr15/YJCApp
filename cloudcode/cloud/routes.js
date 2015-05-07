// This file is required by app.js. It sets up routes for requests

module.exports = function(app){

	// This is an example of hooking up a request handler with a specific request
	// path and HTTP verb using the Express routing API.
	app.get('/', function(req, res) {
    if (Parse.User.current()) {
      // No need to fetch the current user for querying Note objects.
      	  res.render('index');

    } else {
      // Render a public welcome page, with a link to the '/login' endpoint.
      	  res.render('login');
    	}
  	});

}