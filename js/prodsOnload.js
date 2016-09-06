$(document).ready(function(){

	var total = $('#thumbs img').size();
	var loaded = 0;
	$('#thumbs img').onImagesLoads(function(){
		loaded = loaded + 1;
		if(loaded == total){
			$("#carrousell").carousel({
				'width': 300,
				"arrows": "outside"
			});
			$('.loadPro').addClass('ch-hide');
			$('.content-prod').removeClass('ch-hidden')
		}
	});
	var $product = $('#product');
	scrollToo($('.nav-prod a'), $product);
	//$('#zoom_image').zoom();

	function scrollToo(btn, to){
		btn.click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: to.offset().top - 150
			}, 500);
		});
	}
	var foo = $(".colors li").tooltip();
	var toolTopInfoPiso = $(".js-ico-info").tooltip({
		"points": "lb lt",
		"offset": "50 -10"
	});

})