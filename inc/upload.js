jQuery(document).ready(function($) {

  // add text 'Please upload your file or add a link beside arrow button  
  if ( !$('.nav-files > button').hasClass('s-active') ) {
    $('.next').before('<span>Please upload your file or add a link</span>');
  }


});