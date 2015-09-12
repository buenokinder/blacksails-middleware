/**
 * @module JSGDemo.graph.model
 * @namespace JSGDemo.graph.model
 */
JSGDemo.namespace("JSGDemo.graph.model");

/**
 * The GraphItemFactory provides custom shapes. Here we use the model objects and relations defined
 * in the methods.
 * 
 * @class GraphItemFactory
 * @constructor
 */
JSGDemo.graph.model.GraphItemFactory = function() {
    JSGDemo.graph.model.GraphItemFactory._super.constructor.apply(this, arguments);
};
JSG.extend(JSGDemo.graph.model.GraphItemFactory, JSG.graph.model.GraphItemFactory);

JSGDemo.graph.model.GraphItemFactory.prototype.createItemFromString = function(typeStr) {
    
	var ret = JSGDemo.graph.model.GraphItemFactory._super.createItemFromString.call(this, typeStr);

	return ret;
};

JSGDemo.graph.model.GraphItemFactory.prototype.createShape = function(name) {
    var result;

    var symbol = JSGDemo.libraries.symbols.get(name);
    if (!symbol.nodeXML)
        return undefined;
                
    if (symbol.nodeXML.nodeName == "graphitem") {
        var type = symbol.nodeXML.getAttribute('type');

        var graphItem = JSG.graphItemFactory.createItemFromString(type);
        if (graphItem) {

            graphItem.readXML(symbol.nodeXML);
            var text = graphItem.getTextSubItem();
            if (text)
                text.setText(symbol.label);
            graphItem.evaluate();
            
            // reset id, to allow creation of a new id
            graphItem.setId(undefined);
            
            result = [];
            result.push(graphItem);
        }
    }

    return result;
};

JSGDemo.graph.model.GraphItemFactory.prototype.getFriends = function(item) {

    return [];
};

JSGDemo.graph.model.GraphItemFactory.prototype.isValidSubItem = function(item, containerType) {

    return true;
};

JSGDemo.graph.model.GraphItemFactory.prototype.getCommandButtons = function(item) {
    switch (item.getType().getValue()) {
        case "orgperson":
            var commands = [];
            // add command buttons for orgchart        
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDSIBLINGBEFORE, 
                JSG.graph.view.selection.CommandButton.Position.LEFT | JSG.graph.view.selection.CommandButton.Position.MIDDLE,  
                "resources/icons/orgsiblingbefore.png", "orgperson"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDSIBLINGAFTER,
                JSG.graph.view.selection.CommandButton.Position.RIGHT | JSG.graph.view.selection.CommandButton.Position.MIDDLE,  
                "resources/icons/orgsiblingafter.png", "orgperson"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDCHILD, 
                JSG.graph.view.selection.CommandButton.Position.CENTER | JSG.graph.view.selection.CommandButton.Position.BOTTOM,  
                "resources/icons/orgchild.png", "orgperson"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDCHILD, 
                JSG.graph.view.selection.CommandButton.Position.RIGHT | JSG.graph.view.selection.CommandButton.Position.BOTTOM,  
                "resources/icons/orgassistant.png", "orgassistent"));
            // commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDPARENT, 
                // JSG.graph.view.selection.CommandButton.Position.CENTER | JSG.graph.view.selection.CommandButton.Position.TOP,  
                // "resources/icons/orgparent.png", "orgperson"));
            return commands;
        case "orgmanager":
            var commands = [];
            // add command buttons for orgchart        
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDSIBLINGBEFORE, 
                JSG.graph.view.selection.CommandButton.Position.LEFT | JSG.graph.view.selection.CommandButton.Position.MIDDLE,  
                "resources/icons/orgsiblingbefore.png", "orgmanager"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDSIBLINGAFTER,
                JSG.graph.view.selection.CommandButton.Position.RIGHT | JSG.graph.view.selection.CommandButton.Position.MIDDLE,  
                "resources/icons/orgsiblingafter.png", "orgmanager"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDCHILD, 
                JSG.graph.view.selection.CommandButton.Position.CENTER | JSG.graph.view.selection.CommandButton.Position.BOTTOM,  
                "resources/icons/orgchild.png", "orgperson"));
            commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDCHILD, 
                JSG.graph.view.selection.CommandButton.Position.RIGHT | JSG.graph.view.selection.CommandButton.Position.BOTTOM,  
                "resources/icons/orgassistant.png", "orgassistent"));
            // commands.push(new JSG.graph.view.selection.CommandButton(JSG.graph.view.selection.CommandButton.Type.ADDPARENT, 
                // JSG.graph.view.selection.CommandButton.Position.CENTER | JSG.graph.view.selection.CommandButton.Position.TOP,  
                // "resources/icons/orgparent.png", "orgmanager"));
            return commands;
    }
    
    return [];
};
