angular
  .module('home')
  .controller("ShowController", function ($scope, supersonic) {

    var _refreshViewData = function () {
      var Job = Parse.Object.extend("Job");
      var query = new Parse.Query(Job);
      query.equalTo("objectId", $scope.dataId);
      query.first({
        success: function(result) {
          $scope.job = result;
          $scope.$apply();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.showInterest = function (job) {
      var user = Parse.Object.extend("User");
      var query = new Parse.Query(user);
      query.equalTo("objectId", Parse.User.current().id);
      query.first({
        success: function(results) {
          $scope.Account = {};
          $scope.Account.skills = [];
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
          // array values
          $scope.Account.interests = $scope.currentUser.get("interests");
          $scope.Account.education = $scope.currentUser.get("education");
          $scope.Account.timeAvailable = $scope.currentUser.get("timeAvailable");
          $scope.Account.skills = $scope.currentUser.get("skills");
          $scope.$apply();
        },
        error: function(error) {
        }
      });
      var recipient = $scope.Account.advisorEmail;
      var subject = "Interest in " + job.get("jobTitle") + " position at " + job.get("company") + " in " + job.get("city");
      var body = "Hi,\nI am interested in applying for the ";
      body += job.get("jobTitle") + " position at " + job.get("company") + " in " + job.get("city") + ". ";
      body += "Could you provide me with more information and how I might apply for this position?\n\n";
      body += "Thanks,\n\n" + $scope.Account.firstName + " " + $scope.Account.lastName;
      supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
        supersonic.logger.log("SMS app successfully opened");
      });
    };
  });