angular
  .module('Account')
  .controller("ProfileController", function ($scope, supersonic) {


    supersonic.ui.views.current.whenVisible( function () {
      $scope.currentUser = Parse.User.current();
      $scope.interests = $scope.currentUser.get('interests');
      $scope.skills = $scope.currentUser.get('skills');
      $scope.education = $scope.currentUser.get('education');
      $scope.$apply();
    });
    
  });