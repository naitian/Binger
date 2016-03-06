function init(){
	if(document.referrer.indexOf('login') != -1){
		getRandomMovie($('#card-1'));
		getRandomMovie($('#card-2'));
		getRandomMovie($('#card-3'));
	}
}

function getRandomMovie(swipecard){
	$.getJSON("http://server.naitian.org:8080/random", function(data){
		var auth = ref.getAuth();
		if(auth){
			ref.child(auth.uid).once("value", (d) => {
				console.log(d.val());
				if(!(d.val().dislike[data['imdbID']] !== undefined || d.val().like[data['imdbID']] !== undefined)){
							displayInSwipeCard(swipecard, data['Title'], data['Year'], data['Rated'], data['Runtime'], data['Genre'], data['Director'], data['Plot'], data['imdbID'], data['Poster']);
				}
				else{
					getRecommendedMovie(swipecard, pickRandomProperty(d.val().like));
				}
			});
		} else {
			window.open('/login.html', '_self');	
		}
	});
}

function getRecommendedMovie(swipecard, movie){
	$.getJSON("http://server.naitian.org:8080/recommend?title=" + movie, function(data){
		console.log(data);
		if(data.Similar.Results.length <1){
			getRandomMovie(swipecard);
			return;
		}
		$.getJSON("http://server.naitian.org:8080/movie?title=" + data.Similar.Results[parseInt(Math.random() * data.Similar.Results.length)].name, function(data){
			var auth = ref.getAuth();
			if(auth){
				ref.child(auth.uid).once("value", (d) => {
					console.log(d.val());
					if(!(d.val().dislike[data['imdbID']] !== undefined || d.val().like[data['imdbID']] !== undefined)){
								displayInSwipeCard(swipecard, data['Title'], data['Year'], data['Rated'], data['Runtime'], data['Genre'], data['Director'], data['Plot'], data['imdbID'], data['Poster']);
					}
					else{
						getRandomMovie(swipecard);
					}
				});
			}
		});
	});
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function displayInSwipeCard(swipecard, title, year, rated, runtime, genre, director, plot, imdbID, poster){
	swipecard.css('display','inherit');
	$("#" + swipecard.prop('id')).val(imdbID);
	$("#" + swipecard.prop('id') + " .title").html(title);
	$("#" + swipecard.prop('id') + " .year").html(year);
	$("#" + swipecard.prop('id') + " .rated").html(rated);
	$("#" + swipecard.prop('id') + " .runtime").html(runtime);
	$("#" + swipecard.prop('id') + " .genre").html(genre);
	$("#" + swipecard.prop('id') + " .director").html(director);
	$("#" + swipecard.prop('id') + " .plot").html(plot);
	$("#" + swipecard.prop('id') + " .trailer-background").css("background-image","url(" + poster + ")")
		.css('background-size','contain');
	$("#" + swipecard.prop('id') + " .thumbnail").css("background-image", "url(" + poster + ")")
		.css("background-repeat","no-repeat")
		.css("background-position","center")
		.css("background-size","contain")
		.css("height", "124px")
		.css("width", "auto")
		.click(function(){ onThumbnailClick($(this)) });
	updateServiceAvailability('netflix', title, swipecard.prop('id'));
	updateServiceAvailability('hulu', title, swipecard.prop('id'));
	updateTrailerPlayButton(swipecard.prop('id'), imdbID);
	
//	return swipecard;
}

function updateServiceAvailability(service, title, cardid){
	$.getJSON("http://server.naitian.org:8080/streaming?service=" + service + "&title=" + title, function(data){
		if(!data['streamable']){
			$("#" + cardid + " .icon-" + service).addClass("icon-disabled");
		} else {			
			$("#" + cardid + " .icon-" + service).removeClass("icon-disabled").on("click", function(){window.location.href = `http://www.${service}.com/watch/${data.id}`});
		}
		$.data($(cardid), service, data);
	});
}

function updateTrailerPlayButton(parentid, imdbid){
	console.log("http://server.naitian.org:8080/trailer?imdbid=" + imdbid.substring(2));
	$.get("http://server.naitian.org:8080/trailer?imdbid=" + imdbid.substring(2), function(data){
		if(data.indexOf('iframe') != -1){
			$('#' + parentid + ' .video-play-button').css('display','inherit');
		} else {
			$('#' + parentid + ' .video-play-button').css('display','none');
		}
	});
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

$('.like-icon').on('click',function(event){
	addPreference(true);
});

$('.dislike-icon').on('click',function(event){
	addPreference(false);
});

$('#toLikedMovies').on('click', function(){
	window.open('liked.html', '_self');
});
$('#logout').on('click', function(){
	ref.unauth();
	window.open('/login.html', '_self');
});

function addPreference(like){
	
}
