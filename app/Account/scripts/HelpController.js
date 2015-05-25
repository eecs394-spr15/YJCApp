angular
  .module('Account')
  .controller("HelpController", function ($scope, supersonic) { 
  	var slideimages = new Array(); // create new array to preload images
  	slideimages[0] = new Image(); // create new instance of image object
	slideimages[0].src = "/imags/Welcome.jpg"; // set image src property to image path, preloading image in the process
	slideimages[1] = new Image();
	slideimages[1].src = "/imags/editProfile.jpg";
	slideimages[2] = new Image();
	slideimages[2].src = "/imags/profile.jpg";

	var step=0;

	$scope.slideit = function(){
		//if browser does not support the image object, exit.
		if (!document.images)
			return
 		document.getElementById('slide').src = slideimages[step].src
 		if (step<2)
  			step++;
 		else
  			step=0;
	};

  });   
