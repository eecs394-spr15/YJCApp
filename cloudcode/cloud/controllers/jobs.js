var Job = require('cloud/models/job');

module.exports = function(app){

  app.get('/jobs', function(req, res){
    // render jobs index page
    Job.all({
      success: function (results) {
        res.render('jobs/index', { 
          notice: req.session.notice ? req.session.notice : '',
          user: req.session.user,
          //userId: req.session.userId,
          //username: req.session.username,
          jobs: results
        });
      },
      error: function (error) {
        alert('Error: ' + error.code + ' ' + error.message);
      }
    });
  });

  app.get('/jobs/new', function(req, res){
    // render new job form
    res.render('jobs/new', {
      user: req.session.user,
      //userId: req.session.userId,
      //username: req.session.username
    });
  });

  app.post('/jobs', function(req, res){
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
};


/*
// Create a new job page
exports.new = function(req, res) {
  res.render('job/new', {
    title: "Create a Job"
  });
};

// Creates a job
exports.create = function(req, res) {
  var Job = Parse.Object.extend("Job");
  var job = new Job();
  var jobErrors = {};
  var numErrors = 0;
  // check null
  if (req.body.jobTitle === '' || req.body.jobTitle === null || req.body.jobTitle === undefined)
  {
    jobErrors.jobTitle = "Invalid Job Title";
    numErrors++;
  }
  if (!req.body.company)
  {
    jobErrors.company = "Invalid Company";
  }

  if (numErrors > 0)
    res.render('jobs/index', {username: 'sysadmin', errors: jobErrors});


  // if (req.body.text1 === "") {
  //   res.status(403).send('Top text cannot be blank');
  // }

  // Set metadata fields
  job.set('jobTitle', req.body.jobTitle);
  job.set('company', req.body.company);
  job.set('salary', req.body.salary);
  job.set('address', String(req.body.address));
  job.set('zipcode', parseInt(req.body.zipcode) || 0);
  job.set('educationRequirement', String(req.body.educationRequirement));
  job.set('numOpenings', parseInt(req.body.numOpenings) || 0);
  job.set('workSchedule', req.body.workSchedule);
  job.set('startDate', new Date(req.body.startDate));
  job.set('hoursPerWeek', parseFloat(req.body.hoursPerWeek) || 0.0);
  job.set('fullTime', req.body.fullTime);
  job.set('jobDescription', req.body.jobDescription);
  //job.set('qualifications', req.body.qualifications);
  job.set('contact', req.body.contact); 
  job.set('Comment', req.body.Comment);
  
  // // Jobs are read only
  // var acl = new Parse.ACL();
  // acl.setPublicReadAccess(true);
  // job.setACL(acl);
  
  // no errors
  jobErrors = {
    jobTitle: ''
  };
  job.save(null, {
    success: function(job) {
      res.render('jobs/index', { username: 'sysadmin', errors: jobErrors});

    },
    error: function(job, error) {
      res.send('Error saving job!' + error.message);
    }
  });


};

//*/