$(document).ready(function() {
	
	$('#gallery img').each(function() {
		var imgFile = $(this).attr('src');
		var preLoadImg = new Image();
		preLoadImg.src = imgFile.replace('.', '_h.'); // <img src='...'>
		$(this).hover(function(){
			$(this).attr('src', preLoadImg.src);
		}, function() {
			$(this).attr('src', imgFile);
		});
		
	}); // end each()
	
}); // end ready