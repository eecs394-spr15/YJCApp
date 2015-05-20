function TestDataCheck()
    { 
      var company= document.createform.company.value;
      var city= document.createform.city.value;
      var address= document.createform.address.value;
      var zip= document.createform.zipcode.value;
      var contactname= document.createform.contact.value;
      var email= document.createform.email.value;
      var jobTitle= document.createform.jobTitle.value;
      String warning="";

   
      var returnval= true;

      if (company=="") 
      {
        returnval = false;
        $('#company').addClass('error-input');
        warning+="Company is required!\r";
      }
      if (city=="") 
      {
        returnval = false;
        $('#city').addClass('error-input');
        warning+="City is required!\r";
      }
      if (address=="") 
      {
        returnval = false;
        $('#address').addClass('error-input');
        warning+="Address is required!\r";
      }
      if (zip=="") 
      {
        returnval = false;
        $('#zip').addClass('error-input');
        warning+="Zipcode is required!\r";
      }
      if (contactname=="") 
      {
        returnval = false;
        $('#contact').addClass('error-input');
        warning+="Contact Name is required!\r";
      }
      if (email=="") 
      {
        returnval = false;
        $('#email').addClass('error-input');
        warning+="Contact Email is required!\r";
      }
      if (jobTitle=="") 
      {
        returnval = false;
        $('#jobTitle').addClass('error-input');
        warning+="Job Title is required!\r";
      }

      
      $('#check').html(warning);
      return returnval;
    }
