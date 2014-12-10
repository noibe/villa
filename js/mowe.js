/*!
 * Villa Mowe v0.1.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){ window.isMobile = true; } else { window.isMobile = false; }

if(window.innerWidth > 768) {
	document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 60) + "px";
} else {
	document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 120) + "px";
}

window.onresize = function() {
	if(window.innerWidth > 768) {
		document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 60) + "px";
	} else {
		document.getElementsByClassName('hero')[0].style.height = (window.innerHeight - 120) + "px";
	}
};


window.onscroll = function (event) {
	if (!window.isMobile) {
		if ((window.pageYOffset || doc.scrollTop) > (window.innerHeight - 64)) {
			if (!$('.navbar').hasClass('white')) {
				$('.navbar').addClass('white');
			}
		} else {
			if ($('.navbar').hasClass('white')) {
				$('.navbar').removeClass('white');
			}
		}
	}
};

$('.wow').click(function() {
	if(!$(this).hasClass('show')) {
		$(this).addClass('show');
	} else {
		$(this).removeClass('show');
	}
});

$('.navbar header .toggle').click(function() {
	console.log($(this).closest('.navbar').find('.menu'));
	$(this).closest('.navbar').find('.menu').toggleClass('show');
});

$('.timeline .nav li').click(function () {
	console.log($(this).closest('.timeline').find('.content li').get($(this).index()));
	var index = $(this).index();
	$($(this).closest('.timeline')).attr('class', 'timeline');
	$($(this).closest('.timeline')).addClass('slide-' + index);
})

window.onload = function() {

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

		if (!$('.navbar').hasClass('white')) {
			$('.navbar').addClass('white');
		}
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
};

/* external funcs */

//removes class with prefix
jQuery.fn.removeClassLike = function(prefix){ var classes = this.attr("class").split(" ").filter(function(c) { return c.lastIndexOf(prefix, 0) !== 0; }); return this.attr("class", classes.join(" ")); }
