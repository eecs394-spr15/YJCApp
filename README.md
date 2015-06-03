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

  To install a working version of the app go to the Google Play Store:
  
  [YJC]:https://play.google.com/store/apps/details?id=com.yjc.yjcapp.playstore&hl=en

  To download the code for development:

  1. Install appgyver supersonic:
  
  [AppGyver Supersonic Install Instructions](https://academy.appgyver.com/installwizard)
  [Helpful tips for Supersonic install](http://www.cs.northwestern.edu/academics/courses/394/steroids-setup-tips.php)
 
  2. Download latest release of application from github:
  
  [YJC Release](https://github.com/eecs394-spr15/YJCApp/releases)
  
  3. Run the following on your terminal
  
  ```sh
  $ steroids login
  $ steroids update
  $ bower install jquery
  ```

  4. Create the following files:
  
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
  
  You can find the parse master key by logging into your parse.com account selecting `YJCApp`, going to `settings`, and then then going to `keys`.
  
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
  
  You can find the twilio api keys by logging in to your twilio account, going to `dashboard` then clicking `Show Api Credentials`.
  
  You can find the google gcm auth token by logging in to google developer account, going to [Google Developer Console](https://console.developers.google.com/) click on the `YJCApp` project, click on `APIs & auth` on the left sidebar, then click on `Credentials`. Copy the `Api key` under `Key for server applications`.
  
### Build and Deploy

  To build the app run on terminal:
  
  ```sh
  $ steroids connect
  ```
  
  This will open a page in your browser with a QR code. User the AppGyver scanner application from the Play Store to scan this QR code. This will open a test version of the application onto your phone that is useful for debugging.
  
  
  To deploy the application to either the Play Store or Apple App Store use the following instructions:
  
  [Deploying app to AppGyver cloud](http://docs.appgyver.com/tooling/build-service/build-settings/)
  [Build settings for Android](http://docs.appgyver.com/tooling/build-service/build-settings/build-settings-for-android/)
  [Build settings for IOS](http://docs.appgyver.com/tooling/build-service/build-settings/build-settings-for-ios/)
  [Android build types](http://docs.appgyver.com/tooling/build-service/build-settings/android-build-types/)
  [IOS build types](http://docs.appgyver.com/tooling/build-service/build-settings/ios-build-types/)
  
  When configuring the build settings on the appgyver cloud, please include the following under the `Plugins` section:
  
  ```
  [
    {"source":"https://github.com/AppGyver/PushNotifications#next"}
  ]
  ```
  
  
  For more information on plugins, build configuration, and deploying to the play store please view the private google drive document on the developer account.
  
  
