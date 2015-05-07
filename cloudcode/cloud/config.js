// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');

module.exports = function(app){

	// Global app configuration section
	app.set('views', 'cloud/views');  // Specify the folder to find templates
	app.set('view engine', 'ejs');    // Set the template engine
	app.use(express.bodyParser());    // Middleware for reading request body
	// app.use(express.methodOverride());
	// app.use(app.router);

	// Setup your keys 
	app.locals.parseApplicationId = 'v6YwqsYvW2DhyiVxJrte9crarPE0DGIR5GOttEhC';
	app.locals.parseJavascriptKey = 'PDnSHyyq8kRBosmIwZHHbhsN5JqyzDoJVmkNvqDF';


};
