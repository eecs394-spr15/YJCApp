require('cloud/app.js');

// grab all keys
var keys = require('cloud/keys.js');

// require and initialize Twilio cloud module
var TWILIO_ACC_SID = keys['twilio']['accountSid'];
var TWILIO_AUTH_TOKEN = keys['twilio']['authToken'];
var twilio = require("twilio")(TWILIO_ACC_SID, TWILIO_AUTH_TOKEN);

// GCM keys
var http = require('http');
var GCMAuth = keys['google']['GCM']['auth'];

// takes job id and returns all users who have expressed interest in the job
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

// sends sms with given message to given phone number
Parse.Cloud.define('sendSMS', function(request, response){
  /*
  twilio.sendSms({
    From: '+1 (224) 633-2057',
    To: request.params.number,
    Body: request.params.message
  }, {
    success: function(httpResponse) { response.success('SMS sent!'); },
    error: function(httpResponse) { response.error('Uh oh, something went wrong'); }
  });
  //*/

  //*
  twilio.sendSms({
    from: '+12246332057',
    to: request.params.number,
    body: request.params.message 
  }, function(err, responseData) { 
    if (err) {
      console.log(err);
      response.error('Uh oh, something went wrong');
    } else { 
      console.log(responseData.from); 
      console.log(responseData.body);
      response.success('SMS sent!');
    }
  });
  //*/
});

// sends push notifications through GCM
Parse.Cloud.define('sendPush', function(request, response){
  //Setup the request
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: 'https://android.googleapis.com/gcm/send',
    headers: {
      'Authorization': 'key=' + GCMAuth,
      'Content-Type': 'application/json',
    },
    body: {
      registration_ids: request.params.registrationIds,
      collapseKey: 'applice',
      timeToLive: 1,
      data: {
        'message': request.params.messageBody,
        'title': request.params.messageTitle,
        'id': request.params.jobId
      }
    },
    success: function(httpResponse) {
      response.success('Push notification sent!');
    },
    error: function(httpResponse) {
      console.error('GCM Request failed' + JSON.stringify(httpResponse));
      response.error('Uh oh, something went wrong');
    }
  });
});

