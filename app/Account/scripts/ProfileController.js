angular
  .module('Account')
  .controller("ProfileController", function ($scope, supersonic) {


    supersonic.ui.views.current.whenVisible( function () {
      var user = Parse.Object.extend("User");
      var query = new Parse.Query(user);
      query.equalTo("objectId", Parse.User.current().id);
      query.first({
        success: function(results) {
          $scope.Account = {};
          $scope.interests = [];
          $scope.Account.education = [];
          $scope.Account.timeAvailable = [];
          $scope.currentUser = results;
          $scope.Account.firstName = $scope.currentUser.get('firstName');
          $scope.Account.lastName = $scope.currentUser.get('lastName');
          $scope.Account.phoneNumber = $scope.currentUser.get('phoneNumber');
          $scope.Account.zipcode = $scope.currentUser.get('zipcode');
          $scope.Account.email = $scope.currentUser.get('email');
          $scope.Account.dateOfBirth = $scope.currentUser.get('dateOfBirth');
          $scope.Account.dateOfBirthStr = $scope.Account.dateOfBirth.toLocaleDateString();
          $scope.Account.criminalHistory = $scope.currentUser.get('criminalHistory');
          $scope.Account.advisorEmail = $scope.currentUser.get('advisorEmail');
          $scope.Account.advisorFirstName = $scope.currentUser.get('advisorFirstName');
          $scope.Account.advisorLastName = $scope.currentUser.get('advisorLastName');
          $scope.Account.jobRadius = $scope.currentUser.get('jobRadius') + " Miles";
          // array values
          $scope.Account.interests = $scope.currentUser.get("interests");
          $scope.Account.education = $scope.currentUser.get("education");
          $scope.Account.timeAvailable = $scope.currentUser.get("timeAvailable");
          $scope.$apply();
        },
        error: function(error) {
        }
      });
    });
  });