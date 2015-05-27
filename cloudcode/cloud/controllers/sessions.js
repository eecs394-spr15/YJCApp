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
      req.session.notice = 'Logged in successfully!';
      req.session.user = curUser;
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
      res.redirect('/login');
    });
  });

  app.get('/logout', function(req, res){
    // destroy session here
    Parse.User.logOut();
    req.session.notice = 'Logged out successfully.';
    req.session.user = null;
    res.redirect('/login');
  });
};