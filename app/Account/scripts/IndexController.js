angular
  .module('Account')
  .controller("IndexController", function ($scope, supersonic) {    
  // edit profile page controller 
    $scope.globaluser = "undefined";  // global logged in user, supersonic binding only returns objects or string
    supersonic.bind($scope, "globaluser");
    $scope.$apply();
    $scope.advisorFirstName = []; //advisor information
    $scope.advisorLastName = [];
    $scope.advisorFullName = [];
    $scope.advisorEmail = [];
    $scope.Account = {};  // empty account object


    supersonic.ui.views.current.whenVisible( function () {
    // called every time the account/index.html page is visible   
      var advisor = Parse.Object.extend("Advisor"); // find advisors in parse db
      var query = new Parse.Query(advisor);
      query.find({
        success: function(results) {
          $scope.advisorFirstName = [];
          $scope.advisorLastName = [];
          $scope.advisorFullName = [];
          $scope.advisorEmail = [];
          if (results.length === 0) // if there are no advisors
          {
            $scope.advisorFullName.push("No Advisors");
            $scope.advisorFirstName.push("No Advisors");
            $scope.advisorLastName.push("No Advisors");
            $scope.advisorEmail.push("No Advisors");
          }

          for (var i = 0; i < results.length; i++)  // populate advisor arrays with the advisor information
          {
            $scope.advisorFirstName.push(results[i].get("firstName"));
            $scope.advisorLastName.push(results[i].get("lastName"));
            $scope.advisorFullName.push(results[i].get("firstName") + " " + results[i].get("lastName"));
            $scope.advisorEmail.push(results[i].get("email")); 
            $scope.$apply();
          }
          var user = Parse.Object.extend("User"); // find the currently logged in user
          query = new Parse.Query(user);


          query.equalTo("objectId", Parse.User.current().id);
          query.first({
            success: function(results) {
              $scope.Account.skills = [];
              $scope.interests = [];
              $scope.Account.education = [];
              $scope.Account.timeAvailable = [];
              $scope.currentUser = results;
              $scope.Account.email = $scope.currentUser.get("email");
              $scope.Account.firstName = $scope.currentUser.get('firstName');
              $scope.Account.lastName = $scope.currentUser.get('lastName');
              $scope.Account.phoneNumber = $scope.currentUser.get('phoneNumber');
              $scope.Account.zipcode = $scope.currentUser.get('zipcode');
              $scope.Account.dateOfBirth = $scope.currentUser.get('dateOfBirth');
              $scope.Account.criminalHistory = $scope.currentUser.get('criminalHistory');
              if ($scope.currentUser.get('advisorEmail'))
                $scope.Account.advisorFullName = $scope.currentUser.get('advisorFirstName') + " " + $scope.currentUser.get('advisorLastName');
              else
                $scope.Account.advisorFullName = $scope.advisorFullName[0];
              $scope.Account.jobRadius = $scope.currentUser.get('jobRadius');
              // get job radius
              if ($scope.Account.jobRadius)
              {
                var id = $scope.currentUser.get('jobRadius');
                id = "#d" + id;
                $(id).prop("checked", true);
              }

              // array values
              $scope.Account.interests = $scope.currentUser.get("interests");
              $scope.Account.education = $scope.currentUser.get("education");
              $scope.Account.timeAvailable = $scope.currentUser.get("timeAvailable");

              // if date of birth is not set, set todays date as a value
              if ($scope.Account.dateOfBirth === null || $scope.Account.dateOfBirth === undefined)
                $('#dateofbirth').val(new Date().toDateInputValue());
              else
                $('#dateofbirth').val($scope.Account.dateOfBirth.toDateInputValue());

              // get interests array data
              for (var i = 0; i < $scope.Account.interests.length; i++)
              {
                var id = $scope.Account.interests[i].replace(/ /g,'').toLowerCase().replace(/[^a-z]/g, "");
                id = '#' + id;
                $(id).prop("checked", true);
              }
              // get education array data
              for (i = 0; i < $scope.Account.education.length; i++)
              {
                var id = $scope.Account.education[i].replace(/ /g,'').toLowerCase().replace(/[^a-z]/g, "");
                id = '#' + id;
                $(id).prop("checked", true);
              }
              // get time available 
              for (i = 0; i < $scope.Account.timeAvailable.length; i++)
              {
                var id = $scope.Account.timeAvailable[i].replace(/ /g,'').toLowerCase().replace(/[^a-z0-9]/g, "");
                id = '#' + id;
                $(id).prop("checked", true);
              }
              // get criminal history
              if ($scope.Account.criminalHistory === true)
                $('#hascriminal').prop("checked", true);
              else
                $('#hascriminal').prop("checked", false);
              $scope.$apply();
            },
            error: function(error) {
              //alert("Error: " + error.code + " " + error.message);
            }
          });
        },
        error: function(results) {

        }
      });
    });
 
    $scope.selectAll = function () {
    // select all interests
      if ($('#all').prop("checked") === true)
        $("#industries :input").prop("checked", true);
      else
        $("#industries :input").prop("checked", false);
    };  

    $scope.checkForm = function () {
    // check form for errors, display red border on any inputs with errors 
      var numErrors = 0;
      $('email-lbl').removeClass('error-input');
      $('#firstname-lbl').removeClass('error-input');
      $('#lastname-lbl').removeClass('error-input');
      $('#phonenumber-lbl').removeClass('error-input');
      $('#zipcode-lbl').removeClass('error-input');
      $('#advisor-lbl').removeClass('error-input');
      $('#password-lbl').removeClass('error-input');
      $('#password2-lbl').removeClass('error-input');

      
      if ($('#zipcode').val() === '' || $('#zipcode').val() === undefined || $('#zipcode').val() === null)
      {
      // check zipcode field has value
        numErrors++;
        $('#zipcode-lbl').addClass('error-input');
        $('#zipcode').focus();
      }
      if ((!isNaN(parseFloat($('#zipcode').val())) && isFinite($('#zipcode').val())) == false)
      {
      // check zipcode is a number
        numErrors++;
        $('#zipcode-lbl').addClass('error-input');
        $('#zipcode').focus();
      }
      if ($('#phonenumber').val() === '' || $('#phonenumber').val() === undefined || $('#phonenumber').val() === null)
      {
      // check phoneumber exists 
        numErrors++;
        $('#phonenumber-lbl').addClass('error-input');
        $('#phonenumber').focus();
      }
      if ((!isNaN(parseFloat($('#phonenumber').val())) && isFinite($('#phonenumber').val())) == false)
      {
      // check phonenumber is a number
        numErrors++;
        $('#phonenumber-lbl').addClass('error-input');
        $('#phonenumber').focus();
      }
      if ($('#lastname').val() === '' || $('#lastname').val() === undefined || $('#lastname').val() === null)
      {
      // check last name
        numErrors++;
        $('#lastname-lbl').addClass('error-input');
        $('#lastname').focus();
      }
      if ($('#firstname').val() === '' || $('#firstname').val() === undefined || $('#firstname').val() === null)
      {
      // check first name
        numErrors++;
        $('#firstname-lbl').addClass('error-input');
        $('#firstname').focus();
      }
      if ($('#email').val() === '' || $('#email').val() === undefined || $('#email').val() === null)
      {
      // check email
        numErrors++;
        $('#email-lbl').addClass('error-input');
        $('#email').focus();
      }
      if ($('#password2').val() != $('#password').val())
      {
        numErrors++;
        $('#password-lbl').addClass('error-input');
        $('#password2-lbl').addClass('error-input');
        $('#password').focus();
      }
      if (numErrors === 0)
      {
        $scope.addNewAccount();
      }
    };
    
    $scope.addNewAccount = function () {   
    // add new account/update existing 
      // get new dob
      var startDate = $('#dateofbirth').val().split("-");
      startDate[0] = parseInt(startDate[0]);
      startDate[1] = parseInt(startDate[1]) - 1;
      startDate[2] = parseInt(startDate[2]);
      $scope.Account.dateOfBirth = new Date(startDate[0], startDate[1], startDate[2]);
      // get industries
      $scope.Account.interests = [];
      $('#industries').find('input').each(function(i, element)
      {
        if ($(element).prop("checked"))
        {
          var parent = element.parentNode.parentNode;
          $scope.Account.interests.push($(parent).text().trim());
        }
      });
      // get education
      $scope.Account.education = [];
      $('#education').find('input').each(function(i, element)
      {
        if ($(element).prop("checked"))
        {
          var parent = element.parentNode.parentNode;
          $scope.Account.education.push($(parent).text().trim());
        }
      });
      // get skills
      $scope.Account.skills = [];
      $('#standardskills').find('input').each(function(i, element)
      {
        if ($(element).prop("checked"))
        {
          var parent = element.parentNode.parentNode;
          $scope.Account.skills.push($(parent).text().trim());
        }
      });
      // criminal history
      if ($('#hascriminal').prop("checked")){
        $scope.Account.criminalHistory = true;
      }else{
        $scope.Account.criminalHistory = false;
      }

      // get time available
      $scope.Account.timeAvailable = [];
      $('#timeavailable').find('input').each(function(i, element)
      {
        if ($(element).prop("checked"))
        {
          var parent = element.parentNode.parentNode;
          $scope.Account.timeAvailable.push($(parent).text().trim());
        }
      });

      //check education
      if ($scope.Account.education.indexOf("Bachelor's Degree") != -1)
      {
        if ($scope.Account.education.indexOf("Associate's Degree") == -1)
          $scope.Account.education.push("Associate's Degree");
        if ($scope.Account.education.indexOf("GED/High School Diploma") == -1)
          $scope.Account.education.push("GED/High School Diploma");
      }
      if ($scope.Account.education.indexOf("Associate's Degree") != -1)
      {
        if ($scope.Account.education.indexOf("GED/High School Diploma") == -1)
          $scope.Account.education.push("GED/High School Diploma");
      }


      var newUser = false;
      // check if user is new or just signed up
      if ($scope.currentUser.get("firstName") == '' && $scope.currentUser.get("lastName") == '' &&
        $scope.currentUser.get("phoneNumber") == '' && $scope.currentUser.get("zipcode") == '')
      {
        newUser = true;
      }

      // save the values to parse db
      $scope.currentUser.set("email", $scope.Account.email);
      $scope.currentUser.set("username", $scope.Account.email);
      $scope.currentUser.set("firstName", $scope.Account.firstName);
      $scope.currentUser.set("lastName", $scope.Account.lastName);
      $scope.currentUser.set("phoneNumber", $scope.Account.phoneNumber);
      $scope.currentUser.set("dateOfBirth", $scope.Account.dateOfBirth);
      $scope.currentUser.set("zipcode", $scope.Account.zipcode);
      $scope.currentUser.set("criminalHistory", $scope.Account.criminalHistory);
      $scope.currentUser.set("interests", $scope.Account.interests);
      $scope.currentUser.set("skills", $scope.Account.skills);
      $scope.currentUser.set("education", $scope.Account.education);
      $scope.currentUser.set("timeAvailable", $scope.Account.timeAvailable);

      var index = $scope.advisorFullName.indexOf($scope.Account.advisorFullName);
      $scope.currentUser.set("advisorFirstName", $scope.advisorFirstName[index]);
      $scope.currentUser.set("advisorLastName", $scope.advisorLastName[index]);
      $scope.currentUser.set("advisorEmail", $scope.advisorEmail[index]);
      $scope.Account.jobRadius = parseInt($('input[name=distance]:checked').val());
      $scope.currentUser.set("jobRadius", $scope.Account.jobRadius);
      $scope.currentUser.set("password", $('#password').val());

      $scope.currentUser.save(null, {
        success: function(user) {

        },
        error: function(user, error) {
          supersonic.ui.dialog.alert("Failed to save profile: " + error.message);
        }
      }); 
      $scope.globaluser = $scope.currentUser;
      $scope.$apply();

      // go to help page if new user was signed up
      if (newUser)
      {
        supersonic.ui.layers.popAll().then(function() {
          supersonic.ui.tabs.select(2);
        });
      }
      else // go back to the profile page
        supersonic.ui.layers.pop();
    };	

    $scope.showSkillsInput = function() {
      // get skills (not being used in app currently)
      var skill = document.getElementById("skill");
      var skillval = skill.value;

      var newli = document.createElement("li");
      newli.className = "item item-checkbox";

      var text = document.createTextNode(skillval);

      var newlbl = document.createElement("label");
      newlbl.className = "checkbox";

      var newinput = document.createElement("input");
      newinput.setAttribute("id", skillval.replace(/ /g,'').toLowerCase().replace(/[^a-z1-9]/g, ""));
      newinput.setAttribute("type", "checkbox");
      newinput.setAttribute("checked", true);

      newlbl.appendChild(newinput);
      newli.appendChild(newlbl);
      newli.appendChild(text);
      document.getElementById("standardskills").appendChild(newli);

      
      document.getElementById("skill").value = '';     
    };
});

