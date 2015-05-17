angular.module('Account', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);


//set the date input as current day, set starttime as right now, set endtime as hour from now
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

Date.prototype.toStartTimeInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(11,13) + ":00:00";
});

Date.prototype.toEndTimeInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset() + 60);
  return local.toJSON().slice(11,13) + ":00:00";
});

Date.prototype.toTimeInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(11,19);
});
