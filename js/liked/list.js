function initListeners(){
	$('.mdl-list__item').on('click', function(event){
		if($(this).hasClass('expanded')){
			$('.trailer-video').css('display','none');
			$('.description-text p').css('display','none');
			$('.available-services').css('display','none');
			$('.swipe-actions').css('display','none');
			$(this).removeClass('expanded');
		} else {
			$('.trailer-video').css('display','none');
			$('.description-text p').css('display','none');
			$('.available-services').css('display','none');
			$('.swipe-actions').css('display','none');
			$('.mdl-list__item').removeClass('expanded');
			$(this).addClass('expanded');
			$('.expanded .trailer-video').css('display','initial');
			$('.expanded .description-text p').css('display','initial');
			$('.expanded .available-services').css('display','initial');
			$('.expanded .swipe-actions').css('display','initial');

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
				console.log(val['data']);
				var templateCopy = $('.swipe-card').clone();
				templateCopy.prop('id', key);
				$('.mdl-list').append('<li class="mdl-list__item">' + templateCopy.prop('outerHTML') + '</div></li>');
				displayInSwipeCard(templateCopy, val['data']['title'], val['data']['year'], val['data']['rating'], val['data']['runtime'], val['data']['genre'], val['data']['director'], val['data']['plot'], key, val['data']['poster'].substring(5,val['data']['poster'].length-2));
//				var tempcard = displayInSwipeCard($('.swipe-card').clone(), val['data']['title'], val['data']['year'], val['data']['rating'], val['data']['runtime'], val['data']['genre'], val['data']['director'], val['data']['plot'], key, 'http://www.google.com/');
//				console.log(tempcard);
//				$('.mdl-list').append('<li id="' + key + '" class="mdl-list__item">' + tempcard.html() + '</li>');
				
			});
			initListeners();
			$($('.mdl-list').children()[0]).css('display','none');
		});
	} else {
		window.open('/login.html', '_self');
	}
}