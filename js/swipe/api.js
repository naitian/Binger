function getRandomMovie(){
	$.getJSON("http://server.naitian.org:8080/random", function(data){
		console.log(data);
//		$.each(data, function(key, val){
//			console.log(key + " : " + val);
//		});
		displayInSwipeCard(data['Title'], data['Year'], data['Rated'], data['Runtime'], data['Genre'], data['Director'], data['Plot'], data['imdbID'], data['Poster']);
		console.log("http://server.naitian.org:8080/trailer?imdbid=" + data['imdbID'].substring(2));
	});
	
}

function displayInSwipeCard(title, year, rated, runtime, genre, director, plot, imdbID, poster){
	$("#title").html(title);
	$("#year").html(year);
	$("#rated").html(rated);
	$("#runtime").html(runtime);
	$("#genre").html(genre);
	$("#director").html(director);
	$("#plot").html(plot);
			console.log(poster);
	$(".trailer-background").css("background-image","url(" + poster + ")");
	
	$.get("http://server.naitian.org:8080/trailer?imdbid=" + imdbID.substring(2), function(data){
			$(".trailer-video iframe").replaceWith("<img class='thumbnail'>");
			$(".thumbnail").prop("src", poster)
				.css("width", "auto");
			if(data.indexOf('iframe') != -1){
				$(".trailer-video img").replaceWith(data.substring(data.indexOf('iframe') - 1, data.lastIndexOf('iframe') + 7));
				$(".trailer-video iframe").css("margin","auto")
					.prop("src", "http://" + $(".trailer-video iframe").prop("src").substring(7));
			}
	});
}
