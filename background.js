"use strict";

browser.proxy.register('proxy.js');
browser.proxy.onProxyError.addListener(error => {
	console.error(`Proxy error: ${error.message}`);
});


let togglebuttonclicked = false;
let togglestate1 = '';
let togglestate2 = '';

const onError = error => console.log(`Error: ${error}`);
const setBrowserActionIcon = () => {
	let icon;
	if (togglebuttonclicked)
		icon = togglestate2;
	else
		icon = togglestate1;
	if (icon === '1')
		browser.browserAction.setIcon({path: "/data/noproxy.png"});
	else if (icon === '2')
		browser.browserAction.setIcon({path: "/data/manual.png"});
	else if (icon === '3')
		browser.browserAction.setIcon({path: "/data/auto.png"});
	else if (icon === '4')
		browser.browserAction.setIcon({path: "/data/system.png"});
	else if (icon === '5')
		browser.browserAction.setIcon({path: "/data/url.png"});
};
const sendToProxyScript = url => {
	browser.runtime.sendMessage({'cmd': 'change', 'proxyurl': url }, {toProxyScript: true}).then(setBrowserActionIcon, onError);
};
const setCurrentToggle1 = result => {
	togglestate1 = result.togglestate1 || "1";
	browser.storage.local.get('proxy' + togglestate1).then(result => sendToProxyScript(result['proxy' + togglestate1]), onError);
};
const setCurrentToggle2 = result => togglestate2 = result.togglestate2 || "2";
const gotInitFromProxy = () => {
	browser.storage.local.get("togglestate1").then(setCurrentToggle1, onError);
	browser.storage.local.get("togglestate2").then(setCurrentToggle2, onError);
	browser.storage.onChanged.addListener(changes => {
		let changed = false;
		if (changes.togglestate1 !== undefined) {
			togglestate1 = changes.togglestate1.newValue;
			changed = true;
		}
		if (changes.togglestate2 !== undefined) {
			togglestate2 = changes.togglestate2.newValue;
			changed = true;
		}
		if (togglebuttonclicked) {
			if (changes['proxy' + togglestate2] !== undefined)
				sendToProxyScript(changes['proxy' + togglestate2].newValue);
			else
				browser.storage.local.get('proxy' + togglestate2).then(result => sendToProxyScript(result['proxy' + togglestate2]), onError);
		} else {
			if (changes['proxy' + togglestate1] !== undefined)
				sendToProxyScript(changes['proxy' + togglestate1].newValue);
			else
				browser.storage.local.get('proxy' + togglestate1).then(result => sendToProxyScript(result['proxy' + togglestate1]), onError);
		}
	});
};
const handleMessage = msg => {
	if (msg.cmd === 'init')
		gotInitFromProxy();
	else if (msg.cmd === 'log')
		console.log(msg.msg);
	else
		console.log("Unknown message recieved", msg);
};
browser.runtime.onMessage.addListener(handleMessage);
browser.browserAction.onClicked.addListener(() => {
	togglebuttonclicked = !togglebuttonclicked;
	if (togglebuttonclicked) {
		browser.storage.local.get('proxy' + togglestate2).then(result => sendToProxyScript(result['proxy' + togglestate2]), onError);
	} else {
		browser.storage.local.get('proxy' + togglestate1).then(result => sendToProxyScript(result['proxy' + togglestate1]), onError);
	}
});
