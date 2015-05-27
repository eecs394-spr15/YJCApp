var Advisor = require('cloud/models/advisor');

module.exports = function(app){

	app.get('/advisors', function(req, res){
    // render advisors index page
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

  app.get('/advisors/new', function(req, res){
    // redirect to root if not admin
    if (!req.session.user['admin'])
      return res.redirect('/');

    res.render('advisors/new', {
      user: req.session.user
    });
  });

  app.post('/advisors', function(req, res){
    // redirect to root if not admin
    if (!req.session.user['admin'])
      return res.redirect('/advisors');

    // create new advisor
    // then redirect accordingly
    Advisor.create(req, {
      success: function(advisor) {
        res.redirect('/advisors');
      },
      error: function(advisor, error) {
        res.send('Failed to save advisor!' + error.message);
      }
    });
  });

  app.get('/advisor/:id', function(req, res){
    Advisor.getFull(req.params.id, {
      success: function(result){
        res.render('advisors/show', {
          user: req.session.user,
          advisor: result.advisor,
          clients: result.clients
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.get('/advisor/:id/edit', function(req, res){
    // redirect to advisors if not admin
    if (!req.session.user['admin'])
      return res.redirect('/advisors');

    Advisor.get(req.params.id, {
      success: function(result){
        // render form for editing advisor info
        res.render('advisors/edit', {
          user: req.session.user,
          advisor: result
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.post('/advisor/:id', function(req, res){
    // redirect to advisors if not admin
    if (!req.session.user['admin'])
      return res.redirect('/advisors');

    var method = req.body._method;
    if (method == 'PUT') {
      // call update function in model
      Advisor.update(req, {
        success: function(advisor){
          res.redirect('/advisors');
        },
        error: function(advisor, error){
          // send error message(s)
        }
      });
    } else if (method == 'DELETE') {
      // call delete function in model
      Advisor.destroy(req, {
        success: function(advisor){
          res.redirect('/advisors');
        },
        error: function(advisor, error){
          // send error message(s)
        }
      });
    } else {
      res.redirect('/');
    }
  });

};