/*
manipulate UA in window.navigator
*/

// Based on injected script to DOM by "User-Agent Switcher for Chrome" extension
/*
Object.defineProperty(window.navigator, 'id', {
	get: function() {
		return data;
	}
});
*/

function scriptx(id, data) {
	script.text += "Object.defineProperty(window.navigator, '" + id + "', {get: function() {return '" + data + "';}});";
}

var script = document.createElement('script');


script.text += ';(function(){';
script.text += 'if('+ JSON.stringify(myConfigData.spoof_blacklist_host) + '.indexOf(location.hostname) > -1) return;';
scriptx('userAgent', myConfigData.ua_string);
scriptx('vendor', myConfigData.ua_vendor);
scriptx('platform', myConfigData.ua_platform);
script.text += '})();';

if (myConfigData.do_spoof_ua) document.documentElement.appendChild(script);
