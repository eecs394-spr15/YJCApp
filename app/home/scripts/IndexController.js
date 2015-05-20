angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here

  supersonic.ui.views.current.whenVisible( function () {
    var Job = Parse.Object.extend("Job");
    var query = new Parse.Query(Job);
    
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        
        $scope.jobs = results;
        $scope.$apply();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
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

        var ClientInterest = Parse.Object.extend("ClientInterest");
        var query = new Parse.Query(ClientInterest);
        query.equalTo("userId", $scope.currentUser.id);
        query.equalTo("jobId", job.id);
        query.first({
          success: function(result) {
            if (result === null || result === undefined)
            {
              supersonic.ui.dialog.alert("Interest saved, click OK to email your advisor about interview.").then(function () {
                var newinterest = new ClientInterest();
                newinterest.set("userId", $scope.currentUser.id);
                newinterest.set("jobId", job.id);
                newinterest.save(null, {
                  success: function(result) {
                    var recipient = $scope.Account.advisorEmail;
                    var subject = "Interest in " + job.get("jobTitle") + " position at " + job.get("company") + " in " + job.get("city");
                    var body = "Hi,\nI am interested in applying for the ";
                    body += job.get("jobTitle") + " position at " + job.get("company") + " in " + job.get("city") + ". ";
                    body += "Could you provide me with more information and how I might apply for this position?\n\n";
                    body += "Thanks,\n\n" + $scope.Account.firstName + " " + $scope.Account.lastName;
                    supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
                    });

                  },
                  error: function(result) {
                  }
                });
              });
            }
            else
              supersonic.ui.dialog.alert("You have already applied for this job");
          },
          error: function(result) {
          }
        });
      },
      error: function(error) {
      }
    });
  };
    

});
