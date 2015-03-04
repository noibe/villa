/*!
 * Villa Mowe Distinct v0.4.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */
//1024x480

$('.slide .about').click(function(){
	toggleFullScreen();
});

/* timeInterval default is 30 seconds*/
var timeInterval = 30000;
var timeResponse = 0;

var senseResponses = new Array();

setInterval(function() {

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

}, timeInterval);

(function ($) {

	/* Constructor of distinct functions */
	$.fn.distinct = function (options) {

		var settings = $.extend({
			content: "",
			defaultClass: "",
			startName: "",
			target: "body",
			targetData: false
		}, options);

		/*console.log(this);*/
		/*console.log(settings.target);*/

		var distinctList = new Array();
		var currentIndex;

		$(this).click(function(index) {

			navigator.vibrate(200);

			var string = "";

			if(currentIndex == $(this).index() + 1) {

				$(settings.target).attr("class", settings.defaultClass);
				$(settings.target).attr("data-value", "");

				currentIndex = $(this).index();


			} else {
				currentIndex = $(this).index() + 1;

				if (settings.startName) {
					string = settings.startName + "-" + (currentIndex);
				} else {
					string = $(this).attr("id") + "-" + (currentIndex);
				}

				$(settings.target).attr("class", settings.defaultClass + " " + string);

				$(settings.content[$(this).index()]).index();

				if (settings.targetData) {
					$(settings.target).attr('data-value', currentIndex);
				}

				/* INDIVIDUAL CASE! JUST FOR TEST! IGNORE THE NEXT IF, PLEASE >< */

				/* TODO */


				var response = {
					comment: 'Novo teste',
					place: 'mr rango',
					service: 1,
					vote: $(settings.target).attr('data-value')
				};

				senseResponses.push(response);

				setTimeout(function(){
					$(settings.target).attr("class", settings.defaultClass);
					$(settings.target).attr("data-value", "");

					currentIndex = $(this).index();
				}, 4000);

			}

		});
	}


}(jQuery));

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