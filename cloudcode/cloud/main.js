require('cloud/app.js');

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

Parse.Cloud.define('getAdvisorClients', function(request, response){
  var query = new Parse.Query(Parse.Object.extend('User'));
  query.equalTo('advisorFirstName', request.params.advisorFirstName);
  query.equalTo('advisorLastName', request.params.advisorLastName);
  query.equalTo('advisorEmail', request.params.advisorEmail);
  query.find().then(function(results){
    response.success(results);
  }, function(error){
    response.error('Advisor clients lookup failed.')
  });
});