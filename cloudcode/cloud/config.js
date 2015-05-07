// This file handles the configuration of the app.
// Place all express configurations in this file.

var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');

module.exports = function(app){

	// Global app configuration section
  app.set('views', 'cloud/views');  // Specify the folder to find templates
  app.set('view options', { layout:'cloud/layout.ejs' });
  app.set('view engine', 'ejs');    // Set the template engine
  app.use(express.bodyParser());    // Middleware for reading request body
  app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
  app.use(express.cookieParser('yjcpurple'));
  app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

	// Setup parse app keys 
  app.locals.parseApplicationId = 'v6YwqsYvW2DhyiVxJrte9crarPE0DGIR5GOttEhC';
  app.locals.parseJavascriptKey = 'PDnSHyyq8kRBosmIwZHHbhsN5JqyzDoJVmkNvqDF';


};
