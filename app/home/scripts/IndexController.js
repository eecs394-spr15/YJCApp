angular
  .module('home')
  .controller('IndexController', function($http, $scope, supersonic) {
    // Controller functionality here
    supersonic.ui.navigationBar.hide();




    //find jobs that match

  //   if(currUser){
  //    var interests = currUser.get("Interests");
  //    var zipcode = currUser.get("zipcode");
  //    var skills = currUser.get("skills");
  //    var degree = currUser.get("degree");

  //    //start query


  //    var Job = Parse.Object.extend("Job");
    // var query = new Parse.Query(Job);

    // query.equalTo("zipcode", zipcode);
    

  //   }

  supersonic.ui.views.current.whenVisible( function () {
    var postcodesResult = [];
    var postcodeResultMap = {};
    var user = Parse.User.current();
    var userCountry = "US";
    var userPostcode
    var userRadius
    if (user != null){
     userPostcode = user.get('zipcode');
     userRadius = user.get('jobRadius');
    }else{
     userPostcode = "60201";
     userRadius = 30;
    }
    if (userRadius == null){
         userRadius = 30;
    }
    var userNameForGeoQuery = "YJCApp";
    var callURL = "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=" + userPostcode + "&country=" + userCountry + "&radius=" + userRadius + "&username=" + userNameForGeoQuery;
    $http.get(callURL).success(function(data, status, headers, config) {
      for (var item in data.postalCodes){
          postcodesResult.push(data.postalCodes[item].postalCode); 
          postcodeResultMap[data.postalCodes[item].postalCode] = data.postalCodes[item].distance;
          steroids.logger.log(postcodeResultMap[data.postalCodes[item].postalCode]);

      }

    }).
    error(function(data, status, headers, config) {
      alert("Error: " + status + " ");
      steroids.logger.log(status);
    });

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
