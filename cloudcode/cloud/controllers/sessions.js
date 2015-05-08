module.exports = function(app){
  
  app.get('/login', function(req, res){
    // render new login page here
    // check if already logged in??
    if (req.session.user)
      res.redirect('/jobs');
    else 
      res.render('sessions/new', {
        notice: (req.session.notice) ? req.session.notice : '' 
      });
  });

  app.post('/login', function(req, res){
    // create new session here
    // then redirect to jobs index
    Parse.User.logIn(req.body.username, req.body.password).then(function() {
      var curUser = Parse.User.current();
      req.session.notice = 'Login successful!';
      req.session.user = curUser;
      //req.session.userId = curUser.id;
      //req.session.username = curUser.get('username');
      res.redirect('/jobs');
      /*
      var curUser = Parse.User.current();
      user = Parse.User.current().get('username');
      if(curUser.get('admin')){
        jobErrors = {
          jobTitle: ''
        };
        res.redirect('/jobs', { username: curUser.get('username'), errors: jobErrors});
      }else{
        Parse.User.logOut();
        res.redirect('/login', { error: 'Sorry please login with admin accout' });
      }
      //*/
    },
    function(error) {
      // Login failed, redirect back to login form.
      req.session.notice = 'No corresponding user record found';
      req.session.user = null;
      //req.session.userId = null;
      //req.session.username = null;
      res.redirect('/login');
    });
  });

  app.get('/logout', function(req, res){
    // destroy session here
    Parse.User.logOut();
    req.session.notice = 'Logged out successfully.';
    req.session.user = null;
    //req.session.userId = null;
    //req.session.username = null;
    res.redirect('/login');
  });
};

/*
   // Clicking submit on the login form triggers this.
  exports.login = function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      var curUser = Parse.User.current();
      user = Parse.User.current().get('username');
      if(curUser.get('admin')){
        jobErrors = {
          jobTitle: ''
        };
        res.render('jobs/index', { username: curUser.get('username'), errors: jobErrors});
      }else{
      	Parse.User.logOut();
      	res.render('login', { error: 'Sorry please login with admin accout' });
      }
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', { error: 'No corresponding user record found' });
    });
  };

  // You could have a "Log Out" link on your website pointing to this.
  exports.logout = function(req, res) {
    Parse.User.logOut();
        res.render('login', { error: "" });
  };
//*/