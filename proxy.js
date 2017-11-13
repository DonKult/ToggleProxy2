"use strict";
let proxyurl;

browser.runtime.onMessage.addListener(msg => {
	if (msg.cmd === 'change')
		proxyurl = msg.proxyurl;
	else
		browser.runtime.sendMessage({cmd: 'log', msg: 'Proxy script got unknown message:' + msg});
});

browser.runtime.sendMessage({cmd: "init"});

const exactHostnames = [
	'localhost', '127.0.0.1', '0.0.0.0',
	'fritz.box', 'openwrt', 'lede',
];
const startsWithHostnames = [
	'192.168.1',
];
const endsWithHostnames = [
	'.lan',
];

function FindProxyForURL(url, host) {
	if (exactHostnames.includes(host) || startsWithHostnames.some(h => host.startsWith(h)) ||
		endsWithHostnames.some(h => host.endsWith(h)))
		return [{ type: 'direct', host: '', port: '' }];
	if (proxyurl === undefined)
		return "PROXY something-went-really-wrong:2903";
	return proxyurl;
}
