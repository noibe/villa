/*!
 * Villa Mr Feedback v0.9.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

// Client call to toggle FullScreen mode
$('.about img').click(function(){
	toggleFullScreen();
});

/* timeInterval default is 30 seconds*/
var timeInterval = 30000;
var timeResponse = 0;

var senseResponses = new Array();

/*setInterval(function() {

	if (senseResponses.length > 0) {
		// if has responses on array
		for (var i = senseResponses.length; i > 0; i--) {

			var ajaxTime = new Date().getTime();

			var responseString = JSON.stringify(Array(senseResponses[i - 1]));

			$.ajax({
				cache: false,
				data: {
					response: responseString
				},
				error: function() {

					console.log('falhas');

					// ajust the time interval (or not)
					if(timeInterval < 30000) {
						timeInterval += 2000;
					}

				},
				success: function(data) {

					if (data == 301) {
						// if the result is equal to '303'

						// drop one position of the responses array
						senseResponses.pop();

						// ajust the time interval (or not)
						if(timeInterval > 10000) {
							timeInterval -= 2000;
						}

						timeResponse = new Date().getTime()-ajaxTime;
					} else {
					}

					console.log(data);

				},
				timeout: timeInterval / 2,
				type: 'POST',
				url: "http://noibe.com/api/mrfb/index.php"
			});

		}

	} else {
		console.log("trying");
		// if NOT has responses on array
		$.ajax({
			cache: false,
			error: function(data) {
				// remove the class online if exists
				if($('body').hasClass('online')) {
					$('body').removeClass('online');
				}
			},
			success: function(data) {
				// add or not the class online
				if(!$('body').hasClass('online')) {
					$('body').addClass('online');
				}

			},
			timeout: timeInterval / 2,
			type: 'POST',
			url: "http://noibe.com/api/mrfb/index.php"
		});
	}

}, timeInterval);*/

// Function to get the responses
// Temporary use
function getResponse(vote, service, place) {

	var response = new Array();

	if (local) {
		response = {
			comment: 'Novo teste',
			place: local,
			service: 1,
			vote: vote
		};
	}

	senseResponses.push(response);

	/*
	// Show thanks message
	setTimeout(function(){
		$(settings.target).attr("class", settings.defaultClass);
		$(settings.target).attr("data-value", "");

		currentIndex = $(this).index();
	}, 4000);
	*/

}

function startResponse(vote) {

}

// Implent the Distinct plugin at starts markup
$('.sense .star').distinct({
	selfAction: [
		{
			action: function(el) {
				startResponse(el)
			},
			attrName: 'thanks',
			index: [0,1],
			passParam: true,
			plusOne: true
		},
		{
			action: function(el) {
				console.log('3 ou 4');
			},
			index: [2,3],
			passParam: true,
			plusOne: true
		}
	],
	plusOne: true
});

// Implent the Distinct plugin at options markup
$('.sense .option').distinct('touch', {
	action: function(el) {
		$('body').removeClassLike('star-');
		console.log(el + ' é o serviço');
	},
	doDistinct: false,
	plusOne: true
});

// full screen mode
function toggleFullScreen() {
	if (!document.fullscreenElement &&    // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}