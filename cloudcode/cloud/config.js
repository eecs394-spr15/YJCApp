// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');

module.exports = function(app){

	// Global app configuration section
	app.set('views', 'cloud/views');  // Specify the folder to find templates
	app.set('view engine', 'ejs');    // Set the template engine
	app.use(express.bodyParser());    // Middleware for reading request body

};
