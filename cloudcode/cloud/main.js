require('cloud/app.js');

var keys = require('cloud/key.json');
var TWILIO_ACC_SID = keys['twilio']['accountSid'];
var TWILIO_AUTH_TOKEN = keys['twilio']['authToken'];

var twilio = require("twilio");
twilio.initialize(TWILIO_ACC_SID, TWILIO_AUTH_TOKEN);

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// Parse.Cloud.define("hello", function(request, response) {
//   response.success("Hello world!");
// });

Parse.Cloud.define('getInterestedClients', function(request, response){
	var query = new Parse.Query(Parse.Object.extend('ClientInterest'));
  query.equalTo('jobId', request.params.id);
  query.find().then(function(interestResults){
  	var clientIds = [];
		interestResults.forEach(function(interest){
      clientIds.push(interest.get('userId'));
    });
		query = new Parse.Query(Parse.Object.extend('User'));
		query.containedIn('objectId', clientIds);
		query.find().then(function(results){
			response.success(results);
		}, function(error){
			response.error('Client lookup failed.');
		});
  }, function(error){
  	response.error('Client interest lookup failed.');
  });
});

Parse.Cloud.define('sendSMS', function(request, response){
  twilio.sendSMS({
    From: '+1 (224) 633-2057',
    To: request.params.number,
    Body: request.params.message
  }, {
    success: function(httpResponse) { response.success('SMS sent!'); },
    error: function(httpResponse) { response.error('Uh oh, something went wrong'); }
  });
});
