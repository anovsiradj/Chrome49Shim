const myConfigData = {
	do_spoof_ua: true,
	do_inject_shim: true,

	ua_string: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
	ua_vendor: 'Google, Inc.',
	ua_platform: 'Windows',

	spoof_blacklist_host: [
		'polyfill.io',
		// 'reddit.com', 'www.reddit.com', // broken
		'mozilla.github.io',
		'youtube.com', 'www.youtube.com',
		'instagram.com', 'www.instagram.com',
		'facebook.com', 'www.facebook.com',
	],
};
