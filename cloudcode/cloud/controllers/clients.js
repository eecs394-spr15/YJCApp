var Client = require('cloud/models/client');

module.exports = function(app){

  app.get('/clients', function(req, res){
    // redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // render clients index page
    Client.all({
      success: function (results, result) {
        res.render('clients/index', { 
          notice: req.session.notice ? req.session.notice : '',
          user: req.session.user,
          clients: results,
          verification: result
        });
      },
      error: function (error) {
        alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

  /*
  app.get('/clients/new', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      return res.redirect('/clients');

    res.render('clients/new', {
      user: req.session.user
    });
  });

  app.post('/clients', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      return res.redirect('/clients');

    // create new client then redirect to edit client information
    Client.create(req, {
      success: function(client) {
        res.redirect('/client/' + client.id + '/edit');
      },
      error: function(client, error) {
        res.send('Error saving client!' + error.message);
      }
    });
  });
  //*/

  app.get('/client/:id', function(req, res){
    // redirect to login if not logged in
    if (!req.session.user)
      return res.redirect('/login');

    // render page to show client listing with more details
    Client.getFull(req.params.id, {
      success: function(result){
        res.render('clients/show', {
          user: req.session.user,
          client: result.client,
          clientInterests: result.jobInterests,
          advisor: result.advisor
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  /*
  app.get('/client/:id/edit', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      return res.redirect('/clients');

    Client.getWithAdvisors(req.params.id, {
      success: function(result){
        // render form for editing client listing
        res.render('clients/edit', {
          user: req.session.user,
          client: result.client,
          advisors: result.advisorList
        });
      },
      error: function(error){
        // send error message(s)
      }
    });
  });

  app.post('/client/:id', function(req, res){
    // redirect to clients if not admin
    if (!req.session.user['admin'])
      return res.redirect('/clients');

    var method = req.body._method;
    if (method == 'PUT') {
      // call update function in model
      Client.update(req, {
        success: function(client){
          res.redirect('/clients');
        },
        error: function(client, error){
          res.send('Error updating client!' + error.message);
        }
      });
    } else if (method == 'DELETE') {
      // call delete function in model
      Client.destroy(req, {
        success: function(client){
          res.redirect('/clients');
        },
        error: function(client, error){
          res.send('Error deleting client!' + error.message);
        }
      });
    } else {
      res.redirect('/');
    }
  });
  //*/
};