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


function checkAdminCredentialsForm(){
  var username = document.adminForm.username.value;
  var password = document.adminForm.password.value;
  var newUsername = document.adminForm.newUsername.value;
  var newPassword = document.adminForm.newPassword.value;
  var newPassword2 = document.adminForm.newPassword2.value;

  $('#username').removeClass('error-input');
  $('#password').removeClass('error-input');
  $('#newUsername').removeClass('error-input');
  $('#newPassword').removeClass('error-input');
  $('#newPassword2').removeClass('error-input');
  
  var returnval = true;

  if (username == '') {
    returnval = false;
    $('#username').addClass('error-input');
    $('#usernameError').html(' * ');
    $('#usernameError').append('This field cannot be blank!');
  }

  if (password == '') {
    returnval = false;
    $('#password').addClass('error-input');
    $('#passwordError').html(' * ');
    $('#passwordError').append('This field cannot be blank!');
  }

  if (newUsername == '') {
    returnval = false;
    $('#newUsername').addClass('error-input');
    $('#newUsernameError').html(' * ');
    $('#newUsernameError').append('This field cannot be blank!');
  }

  if (newPassword == '') {
    returnval = false;
    $('#newPassword').addClass('error-input');
    $('#newPasswordError').html(' * ');
    $('#newPasswordError').append('This field cannot be blank!');
  }

  if (newPassword2 == '') {
    returnval = false;
    $('#newPassword2').addClass('error-input');
    $('#newPassword2Error').html(' * ');
    $('#newPassword2Error').append('This field cannot be blank!');
  }

  if (newPassword !== newPassword2) {
    returnval = false;
    $('#newPassword2').addClass('error-input');
    $('#newPassword2Error').html(' * ');
    $('#newPassword2Error').append('The passwords do not match!');
  }

  if (returnval == true) {
    if (confirm('Submit?') == true)
      returnval = true;
    else
      returnval = false;
  }

  return returnval;
}



function checkAdminInfoForm(){
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


function checkAdminForm(){
  var firstName = document.adminForm.firstName.value;
  var lastName = document.adminForm.lastName.value;
  var email = document.adminForm.email.value;
  var username = document.adminForm.username.value;
  var password = document.adminForm.password.value;
  var password2 = document.adminForm.password2.value;

  $('#firstName').removeClass('error-input');
  $('#lastName').removeClass('error-input');
  $('#email').removeClass('error-input');
  $('#username').removeClass('error-input');
  $('#password').removeClass('error-input');
  $('#password2').removeClass('error-input');
  
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

  if (username == '') {
    returnval = false;
    $('#username').addClass('error-input');
    $('#usernameError').html(' * ');
    $('#usernameError').append('This field cannot be blank!');
  }

  if (password == '') {
    returnval = false;
    $('#password').addClass('error-input');
    $('#passwordError').html(' * ');
    $('#passwordError').append('This field cannot be blank!');
  }

  if (password2 == '') {
    returnval = false;
    $('#password2').addClass('error-input');
    $('#password2Error').html(' * ');
    $('#password2Error').append('This field cannot be blank!');
  }

  if (password !== password2) {
    returnval = false;
    $('#password2').addClass('error-input');
    $('#password2Error').html(' * ');
    $('#password2Error').append('The passwords do not match!');
  }

  if (returnval == true) {
    if (confirm('Submit?') == true)
      returnval = true;
    else
      returnval = false;
  }

  return returnval;
}
