var Job = Parse.Object.extend("Job");

// Create a new job page
exports.new = function(req, res) {
  res.render('job/new', {
    title: "Create a Job"
  });
};

// Creates a job
exports.create = function(req, res) {
  var job = new Job();

  // if (req.body.text1 === "") {
  //   res.status(403).send('Top text cannot be blank');
  // }

  // Set metadata fields
  job.set('title', req.body.text1);
  

  // // Jobs are read only
  // var acl = new Parse.ACL();
  // acl.setPublicReadAccess(true);
  // job.setACL(acl);
  
  job.save().then(function(object) {
    // res.send({ url: "/job/" + object.id });
    res.render('index');
  }, function(error) {
    res.send('Error saving job!');
  });
};
