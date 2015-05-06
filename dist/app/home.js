angular.module('home', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
    supersonic.ui.navigationBar.hide();
});
