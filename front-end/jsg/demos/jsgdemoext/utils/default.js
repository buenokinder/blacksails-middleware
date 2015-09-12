JSGDemo.namespace("JSGDemo");

/**
 * @class JSGDemo.Default
 *
 * Description
 * 
 * # Usage:
 *
 * @constructor
 * 
 */

JSGDemo.Default = function() {
    this.strings = [];
    this.strings["Edit Points Menu"] = "Edit Points"; 
};

JSGDemo.Default.prototype.getString = function(id) {
    var string = this.strings[id];
    
    if (string == undefined)
        return id;
        
    return string;
};
