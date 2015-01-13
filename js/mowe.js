/*!
 * Villa Mowe v0.1.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	window.isMobile = true;
} else {
	window.isMobile = false;
}

if (window.innerWidth > 768) {
	document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 60) + "px";
} else {
	document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 120) + "px";
}

window.onresize = function () {
	if (window.innerWidth > 768) {
		document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 60) + "px";
	} else {
		document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 120) + "px";
	}
};

$('.wow').click(function () {
	if (!$(this).hasClass('show')) {
		$(this).addClass('show');
	} else {
		$(this).removeClass('show');
	}
});

$('.navbar header .toggle').click(function () {
	$(this).closest('.navbar').find('.menu').toggleClass('show');
});

$('.timeline .nav li').click(function () {
	$(this).closest('.timeline').find('.content li').get($(this).index());
	var index = $(this).index();
	$($(this).closest('.timeline')).attr('class', 'timeline');
	$($(this).closest('.timeline')).addClass('slide-' + index);
});

window.onload = function () {

	document.getElementById("js-scroll-services").onclick = function fun() {

		var wrapper = document.getElementsByClassName("services")[0]; //get div
		var h = wrapper.getBoundingClientRect(); //get height

		//noinspection JSSuspiciousNameCombination
		scrollTo(h.top);
	};

	document.getElementById("js-scroll-prices").onclick = function fun() {

		var wrapper = document.getElementById("prices"); //get div
		var h = wrapper.getBoundingClientRect(); //get height

		scrollTo(h.top);
	};

	function scrollTo(x) {
		//elapsed
		var e;
		//duration in milli seconds
		var d = 800;
		//b as in begin, where to start (you could get this dynamically)
		var b = document.documentElement.scrollTop;
		//start time, when the animation starts
		var s = (new Date()).getTime(); //start time
		//the magic
		var t = setInterval(function () {
			//calculate elapse time
			e = (new Date()).getTime() - s;
			//check if elapse time is less than duration
			if (e < d) {
				//animate using an easing equation
				window.scrollTo(0, ease(e, b, x, d));
			} else {
				//animation is complete, stop interval timer
				clearInterval(t);
				t = null;
			}
		}, 4);
	}

	//Info about the letters
	//t = elapse time
	//b = where to begin
	//c = change in comparison to begin
	//d = duration of animation
	function noease(t, b, c, d) {
		t /= d;
		return b + c * (t);
	}

	function ease(t, b, c, d) {
		return Math.round(-c * Math.cos(t / d * (Math.PI / 2)) + c + b);
	}

	/* */
	$('.block').scrollList({
		beforePadding: 65,
		startName: "block"
	});

	$('#prices .slide .nav>li').distinct({
		content: $("#prices .slide .content .pricelist"),
		defaultClass: $("#prices").attr("class"),
		startName: "slide",
		target: $("#prices")
	});
};

/* Mowe Distinct v0.1.0 */

(function ($) {

	/* Constructor of distinct functions */
	$.fn.distinct = function (options) {

		var settings = $.extend({
			content: "",
			defaultClass: "",
			startName: "",
			target: "body"
		}, options);

		$(settings.target).addClass("slide-1");

		console.log(this);
		console.log(settings.defaultClass);

		var distinctList = new Array();

		$(this).click(function(index) {
			var string = "";

			if(settings.startName){
				string = settings.startName + "-" + ($(this).index() + 1);
			} else {
				string = $(this).attr("id") + "-" + ($(this).index() + 1);
			}

			$(settings.target).attr("class", settings.defaultClass + " " + string);

			$(settings.content[$(this).index()]).index();

		});
	}

}(jQuery));

/* Mowe ScrollList v1.0.0 */

(function ($) {

	/* Constructor of scrollList functions */
	$.fn.scrollList = function (options) {

		var settings = $.extend({
			beforePadding: 0,
			startName: "",
			target: "body"
		}, options);

		var addressListSettings = {
			beforePadding: settings.beforePadding,
			parent: settings.target,
			startName: settings.startName
		};

		var addressList = $(this).getAddress(addressListSettings);
		var element = this;
		var pastActive;

		$(window).resize(function () {
			addressList = $(element).getAddress(addressListSettings);
		});

		$(window).scroll(function () {
			var active = $(this).getScrollActiveItem(addressList);

			if (active != pastActive) {
				if (!$(settings.target).hasClass(active)) {

					if ($(settings.target).hasClass(pastActive)) {
						$(settings.target).removeClass(pastActive);
					}

					$(settings.target).addClass(active);

					pastActive = active;
				}
			}
		});
	};

	/* Get What Scroll Item is Active */
	$.fn.getScrollActiveItem = function (addressList) {

		var currentLocal;

		for (i = 0; i < addressList.length; i++) {
			if (addressList[i].address < $(window).scrollTop()) {
				currentLocal = addressList[i].name;
			}
		}

		if (currentLocal) {
			return currentLocal;
		} else {
			return null;
		}

	};

	/* Get Address List Function */
	$.fn.getAddress = function (options) {

		//beforePadding attr works now
		//parent attr is nonfunctional (at this version)
		//startName attr is optional
		var settings = $.extend({
			addAddressAttr: true,
			beforePadding: 0,
			parent: "body",
			startName: ""
		}, options);

		//Initializing the address list array
		var addressList = new Array();

		if (!settings.name) {

			this.each(function (index) {

				var name = "";

				if (!settings.startName) {
					//default
					name = $(this).attr("id");
				} else {
					//when a startName attr was declared
					name = settings.startName + "-" + (index + 1);
				}

				//fill the address list
				addressList.push({
					name: name,
					address: this.offsetTop - settings.beforePadding
				});

				if (settings.addAddressAttr) {
					$(this).attr("data-scroll-target", name);
				}

			});

			return addressList;

		};
	}

}(jQuery));




(function ($) {

	/* Constructor of slide functions */
	$.fn.scrollList = function (options) {

		var settings = $.extend({
			beforePadding: 0,
			startName: "",
			target: "body"
		}, options);

		var addressListSettings = {
			beforePadding: settings.beforePadding,
			parent: settings.target,
			startName: settings.startName
		};

		var addressList = $(this).getAddress(addressListSettings);
		var element = this;
		var pastActive;

		$(window).resize(function () {
			addressList = $(element).getAddress(addressListSettings);
		});

		$(window).scroll(function () {
			var active = $(this).getScrollActiveItem(addressList);

			if (active != pastActive) {
				if (!$(settings.target).hasClass(active)) {

					if ($(settings.target).hasClass(pastActive)) {
						$(settings.target).removeClass(pastActive);
					}

					$(settings.target).addClass(active);

					pastActive = active;
				}
			}
		});
	};



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
