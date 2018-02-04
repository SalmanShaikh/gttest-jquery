var $ = jQuery = require('../jquery');

module.exports = function() {
	var PRODUCTS_FEATURES = {};
	var FEATURES_NAV = {};
	var productTitle = '';
	var DynamicTemplate = '';

	$('.product-block').each(function(){
		var productBlock = $(this);
		var jsonPath = window.location.href +'/'+ $(this).attr('data-json');
		if(jsonPath != undefined && jsonPath != '') {
			$.getJSON(jsonPath, function() {
				//fetch json success
			})
			.done(function(data){
			  productTitle = data.title;
			  $.each(data.content, function(index, feature){
			  		//HTML should stay where it is belongs to :) so we can maintain sepration of concenrn;
			  		//imagine, same html markup can be reuse with another js framework. 
			  		var tempTemplate = $('.feature-template').parent();
			  		tempTemplate.find('.feature-title').html(feature.title);
			  		tempTemplate.find('.feature-desc').html(feature.description.replace(/�/g, '-'));
			  		if(feature.thumbnail != undefined && feature.thumbnail != '') {
			  			tempTemplate.find('.product-image img').attr('src', window.location.href + '/images/'+ feature.thumbnail);
			  		} else {
			  			tempTemplate.find('.product-image').remove();
			  		}
			  		DynamicTemplate += tempTemplate.html();
			  		FEATURES_NAV[index] = feature.title;
			  }); //each feature
			  //IMPORTANT : Touch the DOM once only
			  productBlock.find('ul.product-container').empty().html(DynamicTemplate).removeClass('hidden');

			  var totalli = productBlock.find('ul.product-container li').size() -1;
			  //build slide nav
			  productBlock.find('ul.product-container li').each(function(i){
			  		var slideNav = $(this).find('.slide-nav');
			  		if(i == 0) {
			  			slideNav.find('.prev').remove();
			  			slideNav.find('.next').html(FEATURES_NAV[i+1]).attr('for', 'slide_'+(i+1));
			  		} else if(i == totalli) {
			  			slideNav.find('.prev').html(FEATURES_NAV[i-1]).attr('for', 'slide_'+(i-1));
			  			slideNav.find('.next').remove();
			  		} else {
			  			slideNav.find('.prev').html(FEATURES_NAV[i-1]).attr('for', 'slide_'+(i-1));
			  			slideNav.find('.next').html(FEATURES_NAV[i+1]).attr('for', 'slide_'+(i+1));
			  		}
			  });;
			}); 
		}//validate json path :todo validate path formation
	}); //we may use same component twice on page. try by duplicating markup in the html

	//bind event listner globally, so multiple instance on page can be heard.
	$('body').on('click', '.slide-nav .next, .slide-nav .prev', function(e){
		e.preventDefault();
		var isPrev = $(this).hasClass('prev');
		var mainLi = $(this).closest('ul').find('li:first');
		var thisLiIndex = $(this).closest('li').index() + 1;
		if(isPrev) {
			thisLiIndex -= 1;
			if(thisLiIndex == 1) {
				mainLi.css('margin-left', '0%');
			} else {
				mainLi.css('margin-left', -((thisLiIndex-1)*100) + '%');
			}
		} else {
			mainLi.css('margin-left', -(thisLiIndex*100) + '%');
		}
	});
}