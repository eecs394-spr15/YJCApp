function checkJobForm() {  
  var company = document.jobform.company.value;
  var numOpenings = document.jobform.numOpenings.value;
  var city = document.jobform.city.value;
  var address = document.jobform.address.value;
  var zip = document.jobform.zipcode.value;
  var contactname = document.jobform.contact.value;
  var email = document.jobform.email.value;
  var jobTitle = document.jobform.jobTitle.value;
  var warning = '';

  $('#company').removeClass('error-input');
  $('#city').removeClass('error-input');
  $('#address').removeClass('error-input');
  $('#zipcode').removeClass('error-input');
  $('#contact').removeClass('error-input');
  $('#email').removeClass('error-input');
  $('#jobTitle').removeClass('error-input');
  $('#numOpenings').removeClass('error-input');
  
  var returnval = true;

  if (company == '') {
    returnval = false;
    $('#company').addClass('error-input');
    $('#companyError').html(' * ');
    $('#companyError').append('This field cannot be blank!');
  }

  if (city == '') {
    returnval = false;
    $('#city').addClass('error-input');
    $('#cityError').html(' * ');
    $('#cityError').append('This field cannot be blank!');
  }

  if (address == '') {
    returnval = false;
    $('#address').addClass('error-input');
    $('#addressError').html(' * ');
    $('#addressError').append('This field cannot be blank!');
  }

  if (zip == '') {
    returnval = false;
    $('#zipcode').addClass('error-input');
    $('#zipcodeError').html(' * ');
    $('#zipcodeError').append('This field cannot be blank!');
  }
  else if (isNaN(zip)) {  
    returnval = false;
    $('#zipcode').addClass('error-input');
    $('#zipcodeError').html(' * ');
    $('#zipcodeError').append('Zipcode must be a number');
  }
  
  if (contactname == '') {
    returnval = false;
    $('#contact').addClass('error-input');
    $('#contactError').html(' * ');
    $('#contactError').append('This field cannot be blank!');
  }

  if (email == '') {
    returnval = false;
    $('#email').addClass('error-input');
    $('#emailError').html(' * ');
    $('#emailError').append('This field cannot be blank!');
  }

  if (jobTitle == '') {
    returnval = false;
    $('#jobTitle').addClass('error-input');
    $('#jobTitleError').html(' * ');
    $('#jobTitleError').append('This field cannot be blank!');
  }
  
  if(isNaN(numOpenings)){ 
    returnval = false;
    $('#numOpenings').addClass('error-input');
    $('#numOpeningsError').html(' * ');
    $('#numOpeningsError').append('Number of openings must be a number!');
  }

  if (returnval == true) {
    if (confirm('Submit?') == true)
      returnval = true;
    else
      returnval = false;
  }
      
  return returnval;
}

function checkAdvisorForm(){
  var firstName = document.advisorForm.firstName.value;
  var lastName = document.advisorForm.lastName.value;
  var email = document.advisorForm.email.value;

  $('#firstName').removeClass('error-input');
  $('#lastName').removeClass('error-input');
  $('#email').removeClass('error-input');
  
  var returnval = true;

  if (firstName == '') {
    returnval = false;
    $('#firstName').addClass('error-input');
    $('#firstNameError').html(' * ');
    $('#firstNameError').append('This field cannot be blank!');
  }

  if (lastName == '') {
    returnval = false;
    $('#lastName').addClass('error-input');
    $('#lastNameError').html(' * ');
    $('#lastNameError').append('This field cannot be blank!');
  }

  if (email == '') {
    returnval = false;
    $('#email').addClass('error-input');
    $('#emailError').html(' * ');
    $('#emailError').append('This field cannot be blank!');
  }

  if (returnval == true) {
    if (confirm('Submit?') == true)
      returnval = true;
    else
      returnval = false;
  }

  return returnval;
}
