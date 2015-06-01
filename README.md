# YJC

A job listing and matching system built for the Youth Job Center in Evanston


### Technical

The system uses the following to work properly:

* [AngularJS](https://angularjs.org/) - HTML enhanced for web apps!
* [Supersonic](http://www.appgyver.com/supersonic/ui) - Hybrid app UI framework
* [Parse](https://parse.com/) - dynamic web app hosting and database
* [Express](http://expressjs.com/) - fast node.js network app framework
* [jQuery](https://jquery.com/) - easy DOM manipulation
* [Twitter Bootstrap](http://getbootstrap.com/) - responsive HTML/CSS/JS framework


### Web App Structure

  controllers/   --all module-specific routing go here
  models/    --all model functions interacting with Parse backend go here
	views/    --all views go here (under respective module folders)
	app.js    --main application file
	config.js    --app configurations
	main.js    --all Parse Cloud Code
	routes.js    --main app routing
	