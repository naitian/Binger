function getRandomMovie(){
	$.getJSON("http://server.naitian.org:8080/random", function(data){
		$.each(data, function(key, val){
			console.log(key + " : " + val);
		});
	});
}

function displayInSwipeCard(title, year, rated, runtime, genre, director, plot){
	
}