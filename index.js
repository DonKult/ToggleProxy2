"use strict";
const NAME = require("./package.json").title;
const NAME_low = NAME.toLowerCase();
const PROXY_TYPE = 'network.proxy.type';

const getTypeIcon = type => {
	switch (type) {
		case 0: return './noproxy.png';
		case 1: return './manual.png';
		case 2: return './url.png';
		case 4: return './auto.png';
		case 5: return './system.png';
		default: console.error('Unsupported proxy type ' + type + ' configured!');
	}
	return '';
};

const pref = require("sdk/preferences/service");
const simplepref = require('sdk/simple-prefs');
const { ActionButton } = require("sdk/ui");
const button = ActionButton({
	id: NAME_low,
	label: NAME,
	icon: getTypeIcon(pref.get(PROXY_TYPE)),
	onClick: (state) => {
		let type = pref.get(PROXY_TYPE);
		const toggleOne = simplepref.prefs['toggleone'];
		const toggleTwo = simplepref.prefs['toggletwo'];
		if (type == toggleOne)
			type = toggleTwo;
		else
			type = toggleOne;
		button.state(button, { "icon": getTypeIcon(type) });
		pref.set(PROXY_TYPE, type);
	}
});
