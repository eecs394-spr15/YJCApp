angular
  .module('Account')
  .controller("ProfileController", function ($scope, supersonic) {
  	$scope.currentUser = Parse.User.current();
  	$scope.interests = $scope.currentUser.get('interests');
  	$scope.skills = $scope.currentUser.get('skills');
  	$scope.education = $scope.currentUser.get('education');
  	
  });