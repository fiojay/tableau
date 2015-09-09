console.log("art.js");

$(document).ready(function(){
	$(document.body).hover(function(){
    	$(document.getElementById('overlay')).removeClass('hidden');
    }, function(){
    	$(document.getElementById('overlay')).addClass('hidden');
	});
});