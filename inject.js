/*
* 
* inject script provided by "polyfill.io"
* 
*/

// create script(src)
function scripte(src_href) {
	var script = document.createElement('script');
	script.setAttribute('crossorigin', 'anonymous');
	script.setAttribute('src', src_href);
	script.async = false;
	script.defer = false;
	return script;
}

// using "s" to avoid redirect (http:// > https://)
var polyfill = 'https://cdn.polyfill.io/v3/polyfill.min.js?features=' +
	window.encodeURIComponent([
		'default',
		'es5',
		'es6',
		'es7',
		// '...',
	].join()) +
	'&flags=always,gated' +
	'&ua=' + window.encodeURIComponent(window.navigator.userAgent);

var scripts = [
	polyfill,
	// '...',
];

if (myConfigData.do_inject_shim) {
	scripts.forEach(function(script) {
		document.documentElement.appendChild(scripte(script));
	});
}
