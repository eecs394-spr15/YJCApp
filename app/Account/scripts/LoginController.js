angular
  .module('Account')
  .controller("LoginPageController", function ($scope, supersonic) {
  $scope.Account = {};
  $scope.currentUser = Parse.User.current();
  $scope.signedUp = false;
  $scope.loggedIn = false;


  $scope.signUp = function(){

    var user = new Parse.User();
    user.set("username", $scope.newUser.username);
    user.set("password", $scope.newUser.password);
    user.set("email", $scope.newUser.email);



    user.signUp(null, {
      success: function(user){
        $scope.currentUser = user;
        supersonic.ui.dialog.alert("You have successfully signed up!");

      },
      error: function(user, error){
        alert("You have not succesfully signed up");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }
    });

    $scope.signedUp = true;
    $scope.loggedIn = true;
  };



  $scope.logIn = function() {

    Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {
      success: function(user){
        alert("You have successfully logged in!");
      },
      error: function(user, error) {
        alert("You have not successfully logged in!");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }
    });
    $scope.loggedIn = true;
  };

  $scope.logOut = function() {
    Parse.User.logOut();
    $scope.currentUser = null;
    $scope.loggedIn = false;
  };
});