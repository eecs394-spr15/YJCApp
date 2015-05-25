var Advisor = Parse.Object.extend('Advisor');

// get all advisors
exports.all = function(callback){
	var query = new Parse.Query(Advisor);
	query.find({
    success: function(results){
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

// get advisor with matching id
exports.get = function(id, callback){
  var query = new Parse.Query(Advisor);
  query.get(id, {
    success: function(advisorResult){
      callback.success(result);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

exports.getFull = function(id, callback){
  var result = {};
  var query = new Parse.Query(Advisor);
  query.get(id, {
    success: function(advisorResult){
      result.advisor = advisorResult;
      Parse.Cloud.run('getAdvisorClients', { id: advisorResult.id }, {
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

exports.create = function(req, callback){
	var advisor = new Advisor();
	
	advisor.set('firstName', req.body.firstName);
	advisor.set('lastName', req.body.lastName);
	advisor.set('email', req.body.email);
	advisor.save(null, {
		success: function(advisor){
      callback.success(advisor);
    },
    error: function(advisor, error){
      callback.error(advisor, error);
    }
	});
};

exports.update = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Advisor);
  query.get(id, {
  	success: function(result){
  		result.set('firstName', req.body.firstName);
			result.set('lastName', req.body.lastName);
			result.set('email', req.body.email);
  		result.save(null, {
        success: function(advisor){
          callback.success(advisor);
        },
        error: function(advisor, error){
          callback.error(advisor, error);
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
  var query = new Parse.Query(Advisor);
  query.get(id, {
    success: function(result){
      result.destroy({
        success: function(advisor){
          callback.success(advisor);
        },
        error: function(advisor, error){
          callback.error(advisor, error);
        }
      });
    },
    error: function(error){
      callback.error(null, error);
    }
  });
};