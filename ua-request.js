/*
manipulate UA on http request header.
*/

// console.log(location);

if (myConfigData.do_spoof_ua) {
	chrome.webRequest.onBeforeSendHeaders.addListener(
		function(details) {
			// [skip-default] chrome newtab
			if (details.tabId === -1) return;
			// [skip] blacklist website
			if (myConfigData.spoof_blacklist_host.indexOf((new URL(details.url)).hostname) > -1) return;

			var ua_index = -1;
			for (var i = 0; i < details.requestHeaders.length; i++) {
				if (details.requestHeaders[i].name === 'User-Agent') {
					ua_index = i;
					break;
				}
			}

			if (ua_index > -1) {
				details.requestHeaders.splice(ua_index, 1);
			}

			details.requestHeaders.push({
				name: 'User-Agent',
				value: myConfigData.ua_string
			});

			return {
				requestHeaders: details.requestHeaders
			};
		},
		{
			urls: [
				"http://*/*",
				"https://*/*"
			]
		},
		[
			'blocking',
			'requestHeaders'
		]
	);
}
