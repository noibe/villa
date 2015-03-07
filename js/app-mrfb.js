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
function getResponse(vote, local) {

	var response = {
		comment: 'Novo teste',
		place: local,
		service: 1,
		vote: vote
	};

	senseResponses.push(response);

	setTimeout(function(){
		$(settings.target).attr("class", settings.defaultClass);
		$(settings.target).attr("data-value", "");

		currentIndex = $(this).index();
	}, 4000);

}

+function ($) {
	'use strict';

	/* Constructor of distinct functions */
	$.fn.distinct = function (options) {

		var settings = $.extend({
			selfAction: false,
			content: "",
			defaultClass: "",
			startName: "",
			target: "body",
			touchEvents: true
		}, options);

		var currentIndex;

		// Add Touch and Mouse Listeners to elements
		this.each(function() {
			if (settings.touchEvents) {
				this.addEventListener("touchstart", handleController, false);
			}

			this.addEventListener("click", handleController, false);
		});

		// Handle Controller (start the actions with the listeners (touch or mouse))
		function handleController(evt) {


			evt.preventDefault();

			// Get the Index of element
			currentIndex = $(this).index();

			// Test if exists some self action
			if (settings.selfAction) {

				// init the self array
				var self = Array();

				// Find a index number at selfAction array and put on array 'self'
				// Ps: test for a fastest method to loop the array using the 'l' var
				for (var i = 0, l = settings.selfAction.length; i < l; i++) {

					// Internal Loop to pass in all index of SelfAction Array
					for (var j = 0; j < settings.selfAction[i].index.length; j++) {

						// Test if the current index is in some selfAction Object
						if (settings.selfAction[i].index[j] == currentIndex) {
							// Put the founded object to self array
							self.push(settings.selfAction[i]);
						}

					}

				}

				// Execute or not the rules declared on selfAction
				for (var i = 0; i < self.length; i++) {
					self[i].action(this);
				}

			}
		}

		var num = 0;

		console.log(Array.isArray(settings.selfAction[num].index));
		console.log(settings.selfAction[num].index instanceof Array);
		console.log(typeof settings.selfAction[num].index === Array);
		console.log(Object.prototype.toString.call(settings.selfAction[num].index) === '[object Array]');
		console.log(settings.selfAction[num].index.length);

	}

}(jQuery);

// execute the plugin

$('.card .star').distinct({
	selfAction: [
		{
			action: function(el) {
				console.log('o valor é 1 ou 3');
			},
			attrName: 'test',
			index: [1,2,3,0]
		},
		{
			action: function(el) {
				console.log('pra puta que pariu');
			},
			attrName: 'test',
			index: 0
		}
	],
	defaultClass: $('body').attr('class'),
	startName: 'star',
	targetData: true
});

/* external funcs */

function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {x: xPosition, y: yPosition};
}

//get scroll position from top
function getScrollTop() {
	if (typeof pageYOffset != 'undefined') {
		//most browsers except IE before #9
		return pageYOffset;
	}
	else {
		var B = document.body; //IE 'quirks'
		var D = document.documentElement; //IE with doctype
		D = (D.clientHeight) ? D : B;
		return D.scrollTop;
	}
}

//removes class with prefix
jQuery.fn.removeClassLike = function (prefix) {
	var classes = this.attr("class").split(" ").filter(function (c) {
		return c.lastIndexOf(prefix, 0) !== 0;
	});
	return this.attr("class", classes.join(" "));
}

//full screen mode
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