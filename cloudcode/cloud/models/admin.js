var User = Parse.Object.extend('User');

exports.all = function(callback){
	var query = new Parse.Query(User);
	query.equalTo('admin', true);
	query.find({
    success: function(results){
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });
};

exports.create = function(req, callback){
	var admin = new Admin();
	admin.set('email', req.body.email);
	admin.set('password', req.body.password);
  admin.save(null, {
    success: function(user){
      callback.success(user);
    },
    error: function(user, error){
      callback.error(user, error);
    }
  });
};

exports.update = function(id, req, callback){
	var query = new Parse.Query(User);
	query.get(id, {
		success: function(result){
			result.set('email', req.body.email);
			result.set('password', req.body.password);
      result.save(null, {
        success: function(user){
          callback.success(user);
        },
        error: function(user, error){
          callback.error(user, error);
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
	var query = new Parse.Query(User);
	query.get(id, {
	  success: function(result){
	    result.destroy({
	      success: function(user){
	        callback.success(user);
	      },
	      error: function(user, error){
	        callback.error(user, error);
	      }
	    });
	  },
	  error: function(error){
	    callback.error(null, error);
	  }
	});
};
