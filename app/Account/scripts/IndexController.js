angular
  .module('Account')
  .controller("IndexController", function ($scope, supersonic) {    


    supersonic.ui.views.current.whenVisible( function () {
      $scope.Account = {};
      $scope.skills = [];
      $scope.skills2 = [];
      $scope.interests = [];
      $scope.interests2 = [];
      $scope.education = [];
      $scope.currentUser = Parse.User.current();
      $scope.addedInterest = true;
      $scope.addedSkill = true;
      $scope.Account.firstName = $scope.currentUser.get('firstName');
      $scope.Account.lastName = $scope.currentUser.get('lastName');
      $scope.Account.phoneNumber = $scope.currentUser.get('phoneNumber');
      $scope.Account.zipcode = $scope.currentUser.get('zipcode');
      $scope.Account.dateOfBirth = $scope.currentUser.get('dateOfBirth');
      $scope.$apply();
    });
  	

    // Controller functionality here

    
    $scope.addNewAccount = function () {   
    	$scope.currentUser.set("firstName", $scope.Account.firstName);
    	$scope.currentUser.set("lastName", $scope.Account.lastName);
    	$scope.currentUser.set("phoneNumber", $scope.Account.phoneNumber);
    	$scope.currentUser.set("dateOfBirth", $scope.Account.dateOfBirth);
    	$scope.currentUser.set("zipcode", $scope.Account.zipcode);

    	$scope.currentUser.save(null, {
          	success: function(user) {
            	alert("You have updated your profile successfully!");
              //$scope.currentUser = user;
            },
            error: function(user, error) {
              alert("You have not updated your profile successfully");
              supersonic.ui.dialog.alert("Error: " + error.message);
            }
    	}); 
      supersonic.ui.layers.pop();
      

	};	

  $scope.addInterest = function(id) {
    var interest = document.getElementById(id);
    $scope.interests2.push(interest.id);
 
    $scope.currentUser.set("interests", $scope.interests2);
    $scope.currentUser.save(null, {
      success: function(user) {
        alert("added interest to interests array for current user");
      },
      error: function(user, error) {
        alert("didn't added interest");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }

    });
  };

  $scope.addSkill = function(id) {
    var skill = document.getElementById(id);
    $scope.skills2.push(skill.id);
    $scope.currentUser.set("skills", $scope.skills2);
    $scope.currentUser.save(null, {
      success: function(user) {
        alert("added skill to skills array for current user");
      },
      error: function(user, error) {
        alert("didn't added skill");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }

    });
  };

  $scope.addEducation = function(id) {
    var ed = document.getElementById(id);
    $scope.education.push(ed.id);
 
    $scope.currentUser.set("education", $scope.education);
    $scope.currentUser.save(null, {
      success: function(user) {
        alert("added education to education array for current user");
      },
      error: function(user, error) {
        alert("didn't added education");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }

    });
  };

  	$scope.showInterestInput = function() {
  		var interest = document.getElementById("interest");
  		$scope.interests.push(interest.value);
      $scope.addedInterest = false;
      $scope.interests2.push(interest.value); 
      $scope.currentUser.set("interests", $scope.interests2);
      $scope.currentUser.save(null, {
        success: function(user) {
          alert("added interest to interests arrar for current user");
        },
        error: function(user, error) {
          alert("didn't added interest");
          supersonic.ui.dialog.alert("Error: " + error.message);
        }
      });	
      document.getElementById("interest").value = ''; 	
  	};

    $scope.showSkillsInput = function() {
      var skill = document.getElementById("skill");
      $scope.skills.push(skill.value);
      $scope.addedSkill = false;
      $scope.currentUser.set("skills", $scope.skills2);
      $scope.currentUser.save(null, {
      success: function(user) {
        alert("added skill to skills array for current user");
      },
      error: function(user, error) {
        alert("didn't added skill");
        supersonic.ui.dialog.alert("Error: " + error.message);
      }

    });
      document.getElementById("skill").value = '';     
    };
});

