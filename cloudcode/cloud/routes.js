// This file is required by app.js. It sets up routes for requests

module.exports = function(app){

	// This is an example of hooking up a request handler with a specific request
	// path and HTTP verb using the Express routing API.
	app.get('/', function(req, res) {
	  res.render('index', { message: 'Congrats, you just set up your app!' });
	});

	// // Example reading from the request query string of an HTTP get request.
	// app.get('/test', function(req, res) {
	//   // GET http://example.parseapp.com/test?message=hello
	//   res.send(req.query.message);
	// });

	// // Example reading from the request body of an HTTP post request.
	// app.post('/test', function(req, res) {
	//   // POST http://example.parseapp.com/test (with request body "message=hello")
	//   res.send(req.body.message);
	// });

}