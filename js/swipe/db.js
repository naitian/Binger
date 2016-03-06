var ref = new Firebase("https://binger.firebaseio.com");
function addPreference(like, el){
	var auth = ref.getAuth();
	var data = {};
	id = $("#" + el.prop('id')).val();
	data.title = $("#" + el.prop('id') + " .title").html();
	data.year = $("#" + el.prop('id') + " .year").html();
	data.rating = $("#" + el.prop('id') + " .rated").html();
	data.runtime = $("#" + el.prop('id') + " .runtime").html();
	data.genre = $("#" + el.prop('id') + " .genre").html();
	data.director = $("#" + el.prop('id') + " .director").html();
	data.plot = $("#" + el.prop('id') + " .plot").html();
	data.poster = $("#" + el.prop('id') + " .thumbnail").css('background-image');

	if(auth){
		if(like)
			ref.child(auth.uid + "/like/" + id).update({
				data
			});
		else
			ref.child(auth.uid + "/dislike/" + id).update({
				data
			});
	}
	else
		window.location.replace("login.html");
}