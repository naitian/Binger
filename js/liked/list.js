$('.mdl-list__item').on('click', function(event){
	console.log('#' + $(this).children().prop('id') + '.trailer-video');
	$('#' + $(this).children().prop('id') + ' .trailer-video').css('display','initial');
	$('#' + $(this).children().prop('id') + ' .description-text p').css('display','initial');
	$('#' + $(this).children().prop('id') + ' .available-services').css('display','initial');
	$('#' + $(this).children().prop('id') + ' .swipe-actions').css('display','initial');
});

$(document).on('click', function(event){
	console.log(event.target);
});