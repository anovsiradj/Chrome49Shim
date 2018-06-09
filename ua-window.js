/**
* 
* manipulate UA in window.navigator
* 
* Based on injected script to DOM by "User-Agent Switcher for Chrome" extension
* 
* Object.defineProperty(window.navigator, 'name', {
* 	get: function() {
* 		return data;
* 	}
* });
* 
*/

function ua_property(k, v) {
	return "Object.defineProperty(window.navigator, '" + k + "', {get: function() {return '" + v + "';}});";
}

var script = document.createElement('script');

script.text += ';(function(){';
script.text += 'if(' + JSON.stringify(myConfigData.spoof_blacklist_host) + '.indexOf(window.location.hostname) > -1) return;';
script.text += ua_property('userAgent', myConfigData.ua_string);
script.text += ua_property('vendor', myConfigData.ua_vendor);
script.text += ua_property('platform', myConfigData.ua_platform);
script.text += '})();';

if (myConfigData.do_spoof_ua) document.documentElement.appendChild(script);
