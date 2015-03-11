/**
 * Villa Distinct v0.8.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

+function ($) {
	'use strict';

	/* Constructor of distinct functions */
	$.fn.distinct = function (options) {

		var settings = $.extend({
			action: false,
			content: "",
			defaultClass: "",
			selfAction: false,
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

			/* TODO - Remove Class */
			/* TODO - Add class */

			// Test if exists some self action
			if (settings.selfAction) selfAction(this);

			doDistinct(this);

		}

		// Self Action Controller
		function selfAction(el) {

			// init the self array
			var self = Array();

			// Find a index number at selfAction array and put on array 'self'
			// Obs: test for a fastest method to loop the array using the 'l' var
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
				// Test if will pass the element (this) parameter
				// at function (self.action)
				if (self[i].passParam) self[i].action(el); else self[i].action();
			}

		}

		function doDistinct(el) {

			// Init vars 'attr' and 'value'
			var attr, value;

			// Get name of the attr based on attrName var of Settings Object
			attr = settings.attrName;

			// Get value based on currentIndex and plusOne vars of Settings Object
			value = currentIndex;
			if (settings.plusOne) value++;

			// Update value based on starName var of Settings Object
			if (settings.startName) value = settings.startName + '-' + value;

			$(settings.target).attr(attr, value);

		}

	}

}(jQuery);

/* external funcs */

// Return position (x or y) of element
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

// get scroll position from top
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

// removes class with prefix
jQuery.fn.removeClassLike = function (prefix) {
	var classes = this.attr("class").split(" ").filter(function (c) {
		return c.lastIndexOf(prefix, 0) !== 0;
	});
	return this.attr("class", classes.join(" "));
}