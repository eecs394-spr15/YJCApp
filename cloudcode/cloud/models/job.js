var Job = Parse.Object.extend('Job');


// get all jobs
exports.all = function(callback){
	var query = new Parse.Query(Job);
	query.find(callback);
};

// get job with matching id
exports.get = function(id, callback){
  var query = new Parse.Query(Job);
  query.get(id, callback);
};

// create new job
exports.create = function(req, callback){
  var job = new Job();
  var jobErrors = {};
  var numErrors = 0;
  // check null
  if (req.body.jobTitle === '' || req.body.jobTitle === null || req.body.jobTitle === undefined){
    jobErrors.jobTitle = 'Invalid Job Title';
    numErrors++;
  }
  if (!req.body.company)
    jobErrors.company = 'Invalid Company';

  if (numErrors > 0)
    res.render('jobs/index', { username: 'sysadmin', errors: jobErrors });


  // if (req.body.text1 === "") {
  //   res.status(403).send('Top text cannot be blank');
  // }

  // Set metadata fields
  job.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
  //I think it is the post date
  job.set('startDate', new Date(req.body.startDate));
  job.set('company', req.body.company);
  job.set('address', String(req.body.address));
  job.set('city', String(req.body.city));
  job.set('zipcode', parseInt(req.body.zipcode) || 0);
  job.set('contact', req.body.contact); 
  job.set('email', req.body.email); 
  job.set('phone', req.body.phone); 
  job.set('hiringProcess', req.body.hiringProcess); 




  job.set('jobTitle', req.body.jobTitle);
  job.set('jobDescription', req.body.jobDescription);
  job.set('fullTime', req.body.fullTime);
  job.set('minAge', req.body.minAge);
  job.set('numOpenings', parseInt(req.body.numOpenings) || 0);
  job.set('hoursPerWeek', parseFloat(req.body.hoursPerWeek) || 0.0);
  job.set('salary', req.body.salary);
  job.set('backgroundCheck', req.body.backgroundCheck);
  job.set('drugTest', req.body.drugTest);
  

  job.set('ged', req.body.ged);
  job.set('educationRequirement', String(req.body.educationRequirement));
  job.set('driver', req.body.driver);
  job.set('comment', req.body.comment);

  //job.set('workSchedule', req.body.workSchedule);
  
 
  
  
  //job.set('qualifications', req.body.qualifications);
  
  
  
  // // Jobs are read only
  // var acl = new Parse.ACL();
  // acl.setPublicReadAccess(true);
  // job.setACL(acl);
  
  // no errors
  jobErrors = {
    jobTitle: ''
  };
  job.save(null, callback);
};

exports.update = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(result){
      result.set('EmployerIndustryTypes', req.body.employerIndustryTypes);
      result.set('startDate', new Date(req.body.startDate));
      result.set('company', req.body.company);
      result.set('salary', req.body.salary);
      result.set('address', String(req.body.address));
      result.set('city', String(req.body.city));
      result.set('zipcode', parseInt(req.body.zipcode) || 0);
      result.set('contact', req.body.contact); 
      result.set('email', req.body.email); 
      result.set('phone', req.body.phone); 
      result.set('hiringProcess', req.body.hiringProcess); 

      result.set('jobTitle', req.body.jobTitle);
      result.set('jobDescription', req.body.jobDescription);
      result.set('hoursPerWeek', parseFloat(req.body.hoursPerWeek) || 0.0);
      result.set('fullTime', req.body.fullTime);
      result.set('minAge', req.body.minAge);
      result.set('numOpenings', parseInt(req.body.numOpenings) || 0);
      
      result.set('backgroundCheck', req.body.backgroundCheck);
      result.set('drugTest', req.body.drugTest);
     
    
     // result.set('workSchedule', req.body.workSchedule);
     
      result.set('ged', req.body.ged);
       result.set('educationRequirement', String(req.body.educationRequirement));
      result.set('driver', req.body.driver);
      //result.set('qualifications', req.body.qualifications);
    
      result.set('comment', req.body.comment);
      result.save(null, callback);
    },
    error: callback.error
  });
};

exports.destroy = function(req, callback){
  var id = req.params.id;
  var query = new Parse.Query(Job);
  query.get(id, {
    success: function(result){
      result.destroy(callback);
    },
    error: callback.error
  });
};