function checkToken(){
	var d = new Date();
	var expiry = new Date(localStorage.getItem("expiry"));
	if (expiry != null && d < expiry){
		console.log("getting artowkr");
		getArtwork();
	} else {
		getToken()
	}
}

//Get xapp token
function getToken(){
	$.ajax({
		url: "https://api.artsy.net/api/tokens/xapp_token",
		type: 'POST',
	    data: {
	        'client_id':'dee71b310227c9ebda92',
	        'client_secret': '0ec9e137b10df37a3dfdc04f30aaab9c'
	    }, success: function(data){
	    	localStorage.setItem("token",data.token);
	    	localStorage.setItem("expiry",data.expires_at);
	    	getArtwork();
		}
	});
}

//Get random artwork
function getArtwork(){	
	if (localStorage.getItem("index") >= 99 || localStorage.getItem("artworks") == null){
		// console.log("making ajax call");
		var offset = Math.floor(Math.random() * (25000));

		$.ajax({
			url: "https://api.artsy.net/api/artworks/",
			type: 'GET',
			headers: {
				'X-Xapp-Token': localStorage.getItem("token"),
				'Accept': 'application/vnd.artsy-v2+json'
			},
			data: {
				total_count: 1,
				offset: offset,
				size: 100
			},
		success: function(data){
			localStorage.setItem("artworks", JSON.stringify(data._embedded.artworks));
			localStorage.setItem("index", 0);
			getURL();
		}});
	} 

	else {
		getURL();
	}
}

function getArtist(){	
	$.ajax({
		url: localStorage.getItem("artist_href"),
		type: 'GET',
		headers: {
			'X-Xapp-Token': localStorage.getItem("token"),
			'Accept': 'application/vnd.artsy-v2+json'
		},
	success: function(data){
		setArtist(data._embedded.artists[0].name);
	}});
	 
}

//Get URL & large size image
function getURL(){
	var storedArtworks = JSON.parse(localStorage.getItem("artworks"));
	var index = localStorage.getItem("index");
	index++;
	localStorage.setItem("index", index);

	if (index < 99){
		links = storedArtworks[index]._links.curies;
		if (links && 
			//Arbitrary parameters. These types are just usually less colorful and striking upon opening
			//a new tab. Nothing against these types of art!
			!((storedArtworks[index].medium).startsWith("Etching")) && 
			!((storedArtworks[index].medium).startsWith("Lithograph")) &&
			!((storedArtworks[index].medium).startsWith("Wood")) &&
			!((storedArtworks[index].medium).startsWith("Pen")) &&
			!((storedArtworks[index].medium).startsWith("Drypoint")) &&
			!((storedArtworks[index].medium).startsWith("Black")) &&
			!((storedArtworks[index].medium).startsWith("Graphite")) &&
			!((storedArtworks[index].medium).startsWith("Bronze")) &&
			!((storedArtworks[index].medium).startsWith("Engraving"))){

			var link = links[0].href
			link = link.substring(0, link.length-5);
			link += "large.jpg";

			localStorage.setItem("artist_href", storedArtworks[index]._links.artists.href);

			setBackground(link);
			setTitle(storedArtworks[index].title);
			setLink(storedArtworks[index]._links.permalink.href);
			console.log(storedArtworks[index]._links.permalink.href)
			getArtist();
		} else {
			getURL();
		}
	} else {
		getArtwork();
	}
}

//DOM manipulation - set background image
function setBackground(link){
	$(document.getElementById('frame')).css('background-image', 'url("'+ link +'")');
}

function setTitle(title){
	$(document.getElementById('title')).text(title);
}

function setArtist(artist){
	$(document.getElementById('artist')).text(artist);
}

function setLink(artsy_link){
	// $('selector').attr('href', artsy_link);
	$(document.getElementById('link')).attr('href', artsy_link);
}

$(document).ready(function(){
	checkToken();
});