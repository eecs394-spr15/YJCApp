   // Clicking submit on the login form triggers this.
  exports.login = function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      var curUser = Parse.User.current();
      user = Parse.User.current().get("username");
      if(curUser.get('admin')){
        jobErrors = {
          jobTitle: ''
        };
        res.render('index', { username: curUser.get("username"), errors: jobErrors});
      }else{
      	Parse.User.logOut();
      	res.render('login', { error: 'Sorry please login with admin accout' });
      }
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', { error: 'No correspond user record found' });
    });
  };

  // You could have a "Log Out" link on your website pointing to this.
  exports.logout = function(req, res) {
    Parse.User.logOut();
        res.render('login', { error: "" });
  };
