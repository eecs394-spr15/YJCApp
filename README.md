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
	
### Installation Instructions

  Install appgyver supersonic:
  
  [AppGyver Supersonic Install Instructions]:https://academy.appgyver.com/installwizard
  [Helpful tips for Supersonic install]:http://www.cs.northwestern.edu/academics/courses/394/steroids-setup-tips.php
 
  Download latest release of application from github:
  
  [YJC Release]:https://github.com/eecs394-spr15/YJCApp/releases
  
  Run the following on your terminal
  
  ```sh
  $ steroids login
  $ steroids update
  $ bower install jquery
  ```

  Create the following files:
  
  1. global.json in the /cloudcode/config directory
  
  put the following in /cloudcode/config/global.json:

  ```
  {
    "global": {
      "parseVersion": "1.4.2"
    },
    "applications": {
      "YJCApp": {
        "applicationId": "your-parse-application-id",
        "masterKey": "your-parse-master-key"
      },
      "_default": {
        "link": "YJCApp"
      }
    }
  }
  ```
  
  You can find the parse master key by logging into your parse.com account selecting `YJCApp`, going to `settings`, and then then going to `keys`
  
  2. keys.js in /cloudcode/cloud/
  
  put the following in /cloudcode/cloud/keys.js:

  ```javascript
  var keys =  {
    "twilio": {
      "accountSid": "your-twilio-accountSid",
      "authToken": "your twilio-authToken"
    },
    "google": {
      "GCM": {
        "auth": "your-google-gcm-authorization-key""
      }
    }
  };

  module.exports = keys;
  ```
  
  You can find the twilio api keys by logging in to your twilio account, going to `dashboard` then clicking `Show Api Credentials`
  You can find the google gcm auth token by logging in to google developer account, going to [Google Developer Console]:https://console.developers.google.com/
  clicke on the `YJCApp` project, click on `APIs & auth` on the left sidebar, then click on `Credentials`. Copy the `Api key` under `Key for server applications`
