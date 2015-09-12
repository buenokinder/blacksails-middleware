var BASEDIR="..";
var scripts;
var scriptIndex = 0;

//LOAD:
function loadDemo() {
	loadJSG(function() {
		loadApp(function() {
			JSG.init(BASEDIR + "/../lib");
			onWindowLoaded();
			JSG.debug.log("loader finished...");
		});
	});
};
function loadJSG(callback) {
	scripts = [];
	scriptIndex = 0;
	scripts.push(BASEDIR + "/../lib/jsg.js");
	load(callback);
}

function loadApp(callback) {
	scripts = [];
	scriptIndex = 0;
	scripts.push(BASEDIR + "/firststeps/firststepsdemo.js");
	load(callback);
}

function load(callback, basedir) {
	doLoad();
	function doLoad() {
		if (scriptIndex < scripts.length) {
			loadScript(scripts[scriptIndex++], doLoad, basedir);
		} else {
			callback();
		}
	}
}
function loadScript(url, callback, basedir) {
	var ref = url;
	if(basedir != undefined) {
		var endswithSlash = basedir.substring(basedir.length - 1, basedir.length ) === "/";
		basedir = endswithSlash ? basedir : basedir + "/";
		ref = basedir + url;
	}
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.charset='UTF-8';
	if (script.readyState) { // IE
		script.onreadystatechange = function() {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { // Others
		script.onload = function() {
			// JSG.debug.log("loaded: "+ref);
			callback();
		};
	}
	script.src = ref;
	document.getElementsByTagName("head")[0].appendChild(script);
}
