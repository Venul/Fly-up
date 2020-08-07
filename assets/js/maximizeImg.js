$( document ).ready(function() {
  $('.minimized').click(function(event) {
    var i_path = $(this.children[0]).attr('src');
    $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
    $('#magnify').css({
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