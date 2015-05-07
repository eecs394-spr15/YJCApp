
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

  // if (req.body.text1 === "") {
  //   res.status(403).send('Top text cannot be blank');
  // }

  // Set metadata fields
  job.set('jobTitle', req.body.jobTitle);
  job.set('company', req.body.company);
  job.set('salary', req.body.salary);
  job.set('address', req.body.address);
  job.set('zipcode', parseInt(req.body.zipcode) || 0);
  job.set('educationRequirement', req.body.educationRequirement);
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
  
  job.save(null, {
    success: function(job) {
      res.render('index', {username: 'sysadmin'});

    },
    error: function(job, error) {
      res.send('Error saving job!' + error.message);
    }
  });


};