function initListeners(){
	$('.mdl-list__item').on('click', function(event){
		console.log($(this));
		$('.trailer-video').css('display','none');
		$('.description-text p').css('display','none');
		$('.available-services').css('display','none');
		$('.swipe-actions').css('display','none');
		if(!$(this).hasClass('expanded')){
			$(this).addClass('expanded');
			$('.expanded .trailer-video').css('display','initial');
			$('.expanded .description-text p').css('display','initial');
			$('.expanded .available-services').css('display','initial');
			$('.expanded .swipe-actions').css('display','initial');
		} else {
			$(this).removeClass('expanded');
		}
	});
}

$('#toSwipe').on('click', function(event){
	window.open('/swipe.html', '_self');
});

/**
* Grabs data from Firebase
* Appends data in cards to list
**/
function populateList(){
	var ref = new Firebase("https://binger.firebaseio.com");
	var auth = ref.getAuth();
	if(auth){
		ref.child(auth.uid).on('value', function(data){
			$.each(data.val()['like'], function(key, val){
				console.log(key + '::' + val['data']['title']);
				var templateCopy = $('.swipe-card').clone();
				var tempCard = displayInSwipeCard(templateCopy, val['data']['title'], val['data']['year'], val['data']['rating'], val['data']['runtime'], val['data']['genre'], val['data']['director'], val['data']['plot'], key, 'http://www.google.com/');
				$('.mdl-list').append('<li class="mdl-list__item">' + tempCard.html() + '</li>');
//				var tempcard = displayInSwipeCard($('.swipe-card').clone(), val['data']['title'], val['data']['year'], val['data']['rating'], val['data']['runtime'], val['data']['genre'], val['data']['director'], val['data']['plot'], key, 'http://www.google.com/');
//				console.log(tempcard);
//				$('.mdl-list').append('<li id="' + key + '" class="mdl-list__item">' + tempcard.html() + '</li>');
			});
			initListeners();
//			$('#template').css('visibility','hidden');
		});
	}
}