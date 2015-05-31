Parse.initialize("v6YwqsYvW2DhyiVxJrte9crarPE0DGIR5GOttEhC", "PDnSHyyq8kRBosmIwZHHbhsN5JqyzDoJVmkNvqDF");
Parse.User.enableRevocableSession();
angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
]);


//globaluser = null;


    //username = null;

    /*var pushNotification;
    document.addEventListener("deviceready", function() {
      pushNotification = window.plugins.pushNotification;
      

      pushNotification.onMessageInForeground(
          messageInForegroundHandler,
          errorHandler);
      pushNotification.onMessageInBackground(
          messageInBackgroundHandler,
          errorHandler);
    });*/
    // the result contains any error description text returned from the plugin call
    /*function errorHandler (error) {
        //supersonic.ui.dialog.alert('error = ' + error);
    }

    // result contains any error description text returned from the plugin call
    function errorHandler (error) {
        //supersonic.ui.dialog.alert('error = ' + error);
    }

    function messageInForegroundHandler (notification) {

        //handle the contents of the notification
        //supersonic.ui.dialog.alert(notification.message || notification.alert);
        if (notification.message || notification.alert)
        {
            supersonic.device.vibrate();
            supersonic.ui.dialog.alert(notification.timestamp);

        }
        //supersonic.ui.dialog.alert(notification.message || notification.alert);

    }

    


    // result contains any error description text returned from the plugin call
    function errorHandler (error) {
        //supersonic.ui.dialog.alert('error = ' + error);
    }

    function messageInBackgroundHandler (notification) {
        if (notification.coldstart) {
            // ios, this is always true
            // the application was started by the user tapping on the notification
        }
        else {
            //this notification was delived while the app was in background
        }

        //handle the contents of the notification
        var message = notification.message || notification.alert;
    }
    */
