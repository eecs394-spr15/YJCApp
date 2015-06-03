module.exports = function(app){

  // routes non-specific to controllers (e.g. root, static pages)
  app.get('/', function(req, res) {
    if (Parse.User.current()) {
      user = 'sysadmin';
      jobErrors = {
        jobTitle: ''
      };
      // No need to fetch the current user for querying Note objects.
      //res.render('jobs/index', { username: user, errors: jobErrors});
      res.redirect('/jobs');

    } else {
      // Redirect to login page
      req.session.notice = null;
      res.redirect('/login');
    }
  });

  // add routes for all controllers here
  require('cloud/controllers/sessions')(app);
  require('cloud/controllers/jobs')(app);
  require('cloud/controllers/advisors')(app);
  require('cloud/controllers/clients')(app);
  require('cloud/controllers/admins')(app);
};

/*
module.exports = function(app){

	// This is an example of hooking up a request handler with a specific request
	// path and HTTP verb using the Express routing API.
	app.get('/', function(req, res) {
    if (Parse.User.current()) {
      user = 'sysadmin';
      jobErrors = {
        jobTitle: ''
      };
      // No need to fetch the current user for querying Note objects.
        res.render('jobs/index', { username: user, errors: jobErrors});

    } else {
      // Render a public welcome page, with a link to the '/login' endpoint.
        res.render('login', { error: '' });
    }
  });

  //define actions
  //app.post('/createJob', app.job.create);
  //app.post('/login', app.profile.login);
  //app.get('/logout', app.profile.logout);

};
//*/