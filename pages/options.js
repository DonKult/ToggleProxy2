"use strict";
(function(){
const PROXY_TYPES = [ 'Ignore', 'Direct', 'HTTP', 'HTTPS', 'SOCKS5', 'SOCKS4', 'SOCKS' ];
const TOGGLE_STATES = 2;
const PROXY_SETS = [
	'/data/noproxy.png',
	'/data/manual.png',
	'/data/auto.png',
	'/data/system.png',
	'/data/url.png',
];


const range = (a,b) => [...Array((b-a)+1).keys()].map(i => i + a);
const onError = error => console.log(`Error: ${error}`);
const saveOptions = e => {
	e.preventDefault();
	range(1, PROXY_SETS.length).map(i => 'proxy' + i).forEach(id => {
		let o = {};
		o[id] = [{
			type: document.getElementById(id + 'type').value || '',
			host: document.getElementById(id + 'host').value || '',
			port: document.getElementById(id + 'port').value || '',
			proxyDNS: document.getElementById(id + 'proxyDNS').checked ? true : false,
			failoverTimeout: parseInt(document.getElementById(id + 'failoverTimeout').value || 1),
		}];
		browser.storage.local.set(o).catch(onError);
	});
	range(1, TOGGLE_STATES).map(i => 'togglestate' + i).forEach(id => {
		let o = {};
		o[id] = document.getElementById(id).value || '';
		browser.storage.local.set(o).catch(onError);
	});
};
const removeAllChilds = node => {
	while (node.hasChildNodes())
	node.removeChild(node.lastChild);
};
const addSelectField = (config, label, proxyid, nr, type, options) => {
	const id = 'proxy' + proxyid + type;
	let l = document.createElement('label');
	l.setAttribute('for', id);
	l.textContent = label + ':';
	let s = document.createElement('select');
	s.setAttribute('id', id);
	options.forEach(opt => {
		let o = document.createElement('option');
		o.setAttribute('value', opt.toLowerCase());
		if (config['proxy' + proxyid] !== undefined &&
			config['proxy' + proxyid][nr] !== undefined &&
			config['proxy' + proxyid][nr][type] === opt.toLowerCase())
			o.setAttribute('selected', 'true');
		o.textContent = opt;
		s.appendChild(o);
	});
	l.appendChild(s);
	return l;
};
const addInputTextField = (config, label, proxyid, nr, type) => {
	const id = 'proxy' + proxyid + type;
	let l = document.createElement('label');
	l.setAttribute('for', id);
	l.textContent = label + ':';
	let i = document.createElement('input');
	i.setAttribute('type', 'text');
	i.setAttribute('id', id);
	if (config['proxy' + proxyid] !== undefined &&
		config['proxy' + proxyid][nr] !== undefined &&
		config['proxy' + proxyid][nr][type] !== undefined)
		i.setAttribute('value', config['proxy' + proxyid][nr][type]);
	l.appendChild(i);
	return l;
};
const addInputCheckField = (config, label, proxyid, nr, type) => {
	const id = 'proxy' + proxyid + type;
	let l = document.createElement('label');
	l.setAttribute('for', id);
	l.textContent = label + ':';
	let i = document.createElement('input');
	i.setAttribute('type', 'checkbox');
	i.setAttribute('id', id);
	if (config['proxy' + proxyid] !== undefined &&
		config['proxy' + proxyid][nr] !== undefined &&
		config['proxy' + proxyid][nr][type] === true)
		i.setAttribute('checked', 'true');
	l.appendChild(i);
	return l;
};
const setCurrentProxies = config => {
	let proxysets = document.getElementById('proxysets');
	removeAllChilds(proxysets);
	range(1, PROXY_SETS.length).forEach(i => {
		if (config['proxy' + i] === undefined)
			return;
		let proxylist = document.createElement('div');
		proxylist.style.border = '1px solid red';
		let img = document.createElement('img');
		img.src = PROXY_SETS[i - 1];
		proxylist.appendChild(img);
		config['proxy' + i].forEach((v, j) => {
			let proxy = document.createElement('div');
			proxy.style.border = '1px solid black';
			proxy.appendChild(addSelectField(config, 'Proxy type', i, j, 'type', PROXY_TYPES));
			proxy.appendChild(addInputTextField(config, 'Hostname', i, j, 'host'));
			proxy.appendChild(addInputTextField(config, 'Port', i, j, 'port'));
			proxy.appendChild(addInputCheckField(config, 'Use Proxy for DNS', i, j, 'proxyDNS'));
			proxy.appendChild(addInputTextField(config, 'Failover timeout', i, j, 'failoverTimeout'));
			proxylist.appendChild(proxy);
		});
		proxysets.appendChild(proxylist);
	});
};
const setCurrentToggles = config => {
	range(1, TOGGLE_STATES).forEach(i => document.querySelector('#togglestate' + i).value = config['togglestate' + i] || '');
};
const restoreProxySettings = () => {
	document.querySelector("form").addEventListener("submit", saveOptions);
	Promise.all([
		browser.storage.local.get(range(1, PROXY_SETS.length).map(i => "proxy" + i)).then(setCurrentProxies, onError),
		browser.storage.local.get(range(1, TOGGLE_STATES).map(i => "togglestate" + i)).then(setCurrentToggles, onError),
	]).then(() => document.querySelector('form button').disabled = false, onError);
};
document.addEventListener("DOMContentLoaded", restoreProxySettings);
})();
