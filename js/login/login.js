var ref = new Firebase("https://binger.firebaseio.com");
$(document).ready(function() {
	console.log("ready");
	$(".mdl-button--googleplus").click(() => {
		ref.authWithOAuthPopup("google", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});
	});
	$(".mdl-button--facebook").click(() => {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});
	});

});