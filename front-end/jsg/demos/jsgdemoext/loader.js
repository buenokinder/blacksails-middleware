var BASEDIR="..";
var JSG_HOME = BASEDIR + "/../lib";
var JSG_LIB = "jsg.js";
var ARAC_HOME = JSG_HOME;
var ARAC_CONFIG = "resources/aracconfig.xml";
var ARAC_LIB = "jsgarac.js";
var APP_LIB = "includes.js";


var scripts;
var scriptIndex = 0;

//LOAD:
function loadDemo() {
	loadEXT(function() {
		loadJSG(function() {
			loadARAC(function() {
				// initialize arac
				var xmlConfig = new window.XMLHttpRequest();
				xmlConfig.open("GET", ARAC_CONFIG, false);
				xmlConfig.send(null);
				ARAC.layout.initDefaultConfigStore();
				ARAC.layout.defaultConfigStore.loadXML(xmlConfig.responseXML.documentElement);
				// go ahead ..
				loadLanguage(function() {
					loadApp(function() {
						JSG.init(JSG_HOME);
						//onWindowLoaded();
						JSG.debug.log("loader finished...");
					});
				});
			});
		});
	});
};

function loadEXT(callback) {
	scripts = [];
	scriptIndex = 0;
    scripts.push("ext/ext-all.js");
	load(callback);
}

function loadJSG(callback) {
	scripts = [];
	scriptIndex = 0;
	scripts.push(JSG_LIB);
	load(callback, JSG_HOME);
}
function loadARAC(callback) {
	scripts = [];
	scriptIndex = 0;
	scripts.push(ARAC_LIB);
	load(callback, ARAC_HOME);
}

function loadLanguage(callback) {
    scripts = [];
    scriptIndex = 0;
    scripts.push("jsgdemoext.js");
    scripts.push("utils/default.js");
    scripts.push("utils/german.js");
    load(callback);
}

function loadApp(callback) {
    var lang = localStorage.getItem('language');
    if (!lang)
        lang = window.navigator.userLanguage || window.navigator.language;
    if (lang)
        JSGDemo.lang = lang;

    lang = getURLParameters('lang');
    if (lang)
        JSGDemo.lang = lang;

    switch (JSGDemo.lang) {
        case "de":
        case "de-CH":
        case "de-AT":
        case "de-DE":
        	JSGDemo.lang = "de";
            JSGDemo.resourceProvider = new JSGDemo.German();
            scripts.push("ext/locale/ext-lang-de.js");
            break;
        default:
            JSGDemo.lang = "en";
            JSGDemo.resourceProvider = new JSGDemo.Default();
            scripts.push("ext/locale/ext-lang-en.js");
            break;
    }

    var activeRepository = getURLParameters('library');
    if (activeRepository != undefined) {
        JSGDemo.activeRepository = activeRepository;
    }

	scripts = [];
	scriptIndex = 0;
	scripts.push(APP_LIB);
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

function getURLParameters(paramName) {
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0) {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);
        var i = 0;
        for ( i = 0; i < arrURLParams.length; i++) {
            var sParam = arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for ( i = 0; i < arrURLParams.length; i++) {
            if (arrParamNames[i] == paramName) {
                return arrParamValues[i];
            }
        }
        return undefined;
    }
}
