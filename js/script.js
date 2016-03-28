var heightHeader = $('#header').height();
var heightSection = $(window).height() - heightHeader;
var heightSlider = $('.slider').height();
var heightDesta = heightSection - heightSlider
var marginTop = (heightDesta - 125)/2 ;
var heightLiProduct = (heightSection-68)/4;


//alert(heightDesta);


/*	$('.slider').css('height',heightSlider+'px');
$("head").append($('<style>.slider:after { top:'+heightSlider+'px}</style>'));*/
//$('.slider:after').css('top',heightSlider+'px');


$(document).ready(function(){
	var load = $("body").queryLoader2({
	    barColor: "#6e6d73",
	    backgroundColor: "#FFF",
	    percentage: true,
	    barHeight: 1,
	    completeAnimation: "grow",
	    minimumTime: 100
	});

	// var carouselDesta = $("#carousel-desta").carousel({
	// 	'width': 920,
	// 	'play': true
	// });

	var $homeLink = $('#homeLink');
	var $home = $('#home');
	scrollToo($homeLink, $home)
	
	
	// $.ajaxq('test',{
	// 	url: 'productos.html',

	// 	success: function(data) {
	// 		$(data).insertAfter("#home");
	// 		$('#products').ready(function(){
	// 			var $productsLink = $('#productsLink');
	// 			var $products = $('#products');
	// 			scrollToo($productsLink, $products)

	// 		})
			

			
	// 		// if($(window).height() > 480){
	// 		// 	$('#home').css('height',heightSection+'px');
	// 		// 	$('#products').css('height',heightSection+'px');
	// 		// 	$('#products li').css('height',heightLiProduct+'px');
	// 		// }
	// 	}
	// });

	$.ajaxq('test',{
		url: 'producto.html',

		success: function(data){
			$(data).insertAfter('#home');
			
				$('.content-prod').load('products/pisos.html');
				$('.nav-prod').load('nav_prod.html');
				var $productLink = $('#products a');
				var $productsLink = $('#productsLink');
				var $product = $('#product');

				scrollToo($productsLink, $product)
			
			

			

		}
	})

	$.ajaxq('test',{
		url: 'empresa.html',

		success: function(data){
			$(data).insertAfter('#product');
			
				var $empresaLink = $('#empresaLink');
				var $empresa = $('#empresa');
				scrollToo($empresaLink, $empresa)
			
			
		}
	})
	$.ajaxq('test',{
		url: 'contacto.html',

		success: function(data){
			$(data).insertAfter('#empresa');
			
				var $contactoLink = $('#contactoLink');
				var $contacto = $('#contacto');	
				scrollToo($contactoLink, $contacto);

				$('a.map').modal({
					'width': '629px',
					'height': '455px'
				});
				loadContact();

				// "Trigger" Play Music Player 
				$('.mp3player object').removeClass('ch-hide');
				var carouselHome = $("#carousel-home").carousel().play(5000);
			
			
		}
	})
// Navegacion de pagina productos
	$('#products a').live('click',function(e){
		e.preventDefault();

		$('.loadPro').removeClass('ch-hide');
		$('.content-prod').addClass('ch-hidden');

		$('.content-prod').load('products/'+this.className+'.html');
	})

// Navegacion derecha de pagina DE productos
	$('.nav-prod a').live('click',function(e){
		e.preventDefault();
		$('.loadPro').removeClass('ch-hide');
		$('.content-prod').addClass('ch-hidden');

		$('.nav-prod a').removeClass('active')
		$('.content-prod').load('products/'+this.id+'.html');
		$(this).addClass('active')
	})

	
	
	function scrollToo(btn, to){
		btn.click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: to.offset().top - 150
			}, 500);
		});
	}

	

	$('#thumbs img').live('click', function(){
		$('.loader').removeClass('ch-hide');
		$('#largeImage').addClass('ch-hide');

		$('#largeImage').attr('src',$(this).attr('src').replace('thumb','large')).load(function(){
			$('#largeImage').removeClass('ch-hide');
			$('.loader').addClass('ch-hide');
		});
		//$('#zoom_image').attr('href',$(this).attr('src').replace('thumb','full'));
		//$('#description').html($(this).attr('alt'));
	});
	// $('#productsLink').on('hover',function(){
	// 	$('.nav-prod').removeClass('ch-hide');
	// });
	// $('#productsLink').on('mouseout',function(){
	// 	$('.nav-prod').addClass('ch-hide');
	// });
	

	/*/CONTACT FORM/*/

	//if submit button is clicked
	var loadContact = function(){
		$('#submit').click(function () {		
		
			//Get the data from all the fields
			var name = $('input[name=name]');
			var email = $('input[name=email]');
			var res = $('input[name=res]');
			var telefono = $('input[name=telefono]');
			var comment = $('textarea[name=comment]');
			
			//Simple validation to make sure user entered something
			//If error found, add hightlight class to the text field
			if (name.val()=='') {
				name.addClass('hightlight');
				return false;
			} else name.removeClass('hightlight');

			if (!validateEmail(email.val())) {
				email.addClass('hightlight');
				return false;
			} else {
				$('.error').hide();
				email.removeClass('hightlight');
			}
			
			if (comment.val()=='') {
				comment.addClass('hightlight');
				return false;
			} else comment.removeClass('hightlight');
			
			//organize the data properly
			var data = 'name=' + name.val() + '&email=' + email.val() + '&res=' + res.val() + '&telefono=' + 
			telefono.val() + '&comment='  + encodeURIComponent(comment.val());
			
			//disabled all the text fields
			//$('.text').attr('disabled','true');
			
			//show the loading sign
			$('.loading').show();
			
			//start the ajax
			$.ajax({
				dataType: "jsonp",

				jsonp : "callback",

				//this is the php file that processes the data and send mail
				url: $('.ch-form').attr('action'),	
				
				//GET method is used
				type: "GET",

				//pass the data			
				data: data,		
				
				//Do not cache the page
				cache: false,
				
				//success
				success: function (callback) {				
					//if process.php returned 1/true (send mail success)
					if (callback) {
						
						//show the success message
						$('.done').fadeIn('slow');
						$('input[type=text], textarea, input[type=email], input[type=tel]').val('');
						
					//if process.php returned 0/false (send mail failed)
					} else alert('Perdón, hubo un error. Por favor, vuelva a intentar.');				
				}		
			});

			//cancel the submit button default behaviours
			return false;
		});


		$('input[name=name], input[name=email],input[name=comment]').blur(function(){
			if($(this).val() != ''){
				$(this).removeClass('hightlight');
			}
		})	
	}

	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	$('body').removeClass('ch-hidden');

})

// $(window).on('resize',function(){
// 	heightHeader = $('#header').height();
// 	heightSection = $(window).height() - heightHeader;
// 	$('#home').css('height',heightSection+'px');		
// 	$('#products').css('height',heightSection+'px');
// })