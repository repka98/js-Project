$(document).ready(function() {
// обычные ролловеры	
$('#gallery img').each(function(i) {
	var imgFile = $(this).attr('src');
	var preloadImage = new Image();
	preloadImage.src = imgFile.replace('.','_h.');
		
	$(this).hover(
		function() {
			$(this).attr('src', preloadImage.src);
		},
		function () {
		var currentSource=$(this).attr('src');
			$(this).attr('src', imgFile);
	}); // end hover
}); // end each
	
// удаленные ролловеры
	$('#gallery a').click(function(e) {
		e.preventDefault();
		var imgPath = $(this).attr('href'); 
		var oldImage = $('#photo img');
		var newImage = $('<img src="' + imgPath + '">');
		newImage.hide();
		$('#photo').prepend(newImage);
		newImage.fadeIn(1000);
		oldImage.fadeOut(1000, function() {
			$(this).remove();
		});
	});
	
	$('#gallery a:first').click();
	
}); // end ready