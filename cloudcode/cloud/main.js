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


/* Cloud functions */

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

// returns clients associated to given advisor
Parse.Cloud.define('getAdvisorClients', function(request, response){
  var query = new Parse.Query(Parse.Object.extend('User'));
  query.equalTo('admin', false);
  query.equalTo('advisorFirstName', request.params.advisorFirstName);
  query.equalTo('advisorLastName', request.params.advisorLastName);
  query.equalTo('advisorEmail', request.params.advisorEmail);

  query.find().then(function(results){
    response.success(results);
  }, function(error){
    response.error('Advisor clients lookup failed.')
  });
});

Parse.Cloud.define('getClientJobInterests', function(request, response){
  var query = new Parse.Query(Parse.Object.extend('ClientInterest'));
  query.equalTo('userId', request.params.id);
  query.find().then(function(interestResults){
    var jobIds = [];
    interestResults.forEach(function(interest){
      jobIds.push(interest.get('jobId'));
    });
    query = new Parse.Query(Parse.Object.extend('Job'));
    query.containedIn('objectId', jobIds);
    query.find().then(function(results){
      response.success(results);
    }, function(error){
      response.error('Jobs of interest lookup failed.');
    });
  }, function(error){
    response.error('Client interest lookup failed.');
  });
});


// sends sms with given message to given phone number
Parse.Cloud.define('sendSMS', function(request, response){

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

// sends GCM push notifications
Parse.Cloud.define('sendPush', function(request, response){

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
      response.error('Uh oh, push notification failed.');
    }
  });

});


// sends GCM push notification and SMS
Parse.Cloud.define('sendNotifications', function(request, response){
  var postalCodesResult = [];
  Parse.Cloud.httpRequest({
    method: 'GET',
    url: request.params.geonameURL,
    success: function(httpResponse){
      for (var item in httpResponse.data.postalCodes){
        postalCodesResult.push(httpResponse.data.postalCodes[item].postalCode); 
      }

      //* send notifications if nearby
      if (postalCodesResult.indexOf(request.params.jobPostalCode.toString()) == -1)
        response.error(request.params.number+': Uh oh, the job is not within the specified radius');
      else {

        if (request.params.enableSMS)
          Parse.Cloud.run('sendSMS', {
            number: request.params.number,
            message: request.params.messageTitle + ': ' + request.params.messageBody
          }, {
            success: function(result){
              if (request.params.registrationIds)
                Parse.Cloud.run('sendPush', {
                  jobId: request.params.jobId,
                  messageTitle: request.params.messageTitle,
                  messageBody: request.params.messageBody,
                  registrationIds: request.params.registrationIds
                }, {
                  success: function(result){ 
                    response.success('SMS and push notification sent!'); 
                  },
                  error: function(error){
                    console.error('GCM Request failed' + JSON.stringify(httpResponse));
                    response.error('Uh oh, push notification failed.');
                  }
                });
              else {
                console.log('No registration id for ' + request.params.number);
                response.error('No registration id for ' + request.params.number);
              }
            },
            error: function(error){ 
              response.error('Uh oh, something went wrong'); }
          })
        else {
          if (request.params.registrationIds)
            Parse.Cloud.run('sendPush', {
              jobId: request.params.jobId,
              messageTitle: request.params.messageTitle,
              messageBody: request.params.messageBody,
              registrationIds: request.params.registrationIds
            }, {
              success: function(result){ 
                response.success('SMS and push notification sent!'); 
              },
              error: function(error){
                console.error('GCM Request failed' + JSON.stringify(httpResponse));
                response.error('Uh oh, push notification failed.');
              }
            });
          else {
            console.log('No registration id for ' + request.params.number);
            response.error('No registration id for ' + request.params.number);
          }
        }
      }
      //*/
    },
    error: function(httpResponse){
      console.error('Geoname request failed' + JSON.stringify(httpResponse));
      response.error('Uh oh, something went wrong');
    }
  });
});
