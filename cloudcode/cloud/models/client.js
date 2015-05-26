var Client = Parse.Object.extend('User');

// get all clients
exports.all = function(callback){
	var query = new Parse.Query(Client);
	query.find({
    success: function(results){
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// get client with matching id
exports.get = function(id, callback){
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(result){
      callback.success(result);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// get client with matching id along with jobs interested in
exports.getFull = function(id, callback){
  var result = {};
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(clientResult){
      result.client = clientResult;
      Parse.Cloud.run('getClientJobInterests', { id: clientResult.id }, {
        success: function(jobInterestResults) {
          result.jobInterests = jobInterestResults;
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

// create new client
exports.create = function(req, callback){
  var client = new Client();

  client.set('username', req.body.username);
  client.set('password', req.body.password);

  /*
  // Set metadata fields
  job.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
  //I think it is the post date
  //job.set('startDate', new Date(req.body.startDate));
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
  

  // job.set('ged', req.body.ged);
  job.set('educationRequirement', String(req.body.educationRequirement));
  job.set('driver', req.body.driver);
  job.set('comment', req.body.comment);

  //job.set('workSchedule', req.body.workSchedule);
  
 
  
  
  job.set('qualifications', req.body.qualifications);
  
  
  
  // // Jobs are read only
  // var acl = new Parse.ACL();
  // acl.setPublicReadAccess(true);
  // job.setACL(acl);
  
  // no errors
  jobErrors = {
    jobTitle: ''
  };
  job.save(null, {
    success: function(job){
      sendNotification(job, false, callback);
    },
    error: function(job, error){
      callback.error(job, error);
    }
  });
  //*/
};

exports.update = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(result){
      /*
      result.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
      //result.set('startDate', new Date(req.body.startDate));
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
     
    
     // result.set('workSchedule', req.body.workSchedule);
     
      //result.set('ged', req.body.ged);
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
      //*/
    },
    error: function(error){
      callback.error(null, error);
    }
  });
};

exports.destroy = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(result){
      result.destroy({
        success: function(client){
          callback.success(client);
        },
        error: function(client, error){
          callback.error(client, error);
        }
      });
    },
    error: function(error){
      callback.error(null, error);
    }
  });
};