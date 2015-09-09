

// var token = "JvTPWe4WsQO-xqX6Bts49glIXiZK0K4NeGeIBlWFpWYqhky23NPT2Ao97a-cn1YebnNMzV1npzBQrXaEjqmAp7ewh-82d0BHDJESjLIJKrwBTA_R7WoqPF4DsAZQpX6XHmtA2ozEUYwqmC_FJiIRcMJ8j-raAia0CjFFoWC2qMYIjhaXI_qLMo_ERhLFzHlAAb-pC2bx2Wo4dBi3PoK0YhLw6G9K0VLbjSRfWImdilA="
// var token = ""

// //Get xapp token
// function getToken(){
// 	$.ajax({
// 		url: "https://api.artsy.net/api/tokens/xapp_token",
// 		type: 'POST',
// 	    data: {
// 	        'client_id':'dee71b310227c9ebda92',
// 	        'client_secret': '0ec9e137b10df37a3dfdc04f30aaab9c'
// 	    }, success: function(data){
// 	    	localStorage.setItem("token",data.token);
// 	    	localStorage.setItem("expiry",data.expires_at);
// 		}
// 	});
// }