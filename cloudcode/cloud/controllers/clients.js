var Client = require('cloud/models/client');

module.exports = function(app){

  app.get('/clients', function(req, res){
    // render clients index page
    Job.all({
      success: function (results) {
        res.render('clients/index', { 
          notice: req.session.notice ? req.session.notice : '',
          user: req.session.user,
          clients: results
        });
      },
      error: function (error) {
        alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

  app.get('/clients/new', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      res.redirect('/clients');

    res.render('clients/new', {
      user: req.session.user
    });
  });

  app.post('/clients', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      res.redirect('/clients');

    // create new client then redirect accordingly
    Job.create(req, {
      success: function(client) {
        res.redirect('/clients');
      },
      error: function(client, error) {
        res.send('Error saving client!' + error.message);
      }
    });
  });

  app.get('/client/:id', function(req, res){
    // render page to show client listing with more details
    Client.getFull(req.params.id, {
      success: function(result){
        res.render('clients/show', {
          user: req.session.user,
          client: result.client,
          jobInterests: result.jobInterests
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.get('/client/:id/edit', function(req, res){
    Client.get(req.params.id, {
      success: function(result){
        // render form for editing client listing
        res.render('clients/edit', {
          user: req.session.user,
          client: result
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.post('/client/:id', function(req, res){

    var method = req.body._method;
    if (method == 'PUT') {
      // call update function in model
      Client.update(req, {
        success: function(client){
          //res.redirect('/client/'+req.params.id);
          res.redirect('/clients');
        },
        error: function(client, error){
          // send error message(s)
        }
      });
    } else if (method == 'DELETE') {
      // call delete function in model
      Client.destroy(req, {
        success: function(client){
          res.redirect('/clients');
        },
        error: function(client, error){
          // send error message(s)
        }
      });
    } else {
      res.redirect('/');
    }
  });
};