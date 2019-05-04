/**
* 
* manipulate UserAgent on HTTP header.
* 
*/

if (myConfigData.do_spoof_ua) {
	chrome.webRequest.onBeforeSendHeaders.addListener(
		function(details) {
			if (myConfigData.spoof_blacklist_host.indexOf((new URL(details.url)).hostname) === -1)
			{
				for (var i = 0; i < details.requestHeaders.length; ++i) {
				  if (details.requestHeaders[i].name === 'User-Agent') {
				    details.requestHeaders.splice(i, 1);
				    break;
				  }
				}
				details.requestHeaders.push({
					name: 'User-Agent',
					value: myConfigData.ua_string,
				});
			}

			return {
				requestHeaders: details.requestHeaders,
			};
		},
		{
			urls: [
				"http://*/*",
				"https://*/*",
			],
		},
		[
			'blocking',
			'requestHeaders',
		]
	);
}
