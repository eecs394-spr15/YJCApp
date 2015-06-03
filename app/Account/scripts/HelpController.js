angular
  .module('Account')
  .controller("HelpController", function ($scope, supersonic) { 
  // help page controller

  	var slideimages = new Array(); // create new array to preload images
  	slideimages[0] = new Image(); // create new instance of image object
  	slideimages[0].src = "/imags/Welcome.jpg"; // set image src property to image path, preloading image in the process
  	slideimages[1] = new Image();
  	slideimages[1].src = "/imags/slide1.jpg";
  	slideimages[2] = new Image();
  	slideimages[2].src = "/imags/slide2.jpg";
  	slideimages[3] = new Image();
  	slideimages[3].src = "/imags/slide3.jpg";
  	slideimages[4] = new Image();
  	slideimages[4].src = "/imags/slide4.jpg";
  	slideimages[5] = new Image();
  	slideimages[5].src = "/imags/slide5.jpg";
  	slideimages[6] = new Image();
  	slideimages[6].src = "/imags/slide6.jpg";

  	var step=0;

  	$scope.slideRight = function(){
  		//if browser does not support the image object, exit.
  		if (!document.images)
  			return
   		if (step<5)
    			step= step + 1;
   		else
    			step=0;
    		
    		document.getElementById('slide').src = slideimages[step].src;
  	};

  	$scope.slideLeft = function(){
  		//if browser does not support the image object, exit.
  		if (!document.images)
  			return
   		if (step<5)
    			step= step - 1;
   		else
    			step=0;
    		
    		document.getElementById('slide').src = slideimages[step].src;
  	};

  });   
