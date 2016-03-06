var ref = new Firebase("https://binger.firebaseio.com");
$(document).ready(function() {
	console.log("ready");
	$(".mdl-button--googleplus").click(() => {
		ref.authWithOAuthPopup("google", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    login(authData);
		  }
		});
	});
	$(".mdl-button--facebook").click(() => {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    login(authData);
		  }
		});
	});

});

function login(auth) {
	console.log(auth.uid);
	var uname = auth.google.displayName || auth.facebook.displayName;
	ref.child(auth.uid).set({
		name: uname
	});
	window.location.replace("swipe.html");
}