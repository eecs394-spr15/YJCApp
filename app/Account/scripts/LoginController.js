angular
  .module('Account')
  .controller("LoginPageController", function ($scope, supersonic) {
  $scope.globaluser = null;
  supersonic.bind($scope, "globaluser");
  $scope.$apply();
  $scope.Account = {};
  $scope.signedUp = false;
  $scope.loggedIn = false;
  //username = Parse.User.current();
  //Parse.User.logIn("test", "test");

  supersonic.ui.views.current.whenVisible( function () {
    $scope.currentUser = Parse.User.current();
    supersonic.bind($scope, "globaluser");

  });

  supersonic.ui.views.current.whenHidden( function () {
    $scope.currentUser = Parse.User.current();
    location.reload();
  });

  document.addEventListener("visibilitychange", onVisibilityChange, false);

  function onVisibilityChange() {
    $scope.currentUser = Parse.User.current();
  }

  $scope.signUp = function(){

    var numErrors = 0;

    $('#signup-username-lbl').removeClass('error-input');
    $('#signup-password-lbl').removeClass('error-input');
    $('#signup-email-lbl').removeClass('error-input');

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
    if ($('#signup-email').val() === '' || $('#signup-email').val() === undefined || $('#signup-email').val() === null)
    {
      numErrors++;
      $('#signup-email-lbl').addClass('error-input');
    }

    if (numErrors === 0)
    {

      var pushNotification;

      pushNotification = window.plugins.pushNotification;
      if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" )
      {
        pushNotification.register(
          registrationHandler,
          errorHandler, {
              //android options
              "senderID":"146165770764",
              });
        }else{
            var user = new Parse.User();
            user.set("username", $scope.newUser.username);
            user.set("password", $scope.newUser.password);
            user.set("email", $scope.newUser.email);
            user.set("enableSMS", true);
            user.set("admin", false);
            var view = new supersonic.ui.View("Account#index");
            user.signUp(null, {
              success: function(user){
              $scope.currentUser = user;
              $scope.globaluser = user;
              $scope.$apply();
              //username = $('#signup-username').val();
              //username = user;
              supersonic.ui.dialog.alert("You have successfully signed up!");
              supersonic.ui.layers.push(view);
            },
            error: function(user, error){
              supersonic.ui.dialog.alert("You have not succesfully signed up. " + error.message);
            }
          });

        // save push notification device id
        user.save();
        $scope.signedUp = true;
        $scope.loggedIn = true;
      }

      // the result contains any error description text returned from the plugin call
      function errorHandler (error) {
          //supersonic.ui.dialog.alert('error = ' + error);
      }

      function registrationHandler (deviceToken) {
          var user = new Parse.User();
          user.set("username", $scope.newUser.username);
          user.set("password", $scope.newUser.password);
          user.set("email", $scope.newUser.email);

          var view = new supersonic.ui.View("Account#index");


          user.signUp(null, {
            success: function(user){
              $scope.currentUser = user;
              //username = $('#signup-username').val();
              //username = user;
              $scope.globaluser = user;
              $scope.$apply();
              supersonic.ui.dialog.alert("You have successfully signed up!");
              supersonic.ui.layers.push(view);
            },
            error: function(user, error){
              supersonic.ui.dialog.alert("You have not succesfully signed up. " + error.message);
            }
          });

          // save push notification device id
          user.addUnique("registrationId", deviceToken);
          user.save();

          $scope.signedUp = true;
          $scope.loggedIn = true;
      }
    }
  };



  $scope.logIn = function() {
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
      var view = new supersonic.ui.View("Account#profile");
      Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {
        success: function(user){
          var pushNotification;
          $scope.globaluser = user;
          $scope.$apply();

          pushNotification = window.plugins.pushNotification;
          if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
            pushNotification.register(
                registrationHandler,
                errorHandler, {
                  //android options
                  "senderID":"146165770764",
                  });
          }else{
            user.save();
            supersonic.ui.layers.push(view);
          }

          // the result contains any error description text returned from the plugin call
          function errorHandler (error) {
              //supersonic.ui.dialog.alert('error = ' + error);

          }

          function registrationHandler (deviceToken) {

            user.addUnique("registrationId", deviceToken);
            user.save();   
            supersonic.ui.layers.push(view);

          }
        },
        error: function(user, error) {
          supersonic.ui.dialog.alert("Failed to login! " + error.message);
        }
      });
      $scope.loggedIn = true;    
    }
  };

  $scope.logOut = function() {
      Parse.User.logOut();
      $scope.currentUser = null;
      $scope.loggedIn = false;
      $scope.globaluser = "undefined";
      $scope.$apply();
      steroids.logger.log("logout: " + $scope.globaluser);
      //supersonic.ui.tabs.select(0);
  };


  //  document.addEventListener("visibilitychange", onVisibilityChange, false);

  // function onVisibilityChange() {
  //     location.reload();
  // }

});