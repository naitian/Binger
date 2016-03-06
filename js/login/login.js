var ref = new Firebase("https://binger.firebaseio.com");
$(document).ready(function() {
	console.log("ready");
	if(ref.getAuth()){
		window.location.replace("swipe.html");	
	}
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
	var uname = "";
	if(auth.google)
		uname = auth.google.displayName;
	else if(auth.facebook)
		uname = auth.facebook.displayName;

	ref.child(auth.uid).set({
		name: uname
	});

	ref.child(auth.uid).once("value", function(snap){
		var data = snap.val();
		if(data.like === null)
			ref.child(auth.uid).set({
				like: 0
			});
		if(data.dislike === null)
			ref.child(auth.uid).set({
				dislike: 0
			});
	});

	window.location.replace("swipe.html");
}