function dom_script(script_src) {
	var script = document.createElement('script');
	script.src = script_src;
	script.async = false;
	script.defer = false;
	return script;
}
function dom_inject(element) {
	document.documentElement.appendChild(element);
}

var polyfill_io = [
	'default',
	'es5',
	'es6',
	// 'String.prototype.padStart',
	// 'String.prototype.padEnd',
	// 'Object.entries',
	// 'Object.values',
	// 'HTMLCanvasElement.prototype.toBlob',
	// 'NodeList.prototype.@@iterator',
	// 'IntersectionObserver',
	// 'Promise.prototype.finally',
	// 'console.exception',
	// 'URL', // Partially in Chrome 49 (only URL.searchParams is missing - i think prefer direct polyfill)
	// 'setImmediate', // (Non Standard - IE/Edge only),
];
/*
https://github.com/inexorabletash/polyfill (/url.js) is broken.
url.toString() is return example.com/[object URL] if no url.pathname
*/

// (avoid redirect from http:// to https://)
polyfill_io = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=' + encodeURIComponent(polyfill_io.join() + '|always|gated') + '&ua=' + encodeURIComponent(window.navigator.userAgent);

var scripts = [
	// already by provided polyfill.io
	// '//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-shim.min.js',
	// '//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.3/es6-shim.min.js',
	// '//cdnjs.cloudflare.com/ajax/libs/dom4/1.8.5/dom4.js',
	// '//cdnjs.cloudflare.com/ajax/libs/url-search-params/0.10.0/url-search-params.js', (i dont understand)
	// '//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js',
	// '//yaffle.github.io/date-shim/date-shim.js',

	// '//cdnjs.cloudflare.com/ajax/libs/custom-elements/1.0.0/custom-elements.min.js',
	// '//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.7.0/document-register-element.js',

	/*
	after some trials-and-errors, this scripts make thing worse. i dont know why. specially on github.com.
	*/
	// '//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.5/webcomponents-lite.js',
	// '//cdnjs.cloudflare.com/ajax/libs/custom-elements/1.0.0/custom-elements.min.js', // (ignore warning - it's ok)
];

if (myConfigData.do_inject_shim) {
	dom_inject(dom_script(polyfill_io));

	scripts.forEach(function(script) {
		dom_inject(dom_script(script));
	});
}
