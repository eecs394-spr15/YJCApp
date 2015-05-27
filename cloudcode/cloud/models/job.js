var Job = Parse.Object.extend('Job');
var User = Parse.Object.extend('User');

// get all jobs
exports.all = function(callback){
	var query = new Parse.Query(Job);
	query.find({
    success: function(results){
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// get job with matching id
exports.get = function(id, callback){
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(result){
      callback.success(result);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// get job with matching id along with client interests
exports.getFull = function(id, callback){
  var result = {};
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(jobResult){
      result.job = jobResult;
      Parse.Cloud.run('getInterestedClients', { id: jobResult.id }, {
        success: function(clientResults) {
          result.clients = clientResults;
          callback.success(result);
        },
        error: function(error) {
          callback.error(error);
        }
      });
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// create new job
exports.create = function(req, callback){
  var job = new Job();
  
  // Set data fields
  job.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
  job.set('company', req.body.company);
  job.set('address', String(req.body.address));
  job.set('city', String(req.body.city));
  job.set('zipcode', parseInt(req.body.zipcode) || 0);
  job.set('contact', req.body.contact); 
  job.set('email', req.body.email); 
  job.set('phone', req.body.phone); 
  job.set('hiringProcess', req.body.hiringProcess);

  job.set('jobTitle', req.body.jobTitle);
  job.set('jobDescription', req.body.jobDescription);
  job.set('fullTime', req.body.fullTime);
  job.set('minAge', parseInt(req.body.minAge));
  job.set('numOpenings', parseInt(req.body.numOpenings) || 0);
  job.set('hoursPerWeek', parseFloat(req.body.hoursPerWeek) || 0.0);
  job.set('salary', req.body.salary);
  job.set('backgroundCheck', req.body.backgroundCheck);
  job.set('drugTest', req.body.drugTest);
  
  job.set('educationRequirement', String(req.body.educationRequirement));
  job.set('driver', req.body.driver);
  job.set('comment', req.body.comment);  
  
  job.set('qualifications', req.body.qualifications);
  
  job.save(null, {
    success: function(job){
      sendNotification(job, false, callback);
    },
    error: function(job, error){
      callback.error(job, error);
    }
  });
};

exports.update = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(result){
      result.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
      result.set('company', req.body.company);
      result.set('address', String(req.body.address));
      result.set('city', String(req.body.city));
      result.set('zipcode', parseInt(req.body.zipcode) || 0);
      
      result.set('contact', req.body.contact); 
      result.set('email', req.body.email); 
      result.set('phone', req.body.phone); 
      result.set('hiringProcess', req.body.hiringProcess); 

      result.set('jobTitle', req.body.jobTitle);
      result.set('jobDescription', req.body.jobDescription);
      result.set('fullTime', req.body.fullTime);
      result.set('minAge', parseInt(req.body.minAge));
      result.set('numOpenings', parseInt(req.body.numOpenings) || 0);
      result.set('hoursPerWeek', parseFloat(req.body.hoursPerWeek) || 0.0);
      result.set('salary', req.body.salary);
      
      result.set('backgroundCheck', req.body.backgroundCheck);
      result.set('drugTest', req.body.drugTest);
     
      result.set('educationRequirement', String(req.body.educationRequirement));
      result.set('driver', req.body.driver);
      result.set('qualifications', req.body.qualifications);
    
      result.set('comment', req.body.comment);
      result.save(null, {
        success: function(job){
          sendNotification(job, true, callback);
        },
        error: function(job, error){
          callback.error(job, error);
        }
      });
    },
    error: function(error){
      callback.error(null, error);
    }
  });
};

exports.destroy = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(result){
      result.destroy({
        success: function(job){
          callback.success(job);
        },
        error: function(job, error){
          callback.error(job, error);
        }
      });
    },
    error: function(error){
      callback.error(null, error);
    }
  });
};


function sendNotification(job, isUpdated, callback){
  var jobId = job.id;
  var jobTitle = job.get('jobTitle');
  var jobPostalCode = job.get('zipcode');
  var education = job.get('educationRequirement');
  var industry = job.get('EmployerIndustryTypes');
  var minAge = job.get('minAge');
  var fullTime = job.get('fullTime');
  var jobZipCode = job.get('zipcode');
  var backgroundCheck = job.get('backgroundCheck') == 'Yes' ? true : false;
  
  var query = new Parse.Query(User);
  query.equalTo('education', education);
  query.equalTo('admin', false);
  query.equalTo('interests', industry);

  var dateOfBirth = new Date();
  dateOfBirth.setFullYear(dateOfBirth.getFullYear() - minAge);
  query.lessThan('dateOfBirth', dateOfBirth);

  query.equalTo('timeAvailable', fullTime);

  if (backgroundCheck)
    query.equalTo('criminalHistory', false);
  
  query.descending('createdAt');
  query.limit(1000);
  query.find().then(function(results){
    for(var i = 0; i < results.length; i ++){
      console.log('Username: ' + results[i].get('username'));

      // setup and call cloud function to send notifications
      var userCountry = 'US';
      var userMaxRows = 500;
      var userPostcode = results[i].get('zipcode');
      var userRadius = results[i].get('jobRadius') * 1.609;   // convert to km
      if(userRadius > 30) { userRadius = 30; }

      var userNameForGeoQuery = 'YJCApp';
      var callURL = 'http://api.geonames.org/findNearbyPostalCodesJSON' + 
                    '?postalcode=' + userPostcode + 
                    '&country=' + userCountry + 
                    '&radius=' + userRadius + 
                    '&username=' + userNameForGeoQuery + 
                    '&maxRows=' + userMaxRows;

      var registrationIds = results[i].get('registrationId');

      var pushTitle = isUpdated ? 'YJC - Job Updated' : 'YJC - New Job Opening';
      var pushMessage = jobTitle;
      Parse.Cloud.run('sendNotifications', {
        jobId: jobId,
        jobPostalCode: jobPostalCode,
        geonameURL: callURL,
        registrationIds: registrationIds,
        messageTitle: pushTitle,
        messageBody: pushMessage,
        enableSMS: results[i].get('enableSMS'),
        number: results[i].get('phoneNumber')
      }, {
        success: function(result){ callback.success(job); },
        error: function(error){ callback.success(job); }
      });
    }
    //console.log('Matches: ' + results.length);
  });
}