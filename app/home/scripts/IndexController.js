angular
  .module('home')
  .controller('IndexController', function($scope, $http, supersonic) {

  // Controller functionality here
  //steroids.logger.log("Here in 0");
  $scope.globaluser = null;

  if ($scope.globaluser == "undefined")
    $scope.globaluser = null;
  else
    $scope.globaluser = $scope.globaluser || Parse.User.current();
  user = null;
  supersonic.bind($scope, "globaluser");
  $scope.$apply();
  $scope.searchText = "";

  $scope.newmessage = false;

  $scope.iconstatus = false;
   $scope.options = [
    'All Jobs',
    'Matched Jobs',
    'Interested Jobs'
  ];



  $scope.updatejobsanduser = function() {
    supersonic.device.push.foregroundNotifications().onValue(function(notification) {
      $scope.newmessage = true;
      $scope.pushtitle = notification.payload.title;
      $scope.pushmessage = notification.message;
      $scope.pushid = notification.payload.id;
      $scope.$apply();
      $scope.updatejobsanduser();

    });

    supersonic.device.push.backgroundNotifications().onValue(function(notification) {
      supersonic.ui.tabs.select(0);     
      $scope.newmessage = true;
      $scope.pushtitle = notification.payload.title;
      $scope.pushmessage = notification.message;
      $scope.pushid = notification.payload.id;
      $scope.$apply();
    });


    if(user != null){
      if (user.id == null || user.id == undefined)
        id = user.objectId;
      else
        id = user.id;
      var ClientInterest = Parse.Object.extend("ClientInterest");
      var appliedquery = new Parse.Query(ClientInterest);
      appliedquery.equalTo("userId", id);
      appliedquery.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            appliedJobs.push(results[i].get('jobId'));
          }
        },
        error: function(error) {
          if(error.code != 209){
            alert("Error appliedquery: " + error.code + " " + error.message);
          }
        }
      });

      try {
        userInterests = user.get('interests');
        userEducations = user.get('education');
        userDob = user.get('dateOfBirth');
      }
      catch(e) {
        userInterests = user.interests;
        userEducations = user.education;
        userDob = new Date(user.dateOfBirth);
      }
      var ageDifMs = Date.now() - userDob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      //steroids.logger.log("interest is: " + userInterests[0]);
      //steroids.logger.log("education: " + userEducations[0]);
      //steroids.logger.log("age: " + userAge);
      //steroids.logger.log("dateOfBirth: " + user.get('dateOfBirth'));

    }
      //steroids.logger.log("2222");


    



    var Job = Parse.Object.extend("Job");
    var query = new Parse.Query(Job);
    var twoMonthsAgo = new Date();   // only get jobs from 2 month time period
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    query.greaterThanOrEqualTo("updatedAt", twoMonthsAgo);
    query.descending("updatedAt");
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        
        $scope.jobs = results;
        $scope.$apply();
      },
      error: function(error) {
        if(error.code != 209){
          alert("Error query find jobs: " + error.code + " " + error.message);
        }
      }
    });
  };


  supersonic.ui.views.current.whenVisible( function () {
    supersonic.bind($scope, "globaluser");

    if($scope.globaluser == "undefined"){
      $scope.globaluser = null;
      user = $scope.globaluser;
      $scope.$apply();
    }

      postcodesResult = [];
      var postcodeResultMap = {};
      user = $scope.globaluser;
      $scope.$apply();
      steroids.logger.log(user);
      var userCountry = "US";
      var userMaxRows = 500;
      var userPostcode;
      var userRadius;
      appliedJobs = [];

      if (user !== null){

        try {
          userPostcode = user.get('zipcode');
          userRadius = user.get('jobRadius');
        }
        catch (e) {
          userPostcode = user.zipcode;
          userRadius = user.jobRadius;
        }

       userRadius = userRadius*1.666;
       if(userRadius > 30){
          userRadius = 30;
       }
      }else{
       userPostcode = "60201";
       userRadius = 30;
      }
      if (userRadius === null){
           userRadius = 30;
      }
      var userNameForGeoQuery = "YJCApp";
      var callURL = "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=" + userPostcode + "&country=" + userCountry + "&radius=" + userRadius + "&username=" + userNameForGeoQuery + "&maxRows=" + userMaxRows;
      //steroids.logger.log(callURL);
      $http.get(callURL).success(function(data, status, headers, config) {
        for (var item in data.postalCodes){
            postcodesResult.push(data.postalCodes[item].postalCode); 
            postcodeResultMap[data.postalCodes[item].postalCode] = data.postalCodes[item].distance;
        }

      }).
      error(function(data, status, headers, config) {
        //steroids.logger.log(status);
      });

    $scope.updatejobsanduser();
    if ($('#select-filter').val() == "Matched Jobs" || $('#select-filter option:selected').text() == "Matched Jobs")
    {
      $scope.interested("Matched Jobs");
    }
    if ($('#select-filter').val() == "All Jobs" || $('#select-filter option:selected').text() == "All Jobs")
    {
      $scope.interested("All Jobs");
    }
    if ($('#select-filter').val() == "Interested Jobs" || $('#select-filter option:selected').text() == "Interested Jobs")
    {
      $scope.interested("Interested Jobs");
    }
  });


  $scope.interested = function(filter){
    $scope.updatejobsanduser();


    steroids.logger.log(filter);
    if(filter == 'Matched Jobs'){
      if(user === null){
        //alert("Please login");
        return;
      }

      //steroids.logger.log("s");
      $scope.filterFunction = function(element){
        var result;
        //steroids.logger.log("got here before zipcode!");

        var now = element.get("zipcode").toString();
        if(postcodesResult.indexOf(now) == -1){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }

        var eduRequirement = element.get("educationRequirement").toString();
        if(userEducations.indexOf(eduRequirement) == -1){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }

        var industrialType = element.get("EmployerIndustryTypes").toString();
        if(userInterests.indexOf("All") != -1){
          result = true;
        } else if(userInterests.indexOf(industrialType) == -1){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }
        //steroids.logger.log("got here before minAge!" + userAge);

        var minAge = element.get("minAge");
        if(userAge < minAge){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }
        //steroids.logger.log("got here in match!");

        return true;
      
      };
    }
    if(filter == 'All Jobs' ){
      $scope.filterFunction = function(element){
        return true;
      };
    }

    if(filter == 'Interested Jobs'){
      if(user == null){
        //alert("Please login");
        return;
      }
      $scope.filterFunction = function(element){
        if( appliedJobs.indexOf(element.id) == -1) return false;
        else return true;
      };
    }
    return;
  };



  $scope.clearpushmessage = function() {
    $scope.newmessage = false;
    $scope.$apply();
  };

  $scope.gotoLogin = function() {
    supersonic.ui.tabs.select(1);
  };

  $scope.showInterest = function (job) {
    var labels = {
        buttonLabels: ["Yes", "No"]
    };
    steroids.logger.log($scope.globaluser);

    if ($scope.globaluser.id === null || $scope.globaluser.id === undefined)
      id = $scope.globaluser.objectId;
    else
      id = $scope.globaluser.id;
    steroids.logger.log("id for email " + id);
          var user = Parse.Object.extend("User");
          var query = new Parse.Query(user);
          query.equalTo("objectId", id);
          query.first({
            success: function(results) {
              steroids.logger.log("in success of query first");
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
                  steroids.logger.log("in success of 2nd query first");

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
                        supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
                        });
                        steroids.logger.log("in success of 3rd query first");

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

})
.directive("scroll", function ($window, $document,$timeout) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                var height = $document[0].body.offsetHeight - this.innerHeight;
                if(this.pageYOffset <= 0){
                    scope.iconstatus = true;
                    $timeout(function(){
                        scope.iconstatus = false;
                        $window.scrollBy(0,1);
                    },2500);
                    scope.updatejobsanduser();
                    steroids.logger.log("in scroll");
                }
            });
        };
    });
