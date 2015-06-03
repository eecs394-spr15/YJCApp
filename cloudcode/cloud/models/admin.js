var Admin = Parse.Object.extend('User');

exports.all = function(id, callback){
	query = new Parse.Query(Admin);
	query.equalTo('admin', true);
	query.notEqualTo('objectId', id);
	query.find({
    success: function(adminResults){
      results.admins = adminResults;
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });

	/*
	results = {};
	var query = new Parse.Query(Admin);
  query.get(id, {
    success: function(userResult){
      results.user = userResult;

    	query = new Parse.Query(Admin);
    	query.equalTo('admin', true);
    	query.notEqualTo('objectId', id);
    	query.find({
        success: function(adminResults){
          results.admins = adminResults;
          callback.success(results);
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
	//*/
};

exports.get = function(id, callback){
	var query = new Parse.Query(Admin);
  query.get(id, {
    success: function(result){
      callback.success(result);
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

exports.update = function(req, callback){
	var user = Parse.User.logIn(req.body.username, req.body.password, {
		success: function(user){
			var type = req.body._type;
			if (type == 'credentials') {
				user.set('username', req.body.newusername);
				user.set('password', req.body.newpassword);
			} else {
				user.set('firstName', req.body.firstName);
				user.set('lastName', req.body.lastName);
				user.set('email', req.body.email);
			}
				user.save(null, {
	        success: function(user){
	          callback.success(user);
	        },
	        error: function(user, error){
	          callback.error(user, error);
	        }
	      });
		},
		error: function(error){
			callback.error(null, error)
		}
	});
};

exports.updateInfo = function(req, callback){
	var user = Parse.User.logIn(req.body.email, req.body.password, {
		success: function(user){
			user.set('firstName', req.body.firstName);
			user.set('lastName', req.body.lastName);
			user.save(null, {
        success: function(user){
          callback.success(user);
        },
        error: function(user, error){
          callback.error(user, error);
        }
      });
		},
		error: function(error){}
	});
};

exports.destroy = function(req, callback){
	var id = req.params.id;
	var query = new Parse.Query(Admin);
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
