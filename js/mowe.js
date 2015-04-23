/*!
 * Villa Mowe v0.1.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var emailService = 'eduardo@noibe.com';
var emailServiceCount = 4;
var emailServiceClickCount = 8;

$('#prices-scroll').click(function () {
	$("html, body").animate({
		scrollTop: $('#prices').offset().top
	}, '1200'
	);
});

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

window.onload = function () {

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

	/* CONTACT FUNCTIONS START HERE */

	// Append forms
	var contactForm = '<a class="action user-unselect cursor-pointer" data-toggle="contact-form">Assine Já</a>' +
		'<input type="date" class="contact-form" name="name" placeholder="Nome" autocomplete="off"/>' +
		'<input type="tel" class="contact-form" name="phone" placeholder="Telefone (apenas números)" autocomplete="off" maxlength="11"/>' +
		'<input type="submit" class="contact-form action send user-unselect cursor-pointer" value="Solicitar Contato!"/>' +
		'<span class="action sent">Obrigado! :D<br/>Entraremos em contato em breve!</span>' +
		'<span class="action not-sent">Ops! :(<br/>Houve algum problema! Tente novamente mais tarde!</span>';

	$('.pricelist .content > li').insertHTML(contactForm);

	// Add mask to phone fields
	//$('.pricelist .content > li [name=phone]').mask('(99) 999999999');

	// Active form
	$('.pricelist .content > li [data-toggle=contact-form]').click(function() {
		// Remove Success and Fail class and fix de title
		$('.pricelist .content > .success').removeClass('success').
			find('[data-toggle=contact-form]').
			html('Assine Já');
		$('.pricelist .content > .fail').removeClass('fail').
			find('[data-toggle=contact-form]').
			html('Assine Já');

		// Get the Parent and some possible element with form enabled
		var a = $(this).parent(), b, c;

		// If the current element has active, disable it
		if ($(a).hasClass('active-form')) {
			$(a).removeClass('active-form');
			// Fix the title of button
			$(a).find('[data-toggle=contact-form]').html('Assine Já');
			b = true;
		}

		// Disable the form of any element with form enabled
		c = $('.pricelist .content > .active-form');
		if (c.length) {
			$(c).removeClass('active-form');
			// Fix the title of button of enabled itens
			$(c).find('[data-toggle=contact-form]').html('Assine Já');
		}

		// IF var b is ok, enable the form of current element
		if (!b) {
			// Enable the form of current element
			$(a).addClass('active-form');

			// Add the fallback to title of button
			$(this).html('Voltar');

			$(a).find('[name=name]').focus();
		}

	});

	// Send response to server
	$('.pricelist .content > li .send').click(function() {
		// Test number of clicks to request (MAX = 4)
		if (emailServiceClickCount > 0) {
			var a = $(this).parent();
			var aa = $(a).find('[name=name]').val();
			var ab = $(a).find('[name=phone]').val();

			// Test if fields are null
			if ((aa.length > 0) && (ab.length > 0)) {
				emailServiceClickCount--;
				var b = $(a).parent().parent();
				var	c = {
					name: aa,
					phone: ab,
					product: $(a).find('.title').html(),
					reference: $(b).attr('data-product-reference'),
					mail: emailService
				};
				// Test number of requests (MAX = 4)
				if (emailServiceCount > 0) {
					$.ajax({
						cache: false,
						data: c,
						fail: function(data) {
							$(a).removeClass('active-form');
							$(a).addClass('fail');
						},
						success: function(data) {
							$(a).removeClass('active-form');
							$(a).addClass('success');
							emailServiceCount--;
						},
						url: '/api/wtal/'
					});
				} else {
					$(a).removeClass('active-form');
					$(a).addClass('fail');
				}
			} else {
				console.log('algum erro');
			}
		} else {
			$(a).removeClass('active-form');
			$(a).addClass('fail');
		}
	});

	/* CONTACT FUNCTIONS ENDS HERE */

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

	/* Insert HTML content to element */
	$.fn.insertHTML = function (content) {
		for(var a = this.length; a--; ) {
			this[a].innerHTML += content;
		}
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

// jquery.maskedinput  (https://github.com/digitalBush/jquery.maskedinput)
function getPasteEvent(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var pasteEventName=getPasteEvent()+".mask",ua=navigator.userAgent,iPhone=/iphone/i.test(ua),android=/android/i.test(ua),caretTimeoutId;$.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},$.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(e,t){var n,a,r,i,o,c;return!e&&this.length>0?(n=$(this[0]),n.data($.mask.dataName)()):(t=$.extend({placeholder:$.mask.placeholder,completed:null},t),a=$.mask.definitions,r=[],i=c=e.length,o=null,$.each(e.split(""),function(e,t){"?"==t?(c--,i=e):a[t]?(r.push(new RegExp(a[t])),null===o&&(o=r.length-1)):r.push(null)}),this.trigger("unmask").each(function(){function n(e){for(;++e<c&&!r[e];);return e}function l(e){for(;--e>=0&&!r[e];);return e}function s(e,a){var i,l;if(!(0>e)){for(i=e,l=n(a);c>i;i++)if(r[i]){if(!(c>l&&r[i].test(g[l])))break;g[i]=g[l],g[l]=t.placeholder,l=n(l)}m(),v.caret(Math.max(o,e))}}function u(e){var a,i,o,l;for(a=e,i=t.placeholder;c>a;a++)if(r[a]){if(o=n(a),l=g[a],g[a]=i,!(c>o&&r[o].test(l)))break;i=l}}function d(e){var t,a,r,i=e.which;8===i||46===i||iPhone&&127===i?(t=v.caret(),a=t.begin,r=t.end,r-a===0&&(a=46!==i?l(a):r=n(a-1),r=46===i?n(r):r),h(a,r),s(a,r-1),e.preventDefault()):27==i&&(v.val(k),v.caret(0,p()),e.preventDefault())}function f(e){var a,i,o,l=e.which,d=v.caret();e.ctrlKey||e.altKey||e.metaKey||32>l||l&&(d.end-d.begin!==0&&(h(d.begin,d.end),s(d.begin,d.end-1)),a=n(d.begin-1),c>a&&(i=String.fromCharCode(l),r[a].test(i)&&(u(a),g[a]=i,m(),o=n(a),android?setTimeout($.proxy($.fn.caret,v,o),0):v.caret(o),t.completed&&o>=c&&t.completed.call(v))),e.preventDefault())}function h(e,n){var a;for(a=e;n>a&&c>a;a++)r[a]&&(g[a]=t.placeholder)}function m(){v.val(g.join(""))}function p(e){var n,a,l=v.val(),s=-1;for(n=0,pos=0;c>n;n++)if(r[n]){for(g[n]=t.placeholder;pos++<l.length;)if(a=l.charAt(pos-1),r[n].test(a)){g[n]=a,s=n;break}if(pos>l.length)break}else g[n]===l.charAt(pos)&&n!==i&&(pos++,s=n);return e?m():i>s+1?(v.val(""),h(0,c)):(m(),v.val(v.val().substring(0,s+1))),i?n:o}var v=$(this),g=$.map(e.split(""),function(e){return"?"!=e?a[e]?t.placeholder:e:void 0}),k=v.val();v.data($.mask.dataName,function(){return $.map(g,function(e,n){return r[n]&&e!=t.placeholder?e:null}).join("")}),v.attr("readonly")||v.one("unmask",function(){v.unbind(".mask").removeData($.mask.dataName)}).bind("focus.mask",function(){clearTimeout(caretTimeoutId);var t;k=v.val(),t=p(),caretTimeoutId=setTimeout(function(){m(),t==e.length?v.caret(0,t):v.caret(t)},10)}).bind("blur.mask",function(){p(),v.val()!=k&&v.change()}).bind("keydown.mask",d).bind("keypress.mask",f).bind(pasteEventName,function(){setTimeout(function(){var e=p(!0);v.caret(e),t.completed&&e==v.val().length&&t.completed.call(v)},0)}),p()}))}});