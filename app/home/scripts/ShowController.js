angular
  .module('home')
  .controller("ShowController", function ($scope, supersonic) {

    $scope.globaluser = null;
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
          alert("Could not query for user: please restart the app");
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
          var Account = {};
          Account.skills = [];
          Account.education = [];
          Account.timeAvailable = [];
          currentUser = results;
          Account.firstName = currentUser.get('firstName');
          Account.lastName = currentUser.get('lastName');
          Account.phoneNumber = currentUser.get('phoneNumber');
          Account.zipcode = currentUser.get('zipcode');
          Account.email = currentUser.get('email');
          Account.dateOfBirth = currentUser.get('dateOfBirth');
          Account.dateOfBirthStr = Account.dateOfBirth.toLocaleDateString();
          Account.criminalHistory = currentUser.get('criminalHistory');
          Account.advisorEmail = currentUser.get('advisorEmail');
          // array values
          Account.interests = currentUser.get("interests");
          Account.education = currentUser.get("education");
          Account.timeAvailable = currentUser.get("timeAvailable");
          Account.skills = currentUser.get("skills");
          var ClientInterest = Parse.Object.extend("ClientInterest");
          var query = new Parse.Query(ClientInterest);
          query.equalTo("userId", currentUser.id);
          query.equalTo("jobId", job.id);
          query.first({
            success: function(result) {

              if (result === null || result === undefined)
              {
                var newinterest = new ClientInterest();
                newinterest.set("userId", currentUser.id);
                newinterest.set("jobId", job.id);
                newinterest.save(null, {
                  success: function(result) {
                    var recipient = encodeURIComponent(Account.advisorEmail);
                    var subject = "Interest%20in%20" + encodeURIComponent(job.get("jobTitle")) + "%20position%20at%20" + encodeURIComponent(job.get("company")) + "%20in%20" + encodeURIComponent(job.get("city"));
                    var body = "Hi,%0A%0AI%20am%20interested%20in%20applying%20for%20the%20";
                    body += encodeURIComponent(job.get("jobTitle")) + "%20position%20at%20" + encodeURIComponent(job.get("company")) + "%20in%20" + encodeURIComponent(job.get("city")) + ".%20";
                    body += "Could%20you%20provide%20me%20with%20more%20information%20and%20how%20I%20might%20apply%20for%20this%20position?%0A%0A";
                    body += "Thanks,%0A%0A" + encodeURIComponent(Account.firstName) + "%20" + encodeURIComponent(Account.lastName);
                    steroids.logger.log(body);
                    steroids.logger.log(subject);
                    supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
                    });
                  },
                  error: function(result) {
                    supersonic.ui.dialog.alert(result.message);
                  }
                });
              }
              else{
                steroids.logger.log("already applied");
                var recipient = encodeURIComponent(Account.advisorEmail);
                var subject = "Interest%20in%20" + encodeURIComponent(job.get("jobTitle")) + "%20position%20at%20" + encodeURIComponent(job.get("company")) + "%20in%20" + encodeURIComponent(job.get("city"));
                var body = "Hi,%0A%0AI%20am%20interested%20in%20applying%20for%20the%20";
                body += encodeURIComponent(job.get("jobTitle")) + "%20position%20at%20" + encodeURIComponent(job.get("company")) + "%20in%20" + encodeURIComponent(job.get("city")) + ".%20";
                body += "Could%20you%20provide%20me%20with%20more%20information%20and%20how%20I%20might%20apply%20for%20this%20position?%0A%0A";
                body += "Thanks,%0A%0A" + encodeURIComponent(Account.firstName) + "%20" + encodeURIComponent(Account.lastName);
                steroids.logger.log(body);
                steroids.logger.log(subject);
                supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
                });
              }
            },
            error: function(result) {
              alert("Could not send query job id");
            }
          });
        },
        error: function(error) {
          alert("Could not query for user: please restart the app");
        }
      });

    };
  });