angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
    supersonic.ui.navigationBar.hide();


    //find jobs that match

  //   if(currUser){
  //   	var interests = currUser.get("Interests");
  //   	var zipcode = currUser.get("zipcode");
  //   	var skills = currUser.get("skills");
  //   	var degree = currUser.get("degree");

  //   	//start query


  //   	var Job = Parse.Object.extend("Job");
		// var query = new Parse.Query(Job);

		// query.equalTo("zipcode", zipcode);
		

  //   }

    var Job = Parse.Object.extend("Job");
    var query = new Parse.Query(Job);
    
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        $scope.jobs = results;
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

});
