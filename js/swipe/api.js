function init(){
	getRandomMovie($('#card-1'));
	getRandomMovie($('#card-2'));
	getRandomMovie($('#card-3'));
}

function getRandomMovie(swipecard){
	$.getJSON("http://server.naitian.org:8080/random", function(data){
//		swipecard.prop('id',data['imdbID']);
		displayInSwipeCard(swipecard, data['Title'], data['Year'], data['Rated'], data['Runtime'], data['Genre'], data['Director'], data['Plot'], data['imdbID'], data['Poster']);
	});
}

function displayInSwipeCard(swipecard, title, year, rated, runtime, genre, director, plot, imdbID, poster){
	$("#" + swipecard.prop('id') + " .title").html(title);
	$("#" + swipecard.prop('id') + " .year").html(year);
	$("#" + swipecard.prop('id') + " .rated").html(rated);
	$("#" + swipecard.prop('id') + " .runtime").html(runtime);
	$("#" + swipecard.prop('id') + " .genre").html(genre);
	$("#" + swipecard.prop('id') + " .director").html(director);
	$("#" + swipecard.prop('id') + " .plot").html(plot);
			console.log(poster);
	$("#" + swipecard.prop('id') + " .trailer-background").css("background-image","url(" + poster + ")");
	
	$.get("http://server.naitian.org:8080/trailer?imdbid=" + imdbID.substring(2), function(data){
		$("#" + swipecard.prop('id') + " .trailer-video iframe").replaceWith("<div class='thumbnail'></div>");
		console.log("#" + swipecard.prop('id') + " .thumbnail" + " -------- " + poster);
			$("#" + swipecard.prop('id') + " .thumbnail").css("background-image", "url(" + poster + ")")
				.css("background-repeat","no-repeat")
				.css("background-position","center")
				.css("height",$("#" + swipecard.prop('id') + " .thumbnail").height())
				.css("width", "auto");
			if(data.indexOf('iframe') != -1){
				$("#" + swipecard.prop('id') + " .thumbnail").replaceWith(data.substring(data.indexOf('iframe') - 1, data.lastIndexOf('iframe') + 7));
				$("#" + swipecard.prop('id') + " .trailer-video iframe").css("margin","auto")
					.prop("src", "http://" + $("#" + swipecard.prop('id') + " .trailer-video iframe").prop("src").substring(7));
			}
	});
}