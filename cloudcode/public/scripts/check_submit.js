function TestDataCheck()
    { 
      
      var company= document.createform.company.value;
      var numOpenings= document.createform.numOpenings.value;
      //var startdate= document.createform.startDate.value;
      var city= document.createform.city.value;
      var address= document.createform.address.value;
      var zip= document.createform.zipcode.value;
      var contactname= document.createform.contact.value;
      var email= document.createform.email.value;
      var jobTitle= document.createform.jobTitle.value;
      var warning="";
     // $('#startDate').removeClass('error-input');
      $('#company').removeClass('error-input');
      $('#city').removeClass('error-input');
      $('#address').removeClass('error-input');
      $('#zipcode').removeClass('error-input');
       $('#contact').removeClass('error-input');
       $('#email').removeClass('error-input');
       $('#jobTitle').removeClass('error-input');
       $('#numOpenings').removeClass('error-input');
      var returnval= true;
       //alert("dsdsds");
      // if (startdate=="") 
      // {
        
      //   returnval = false;
      //   $('#startDate').addClass('error-input');
      //   warning=warning.concat("Date is required!<br>");
      // }
      

      if (company=="") 
      {
        returnval = false;
        $('#company').addClass('error-input');
        warning=warning.concat("Company is required!<br>");
      }
      if (city=="") 
      {
        returnval = false;
        $('#city').addClass('error-input');
         warning=warning.concat("City is required!<br>");
      }
      if (address=="") 
      {
        returnval = false;
        $('#address').addClass('error-input');
        warning+="Address is required!<br>";
      }
      if (zip=="") 
      {
        returnval = false;
        $('#zipcode').addClass('error-input');
        warning+="Zipcode is required!<br>";
      }
      else if (isNaN(zip))
      {
      
        returnval = false;
        $('#zipcode').addClass('error-input');
        warning+="Invalid Zipcode!<br>";

      }
    

      if (contactname=="") 
      {
        returnval = false;
        $('#contact').addClass('error-input');
        warning+="Contact Name is required!<br>";
      }
      if (email=="") 
      {
        returnval = false;
        $('#email').addClass('error-input');
        warning+="Contact Email is required!<br>";
      }
      if (jobTitle=="") 
      {
        returnval = false;
        $('#jobTitle').addClass('error-input');
        warning+="Job Title is required!<br>";
      }
      if(isNaN(numOpenings))
      {
      
        returnval = false;
        $('#numOpenings').addClass('error-input');
        warning+="Invalid Num of Opening !<br>";

      }

      if (returnval==true)
      {
          var x;
          if (confirm("Submit?") == true) {
           returnval==true;
          } else {
            returnval=false;
         }


      }
      
      $('#check').html(warning);
      return returnval;
    }
