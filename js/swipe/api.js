function init(){
	getRandomMovie($('#card-1'));
	getRandomMovie($('#card-2'));
	getRandomMovie($('#card-3'));
//	$(".thumbnail").on("click", function(){
//		console.log($(this).parent().parent());
//		onThumbnailClick($(this).parent().parent());
//	});
}

function getRandomMovie(swipecard){
	$.getJSON("http://server.naitian.org:8080/random", function(data){
		displayInSwipeCard(swipecard, data['Title'], data['Year'], data['Rated'], data['Runtime'], data['Genre'], data['Director'], data['Plot'], data['imdbID'], data['Poster']);
	});
}

function displayInSwipeCard(swipecard, title, year, rated, runtime, genre, director, plot, imdbID, poster){
	$("#" + swipecard.prop('id')).val(imdbID);
	$("#" + swipecard.prop('id') + " .title").html(title);
	$("#" + swipecard.prop('id') + " .year").html(year);
	$("#" + swipecard.prop('id') + " .rated").html(rated);
	$("#" + swipecard.prop('id') + " .runtime").html(runtime);
	$("#" + swipecard.prop('id') + " .genre").html(genre);
	$("#" + swipecard.prop('id') + " .director").html(director);
	$("#" + swipecard.prop('id') + " .plot").html(plot);
	$("#" + swipecard.prop('id') + " .trailer-background").css("background-image","url(" + poster + ")");
	$("#" + swipecard.prop('id') + " .thumbnail").css("background-image", "url(" + poster + ")")
		.css("background-repeat","no-repeat")
		.css("background-position","center")
		.css("background-size","contain")
		.css("height",$("#card-1 .thumbnail").height())
		.css("width", "auto")
		.click(function(){ onThumbnailClick($(this)) });
}

function onThumbnailClick(obj){
	$.get("http://server.naitian.org:8080/trailer?imdbid=" + obj.parent().parent().val().substring(2), function(data){
		if(data.indexOf('iframe') != -1){
			obj.replaceWith(data.substring(data.indexOf('iframe') - 1, data.lastIndexOf('iframe') + 7));
			$("iframe").css("margin","auto")
				.prop("src", "http://" + $("iframe").prop("src").substring(7));
		} else {
			console.log("No Trailer Available");	
		}
	});
}

function removeiFrame(){
	$('iframe').replaceWith('<div class="thumbnail"></div>');
}

function addPreference(like){
	
}