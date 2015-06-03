var Admin = require('cloud/models/admin');

module.exports = function(app){

	app.get('/settings', function(req, res){
    // redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // send all admin info if user is superadmin
    if (!req.session.user['superadmin']) {
    	res.render('admins/show', { 
		    notice: req.session.notice ? req.session.notice : '',
		    user: req.session.user,
		    admins: null
		  });
    	/*
  		Admin.get(req.session.user.id, {
  			success: function(result){
					res.render('admins/show', { 
				    notice: req.session.notice ? req.session.notice : '',
				    user: result,
				    admins: null
				  });
  			},
  			error: function(error){
  				res.send('Error: ' + error.code + ' ' + error.message);
  			}
  		});
			//*/
  	} else {
  		Admin.all({
    	  success: function(results) {
    	    res.render('admins/show', { 
    	      notice: req.session.notice ? req.session.notice : '',
    	      user: req.session.user,
    	      admins: results
    	    });
    	  },
    	  error: function(error) {
    	    res.send('Error: ' + error.code + ' ' + error.message);
    	  }
    	});
  		/*
    	Admin.all({
    	  success: function(results) {
    	    res.render('admins/show', { 
    	      notice: req.session.notice ? req.session.notice : '',
    	      user: results.user,
    	      admins: results.admins
    	    });
    	  },
    	  error: function(error) {
    	    res.send('Error: ' + error.code + ' ' + error.message);
    	  }
    	});
			//*/
    }
  });

	app.get('/settings/edit', function(req, res){
  	// redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // redirect to home if not admin
    if (!req.session.user['admin'])
      return res.redirect('/');

    res.render('admins/edit', {
      user: req.session.user
    });
  });

  app.post('/settings', function(req, res){
  	// redirect to home if not admin
  	if (!req.session.user['admin'])
      return res.redirect('/');

    Admin.update(req, {
      success: function(admin){
      	req.session.user = Parse.User.current();
        res.redirect('/settings');
      },
      error: function(admin, error){
        res.send('Error: ' + error.code + ' ' + error.message);
      }
    });

    /*
    var type = req.body._type;
    if (type == 'credentials') {
	    Admin.updateCredentials(req, {
	      success: function(admin){
	      	req.session.user = Parse.User.current();
	        res.redirect('/settings');
	      },
	      error: function(admin, error){
	        res.send('Error: ' + error.code + ' ' + error.message);
	      }
	    });
	  }
	  else if (type == 'info') {
	  	Admin.updateInfo(req, {
	      success: function(admin){
	        res.redirect('/settings');
	      },
	      error: function(admin, error){
	        res.send('Error: ' + error.code + ' ' + error.message);
	      }
	    });
	  }
	  //*/
  });

  app.get('/admins/new', function(req, res){
  	// redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // redirect to home if not superadmin
    if (!req.session.user['superadmin'])
      return res.redirect('/');

    res.render('admins/new', {
      user: req.session.user
    });
  });

  app.post('/admins', function(req, res){
    // redirect to home if not superadmin
    if (!req.session.user['superadmin'])
      return res.redirect('/');

    // create new admin then redirect accordingly
    Admin.create(req, {
      success: function(admin) {
        res.redirect('/settings');
      },
      error: function(admin, error) {
        res.send('Error saving job!' + error.message);
      }
    });
  });

  app.post('/admin/:id', function(req, res){
    // redirect to home if not superadmin
    if (!req.session.user['superadmin'])
      return res.redirect('/');

    // call delete function in model
    Admin.destroy(req, {
      success: function(admin){
        res.redirect('/settings');
      },
      error: function(admin, error){
        res.send('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

};