$(document).ready(function() {
	$('#gallery img').each(function() {
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
	}); 
	}); // end each

	
	$('#gallery a').lightBox({
		overlayOpacity: .5,
		overlayBgColor: '#003376',
		txtImage: 'Рисунок',
		txtOf: 'из'
		
	});
}); // end ready