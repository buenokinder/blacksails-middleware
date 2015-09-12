//OUR GLOBAL DEMO OBJECT
var JSGDemo = JSGDemo || {};

JSGDemo.namespace = function(namespace) {
	var delimiter = ".";
	var parent = JSGDemo,
		parts = namespace.split(delimiter),
		index;
	for (index = (parts[0] === "JSGDemo") ? 1 : 0; index < parts.length; index += 1) {
		if (typeof parent[parts[index]] === "undefined") {
			parent[parts[index]] = {};
		}
		parent = parent[parts[index]];
	}
	return parent;
};

JSGDemo.navigator = undefined;
JSGDemo.resourceProvider = undefined;
JSGDemo.ui = "editortoolbar";
JSGDemo.uiColor = "gray";
JSGDemo.uiTitle = "#666666";
JSGDemo.activeRepository = undefined;
JSGDemo.libraries = new JSG.commons.Map();
JSGDemo.lang = 'en';

JSGDemo.getNewId = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                                return v.toString(16);
                            });
};
