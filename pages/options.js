"use strict";
(function(){
const saveOptions = e => {
	e.preventDefault();
	browser.storage.local.set({
		proxy1: document.querySelector("#proxy1").value,
		proxy2: document.querySelector("#proxy2").value,
		proxy3: document.querySelector("#proxy3").value,
		proxy4: document.querySelector("#proxy4").value,
		proxy5: document.querySelector("#proxy5").value,
		togglestate1: document.querySelector("#togglestate1").value,
		togglestate2: document.querySelector("#togglestate2").value,
	});
};

const setCurrentProxy1 = result => document.querySelector("#proxy1").value = result.proxy1 || "";
const setCurrentProxy2 = result => document.querySelector("#proxy2").value = result.proxy2 || "";
const setCurrentProxy3 = result => document.querySelector("#proxy3").value = result.proxy3 || "";
const setCurrentProxy4 = result => document.querySelector("#proxy4").value = result.proxy4 || "";
const setCurrentProxy5 = result => document.querySelector("#proxy5").value = result.proxy5 || "";
const setCurrentToggle1 = result => document.querySelector("#togglestate1").value = result.togglestate1 || "";
const setCurrentToggle2 = result => document.querySelector("#togglestate2").value = result.togglestate2 || "";
const onError = error => console.log(`Error: ${error}`);
const restoreProxySettings = () => {
	browser.storage.local.get("proxy1").then(setCurrentProxy1, onError);
	browser.storage.local.get("proxy2").then(setCurrentProxy2, onError);
	browser.storage.local.get("proxy3").then(setCurrentProxy3, onError);
	browser.storage.local.get("proxy4").then(setCurrentProxy4, onError);
	browser.storage.local.get("proxy5").then(setCurrentProxy5, onError);
	browser.storage.local.get("togglestate1").then(setCurrentToggle1, onError);
	browser.storage.local.get("togglestate2").then(setCurrentToggle2, onError);
	document.querySelector("form").addEventListener("submit", saveOptions);
	document.querySelector('form button').disabled = false;
};
document.addEventListener("DOMContentLoaded", restoreProxySettings);
})();
