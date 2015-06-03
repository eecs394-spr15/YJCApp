var Admin = require('cloud/models/user');

module.exports = function(app){

	app.get('/settings', function(req, res){
    // redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // send all admin info if user is superadmin
    if (!req.session.user['superadmin'])
    	res.render('admins/show', { 
        notice: req.session.notice ? req.session.notice : '',
        user: req.session.user,
        admins: null
      });
    else {
    	Admin.all({
    	  success: function (results, admins) {
    	    res.render('admins/index', { 
    	      notice: req.session.notice ? req.session.notice : '',
    	      user: req.session.user,
    	      admins: admins
    	    });
    	  },
    	  error: function (error) {
    	    res.send('Error: ' + error.code + ' ' + error.message);
    	  }
    	});
    }
  });

  app.post('/settings', function(req, res){
  	// change account password, etc
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