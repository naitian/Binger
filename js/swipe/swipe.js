/*
var initX = 0;

$('.swipe-card').on('mousedown', function(event){
	initX = event.pageX;
	console.log('initX' + initX);
});
$(document).on('mousemove', function(event){
	console.log(initX);
	if(initX != 0){
		$('.swipe-card').css('transform','translate(' + (((event.pageX - initX) / 3) - 50) + '%, -50%)');
		if((((event.pageX - initX) / 3) - 50) > -20){
			$('.swipe-card').css('transform','translate(-20%, -50%)');
		} else if((((event.pageX - initX) / 3) - 50) < -80){
			$('.swipe-card').css('transform','translate(-80%, -50%)');
		}
	}
}).on('mouseup', function(event){
	if((((event.pageX - initX) / 3) - 50) < -20 && (((event.pageX - initX) / 3) - 50 > -80)){
		$('.swipe-card').css('transition', 'transform 0.1s ease').css('transform','translate(-50%, -50%)');
	} else {
		$('.swipe-card').css('transform', 'translate(-50%, -50%)').css('opacity','0').animate({
			opacity: 1,
		}, 1000, function(){});
		
	}
	initX = 0;
});
*/

new ElastiStack(document.getElementById('elasticstack')) ;