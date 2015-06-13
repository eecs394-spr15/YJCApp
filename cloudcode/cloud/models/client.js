var Client = Parse.Object.extend('User');
var Advisor = Parse.Object.extend('Advisor');
var Verification = Parse.Object.extend('Verification');

// get all clients
exports.all = function(callback){
	var query = new Parse.Query(Client);
  query.equalTo('admin', false);
	query.find({
    success: function(results){
      var query = new Parse.Query(Verification);
      query.first({
        success: function(result) {
          callback.success(results, result);
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

// get client with matching id along with advisors
exports.getWithAdvisors = function(id, callback){
  var result = {};
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(clientResult){
      result.client = clientResult;
      result.advisorList = [];
      query = new Parse.Query(Advisor);
      query.find({
        success: function(advisorResults){
          for(var i = 0; i < advisorResults.length; i++)
            result.advisorList.push(advisorResults[i].get('firstName') + ' ' + advisorResults[i].get('lastName'));
          callback.success(result);
        },
        error: function(error){
          callback.error(error);
        }
      });
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
      query = new Parse.Query(Advisor);
      query.equalTo('firstName', clientResult.get('advisorFirstName'));
      query.equalTo('lastName', clientResult.get('advisorLastName'));
      //query.equalTo('email', clientResult.get('advisorEmail'));
      query.first({
        success: function(advisorResult){
          result.advisor = advisorResult;
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
    },
    error: function(error){
      callback.error(error);
    }
  });
};

/*
// create new client
exports.create = function(req, callback){
  var client = new Client();

  if (req.body.password !== req.body.password2)
    callback.error(null, { message: 'Passwords do not match.'});

  client.set('username', req.body.username);
  client.set('password', req.body.password);
  client.set('email', req.body.email);
  client.set('enableSMS', true);
  client.set('admin', false);

  client.save(null, {
    success: function(client){
      callback.success(client);
    },
    error: function(client, error){
      callback.error(client, error);
    }
  });
};


exports.update = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Client);
  query.get(id, {
    success: function(result){
      result.set('email', req.body.email);
      result.set('firstName', req.body.firstName);
      result.set('lastName', req.body.lastName);
      result.set('phoneNumber', req.body.phoneNumber);
      result.set('zipcode', req.body.zipcode);
      result.set('jobRadius', parseInt(req.body.jobRadius));
      result.set('dateOfBirth', new Date(req.body.dateOfBirth));

      var criminalHistory = req.body.criminalHistory == 'y' ? true : false;
      result.set('criminalHistory', criminalHistory);
      //callback.success(null);
      /*
      result.set('criminalHistory', req.body.criminalHistory);

      result.set('advisorFirstName', req.body.advisorFirstName);
      result.set('advisorLastName', req.body.advisorLastName);
      result.set('advisorEmail', req.body.advisorEmail);

      result.set('interests', req.body.interests);
      result.set('timeAvailable', req.body.timeAvailable);
      result.set('education', req.body.education);

      result.set('enableSMS', req.body.enableSMS);
      

      result.save(null, {
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
//*/