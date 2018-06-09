/*
* 
* inject script provided by "polyfill.io"
* 
*/

// create script element ( script src attribute )
function scripte(sourcea) {
	var script = document.createElement('script');
	script.src = sourcea;
	script.async = false;
	script.defer = false;
	return script;
}

// using "s" to avoid redirect (http:// > https://)
var polyfill = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=' +
	encodeURIComponent([
		'default',
		'es5',
		'es6',
		// '...',
	].join()) +
	'&flags=always,gated' +
	'&ua=' + encodeURIComponent(window.navigator.userAgent);

var scripts = [
	polyfill,
	// '...',
];

if (myConfigData.do_inject_shim) {
	scripts.forEach(function(script) {
		document.documentElement.appendChild(scripte(script));
	});
}
