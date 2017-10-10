"use strict";
let proxyurl;

browser.runtime.onMessage.addListener(msg => {
	if (msg.cmd === 'change')
		proxyurl = msg.proxyurl;
	else
		browser.runtime.sendMessage({cmd: 'log', msg: 'Proxy script got unknown message:' + msg});
});

browser.runtime.sendMessage({cmd: "init"});

function FindProxyForURL(url, host) {
	if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.lan'))
		return [{ type: 'direct', host: '', port: '' }];
	if (proxyurl === undefined)
		return "PROXY something-went-really-wrong:2903";
	return proxyurl;
}
