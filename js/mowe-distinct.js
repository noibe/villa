/*!
 * Villa Mowe Distinct v0.1.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

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

		console.log(this);
		console.log(settings.target);

		var distinctList = new Array();
		var currentIndex;

		$(this).click(function(index) {

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

				if(currentIndex < 3) {

					var url= "http://noibe.com/api/mrfb/index.php";

					$.ajax({
						cache: false,
						data: {
							message: $('.card').attr('data-value'),
							/*garrido_lt@hotmail.com*/
							to: 'eduardo_barros@outlook.com'
						},
						error: function() {
							$('#info').html('<p>An error has occurred</p>');
						},
						success: function(data) {
							console.log(data);
						},
						type: 'GET',
						url: url
					});

				}

			}

		});
	}


}(jQuery));

/* external funcs */

function mrfbSend() {

}

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
