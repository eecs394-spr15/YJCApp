angular
  .module('Account')
  .controller("LoginPageController", function ($scope, supersonic) {
  // login page controller
    $scope.globaluser = null;
    supersonic.bind($scope, "globaluser");  // create global parse user object
    $scope.$apply();
    $scope.Account = {};
    $scope.signedUp = false;
    $scope.loggedIn = false;

    supersonic.ui.views.current.whenVisible( function () {
      supersonic.bind($scope, "globaluser");  // send globaluser to different views
      if($scope.globaluser == "undefined"){ // user was logged out
        $scope.currentUser = null;
      }
      else
        $scope.currentUser = Parse.User.current();  // user is still logged in
      $scope.$apply();

    });

    supersonic.ui.views.current.whenHidden( function () {
      // same as when hidden 
      supersonic.bind($scope, "globaluser");
      if($scope.globaluser == "undefined"){
        $scope.currentUser = null;
      }
      else
        $scope.currentUser = Parse.User.current();
      $scope.$apply();
      //location.reload();
    });

    document.addEventListener("visibilitychange", onVisibilityChange, false);

    function onVisibilityChange() {
      // set current user to stored user in session
      // known bug Parse.User.current() does not clear when logged out, only on app restart
      $scope.currentUser = Parse.User.current();
    }

    $scope.signUp = function(){
    // sign up a new user

      // check for errors (if not valid email address user will get an alert)
      var numErrors = 0;

      $('#signup-username-lbl').removeClass('error-input');
      $('#signup-password-lbl').removeClass('error-input');

      if ($('#signup-username').val() === '' || $('#signup-username').val() === undefined || $('#signup-username').val() === null)
      {
        numErrors++;
        $('#signup-username-lbl').addClass('error-input');
      }
      if ($('#signup-password').val() === '' || $('#signup-password').val() === undefined || $('#signup-password').val() === null)
      {
        numErrors++;
        $('#signup-password-lbl').addClass('error-input');
      }

      if (numErrors === 0)
      { // no errors 
        var pushNotification;
        var view = new supersonic.ui.View("Account#index");
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" )
        {
        // if device is android, record the unique registration id neded to send push notifications
          var user = new Parse.User();
          user.set("username", $scope.newUser.username);
          user.set("password", $scope.newUser.password);
          user.set("email", $scope.newUser.username);
          user.set("enableSMS", true);
          user.set("admin", false);
          user.set("firstName", "");
          user.set("lastName", '');
          user.set("interests", []);
          user.set("timeAvailable", []);
          user.set("education", []);
          user.set("phoneNumber", '');
          user.set("zipcode", '');
          user.set("dateOfBirth", new Date());
          user.set("criminalHistory", false);
          user.set("advisorFirstName", '');
          user.set("advisorLastName", '');
          user.set("advisorEmail", '');
          user.set("jobRadius", 20);
          user.set("registrationId", []);

          user.signUp(null, { // sign up the user
            success: function(user){
              $scope.currentUser = user;
              $scope.globaluser = user;
              $scope.$apply();
              supersonic.ui.dialog.alert("You have successfully signed up!");
              pushNotification.register(
                registrationHandler,
                errorHandler, {
                    //android options
                    "senderID":"146165770764",
                    });
            },
            error: function(user, error) {
              // handles cases where username already taken or when the email address is invalid
              supersonic.ui.dialog.alert("You have not succesfully signed up. " + error.message);
            }
          });

          $scope.signedUp = true;
          $scope.loggedIn = true;

        }
        else
        { // ios device, same but do not save registration id
          var user = new Parse.User();
          user.set("username", $scope.newUser.username);
          user.set("password", $scope.newUser.password);
          user.set("email", $scope.newUser.username);
          user.set("enableSMS", true);
          user.set("admin", false);
          user.set("registrationId", []);
          user.set("firstName", "");
          user.set("lastName", '');
          user.set("interests", []);
          user.set("timeAvailable", []);
          user.set("education", []);
          user.set("phoneNumber", '');
          user.set("zipcode", '');
          user.set("dateOfBirth", new Date());
          user.set("criminalHistory", false);
          user.set("advisorFirstName", '');
          user.set("advisorLastName", '');
          user.set("advisorEmail", '');
          user.set("jobRadius", 20);
          user.signUp(null, {
            success: function(user) {
            $scope.currentUser = user;
            $scope.globaluser = user;
            $scope.$apply();
            supersonic.ui.dialog.alert("You have successfully signed up!");
            supersonic.ui.layers.push(view);
            },
            error: function(user, error) {
              // handles cases where username already taken or when the email address is invalid
              supersonic.ui.dialog.alert("You have not succesfully signed up. " + error.message);
            }
          });

          $scope.signedUp = true;
          $scope.loggedIn = true;
        }

        // the result contains any error description text returned from the plugin call
        function errorHandler (error) {
          supersonic.ui.dialog.alert('error with registration id = ' + error.message);
        }

        function registrationHandler (deviceToken) {
          // save registration id 
          user.addUnique("registrationId", deviceToken);
          user.save();
          supersonic.ui.layers.push(view);
        }
      }
    };



    $scope.logIn = function() {
    // login existing user

      // check for form errors 
      var numErrors = 0;
      $('#login-username-lbl').removeClass('error-input');
      $('#login-password-lbl').removeClass('error-input');

       if ($('#login-username').val() === '' || $('#login-username').val() === undefined || $('#login-username').val() === null)
      {      
         numErrors++;
         $('#login-username-lbl').addClass('error-input');
       }
      if ($('#login-password').val() === '' || $('#login-password').val() === undefined || $('#login-password').val() === null)
      {
        numErrors++;
        $('#login-password-lbl').addClass('error-input');
      }
      if (numErrors === 0)
      {
      // attempt login 
        var view = new supersonic.ui.View("Account#profile"); // page to direct user to upon successful login
        Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {  // attempt login
          success: function(user){
            var pushNotification;
            $scope.globaluser = user;
            $scope.$apply();

            pushNotification = window.plugins.pushNotification;
            if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ) {
            // check if android
              pushNotification.register(
                  registrationHandler,
                  errorHandler, {
                    //android options
                    "senderID":"146165770764",
                    });
              supersonic.ui.layers.push(view);
            }
            else
            {
              user.save();
              supersonic.ui.layers.push(view);
            }

            // the result contains any error description text returned from the plugin call
            function errorHandler (error) {
              supersonic.ui.dialog.alert('error with registration id = ' + error.message);
            }

            function registrationHandler (deviceToken) {
            // save new registration id if user is logging in from a new phone (registration id is unique to each phone + application)
              user.addUnique("registrationId", deviceToken);
              user.save();   
            }
          },
          error: function(user, error) {
          // error occurred with login such as using an incorrect password or username
            supersonic.ui.dialog.alert("Failed to login! " + error.message);
          }
        });
        $scope.loggedIn = true;    
      }
    };

    $scope.logOut = function() {
    // logout a user
      Parse.User.logOut();
      $scope.currentUser = null;
      $scope.loggedIn = false;
      $scope.globaluser = "undefined"; //supersonic.bind will not send out a null 
      $scope.$apply();
      steroids.logger.log("logout: " + $scope.globaluser);
    };
});