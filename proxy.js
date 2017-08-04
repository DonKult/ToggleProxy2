"use strict";
let proxyurl;

browser.runtime.onMessage.addListener(msg => {
	if (msg.cmd === 'change')
		proxyurl = msg.proxyurl;
	else
		browser.runtime.sendMessage({cmd: 'log', msg: 'Proxy got unknown message:' + msg});
});

browser.runtime.sendMessage({cmd: "init"});

function FindProxyForURL(url, host) {
	if (proxyurl === undefined)
		return "PROXY something-went-really-wrong:2903";
	return proxyurl;
}
