var Job = require('cloud/models/job');

module.exports = function(app){

  app.get('/jobs', function(req, res){
    // render jobs index page
    Job.all({
      success: function (results) {
        res.render('jobs/index', { 
          notice: req.session.notice ? req.session.notice : '',
          user: req.session.user,
          jobs: results
        });
      },
      error: function (error) {
        alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

  app.get('/jobs/new', function(req, res){
    // redirect to jobs if not admin
    if (!req.session.user['admin'])
      res.redirect('/jobs');

    res.render('jobs/new', {
      user: req.session.user
    });
  });

  app.post('/jobs', function(req, res){
    // redirect to jobs if not admin
    if (!req.session.user['admin'])
      res.redirect('/jobs');

    // create new job
    // then redirect accordingly
    Job.create(req, {
      success: function(job) {
        res.redirect('/jobs');
      },
      error: function(job, error) {
        res.send('Error saving job!' + error.message);
      }
    });
  });

  app.get('/job/:id', function(req, res){
    // render page to show job listing with more details
    Job.get(req.params.id, {
      success: function(result){
        res.render('jobs/show', {
          user: req.session.user,
          job: result
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.get('/job/:id/edit', function(req, res){
    Job.get(req.params.id, {
      success: function(result){
        // render form for editing job listing
        res.render('jobs/edit', {
          user: req.session.user,
          job: result
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.post('/job/:id', function(req, res){

    var method = req.body._method;
    if (method == 'PUT') {
      // call edit function in model
      Job.update(req, {
        success: function(){
          //res.redirect('/job/'+req.params.id);
          res.redirect('/jobs');
        },
        error: function(){
          // send error message(s)
        }
      });
    } else if (method == 'DELETE') {
      // call delete function in model
      Job.destroy(req, {
        success: function(){
          res.redirect('/jobs');
        },
        error: function(){
          // send error message(s)
        }
      });
    } else {
      res.redirect('/');
    }
  });
};