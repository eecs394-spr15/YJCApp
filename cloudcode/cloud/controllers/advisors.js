var Advisor = require('cloud/models/advisor');

module.exports = function(app){

	app.get('/advisors', function(req, res){
    // render jobs index page
    Advisor.all({
      success: function (results) {
        res.render('advisors/index', { 
          user: req.session.user,
          advisors: results
        });
      },
      error: function (error) {
        alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

  
};