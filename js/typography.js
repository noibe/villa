/*!
 * Villa Typography v2.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

WebFontConfig = {
	google: {
		families: []    // add the fonts families //here
	},
	using: false
};

var WebFontFamilies = [
	{
		className: 'fira-sans',
		displayType: 'sans-serif',
		name: 'Fira Sans',
		properties: 'Fira+Sans:400,300,500,700:latin'
	},
	{
		className: 'fira-sans-italic',
		displayType: 'sans-serif',
		name: 'Fira Sans',
		properties: 'Fira+Sans:400,300,300italic,400italic,500,500italic,700,700italic:latin'
	},
	{
		className: 'fira-mono',
		displayType: 'monospace',
		name: 'Fira Mono',
		properties: 'Fira+Mono:400,700:latin'
	},
	{
		className: 'lato',
		displayType: 'sans-serif',
		name: 'Lato',
		properties: 'Lato:400,300,600,700,800:latin'
	},
	{
		className: 'open-sans',
		displayType: 'sans-serif',
		name: 'Open Sans',
		properties: 'Open+Sans:400,300,600,700,800:latin'
	},
	{
		className: 'open-sans-italic',
		displayType: 'sans-serif',
		name: 'Open Sans',
		properties: 'Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700,800,800italic:latin'
	},
	{
		className: 'roboto',
		displayType: 'sans-serif',
		name: 'Roboto',
		properties: 'Roboto:400,300,600,700,800:latin'
	}
];

var hasWebFont = function (a) {
	return !!document.getElementsByClassName(a.className).length;
};

var insertWebFontRule;
insertWebFontRule = function(wf) {

	var styles = [
		['.' + wf.className,
			['font-family', wf.name + ', ' + wf.displayType]
		]
	];

	addStylesheetRules(styles);

};

var getGoogleWebFontApi = function () {

	var wf, s;

	wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';

	s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);

};

var getWebFont;
getWebFont = function () {

	for (var i = WebFontFamilies.length; i--;)
		if (hasWebFont(WebFontFamilies[i])) {
			WebFontConfig.google.families.push(WebFontFamilies[i].properties);
			WebFontConfig.using = true;
			insertWebFontRule(WebFontFamilies[i]);
		}

	if (WebFontConfig.using) getGoogleWebFontApi();

};