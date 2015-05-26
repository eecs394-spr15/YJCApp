angular
  .module('home')
  .controller('IndexController', function($scope, $http, supersonic) {

    // Controller functionality here
  steroids.logger.log("Here in 0");
  $scope.globaluser = null;
  $scope.globaluser = $scope.globaluser || Parse.User.current();

  supersonic.bind($scope, "globaluser");
  $scope.$apply();

    $scope.newmessage = false;



  supersonic.ui.views.current.whenVisible( function () {
    
    supersonic.device.push.foregroundNotifications().onValue(function(notification) {
      $scope.newmessage = true;
      $scope.pushtitle = notification.payload.title;
      $scope.pushmessage = notification.message;
      $scope.pushid = notification.payload.id;
      $scope.$apply();

    });

    supersonic.device.push.backgroundNotifications().onValue(function(notification) {     
      $scope.newmessage = true;
      $scope.pushtitle = notification.payload.title;
      $scope.pushmessage = notification.message;
      $scope.pushid = notification.payload.id;
      $scope.$apply();

    });


   // delete this

  //Parse.User.logIn("test","test");
  supersonic.bind($scope, "globaluser");

  if($scope.globaluser == "undefined"){
    $scope.globaluser = null;
    $scope.$apply();
  }


     $scope.options = [
      'All Jobs',
      'Match Jobs',
      'Interested Jobs'
    ];


    postcodesResult = [];
    var postcodeResultMap = {};
    //user = Parse.User.current();
    user = $scope.globaluser;
    $scope.$apply();
    steroids.logger.log("getzip " + user);
    var userCountry = "US";
    var userMaxRows = 500;
    var userPostcode;
    var userRadius;
    appliedJobs = [];




    if (user !== null){
     userPostcode = user.get('zipcode');
     steroids.logger.log("getzip fucking " + userPostcode);

     userRadius = user.get('jobRadius');
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
    steroids.logger.log(callURL);
    $http.get(callURL).success(function(data, status, headers, config) {
      for (var item in data.postalCodes){
          postcodesResult.push(data.postalCodes[item].postalCode); 
          postcodeResultMap[data.postalCodes[item].postalCode] = data.postalCodes[item].distance;
      }

    }).
    error(function(data, status, headers, config) {
      steroids.logger.log(status);
    });

    if(user != null){
      var ClientInterest = Parse.Object.extend("ClientInterest");
      var appliedquery = new Parse.Query(ClientInterest);
      appliedquery.equalTo("userId", user.id);
      appliedquery.find({
        success: function(results) {
          
          for (var i = 0; i < results.length; i++) { 
            appliedJobs.push(results[i].get('jobId'));
          }
        },
        error: function(error) {
          if(error.code != 209){
            alert("Error: " + error.code + " " + error.message);
          }
        }
      });

      userInterests = user.get('interests');
      userEducations = user.get('education');
      var ageDifMs = Date.now() - user.get('dateOfBirth').getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      steroids.logger.log("interest is: " + userInterests[0]);
      steroids.logger.log("education: " + userEducations[0]);
      steroids.logger.log("age: " + userAge);
      steroids.logger.log("dateOfBirth: " + user.get('dateOfBirth'));

    }
      steroids.logger.log("2222");


    



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
        if(error.code != 209){
          alert("Error: " + error.code + " " + error.message);
        }
      }
    });
  });

  $scope.interested = function(filter){
    steroids.logger.log(filter);
    //var user = Parse.User.current();
    if(filter == 'Match Jobs'){
      if(user == null){
        alert("Please login");
        return;
      }

      steroids.logger.log("s");
      $scope.filterFunction = function(element){
        var result;
        steroids.logger.log("got here before zipcode!");

        var now = element.get("zipcode").toString();
        if(postcodesResult.indexOf(now) == -1){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }
        steroids.logger.log("got here before edu!");

        var eduRequirement = element.get("educationRequirement").toString();
        if(userEducations.indexOf(eduRequirement) == -1){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }
        steroids.logger.log("got here before employer!");

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
        steroids.logger.log("got here before minAge!" + userAge);

        var minAge = element.get("minAge");
        if(userAge < minAge){
          result = false;
        } else {
          result = true;
        }
        if(!result){
          return false;
        }
        steroids.logger.log("got here in match!");

        return true;
      
      };
    };
    if(filter == 'All Jobs' ){
      $scope.filterFunction = function(element){
        return true;
      };
    };

    if(filter == 'Interested Jobs'){
      if(user == null){
        alert("Please login");
        return;
      }
      $scope.filterFunction = function(element){
        if( appliedJobs.indexOf(element.id) == -1) return false;
        else return true;
      }


    }


    return;
  };


  $scope.clearpushmessage = function() {
    $scope.newmessage = false;
    $scope.$apply();
  };

  $scope.showInterest = function (job) {
    var labels = {
        buttonLabels: ["Yes", "No"]
    };
    alert("Interest recorded, please send email to advisor to setup interview");
          var user = Parse.Object.extend("User");
          var query = new Parse.Query(user);
          query.equalTo("objectId", Parse.User.current().id);
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
                        var recipient = Account.advisorEmail;
                        var subject = "Interest%20in%20" + job.get("jobTitle").replace(" ", "%20") + "%20position%20at%20" + job.get("company").replace(" ", "%20") + "%20in%20" + job.get("city").replace(" ", "%20");
                        var body = "Hi,%0A%0AI%20am%20interested%20in%20applying%20for%20the%20";
                        body += job.get("jobTitle").replace(" ", "%20") + "%20position%20at%20" + job.get("company").replace(" ", "%20") + "%20in%20" + job.get("city").replace(" ", "%20") + ".%20";
                        body += "Could%20you%20provide%20me%20with%20more%20information%20and%20how%20I%20might%20apply%20for%20this%20position?%0A%0A";
                        body += "Thanks,%0A%0A" + Account.firstName.replace(" ", "%20") + "%20" + Account.lastName.replace(" ", "%20");
                        supersonic.app.openURL("mailto:" + recipient + "?subject=" + subject + "&body=" + body).then(function() {
                        });
                        steroids.logger.log("in success of 3rd query first");

                      },
                      error: function(result) {
                      }
                    });
                  }
                  else{
                    steroids.logger.log("already applied");
                    supersonic.ui.dialog.alert("You have already applied for this job");
                  }
                },
                error: function(result) {
                  alert(result);
                }
              });
            },
            error: function(error) {
              alert(error);
            }
          });
    };

});
