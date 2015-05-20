var Advisor = Parse.Object.extend('Advisor');

// get all advisors
exports.all = function(callback){
	var query = new Parse.Query(Advisor);
	query.find({
    success: function(results){
      callback.success(results);
    },
    error: function(error){
      callback.error(error);
    }
  });
};