var $ = jQuery = require('jquery')
   productSlider = require('./components/product-slider');

$(function(){
  //modular approach so we can expand application with more new modules or reuse same module elsewhere.
  productSlider();
}); //DOM READY



