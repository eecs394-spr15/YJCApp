angular
  .module('home')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
    supersonic.ui.navigationBar.hide();
});
