$(function(){
  $('.minimized').click(function(event) {
    var i_path = $(this).attr('src');
    $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
    $('#magnify').css({
	    // left: ($(document).width() - $('#magnify').outerWidth())/2,
	    // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
            // top: ($(window).height() - $('#magnify').outerHeight())/2
            // top: 40
	  });
    $('#overlay, #magnify').fadeIn('slow');
  });
  
  $('body').on('click', '#close-popup, #overlay', function(event) {
    event.preventDefault();
 
    $('#overlay, #magnify').fadeOut('slow', function() {
      $('#close-popup, #magnify, #overlay').remove();
    });
  });
});