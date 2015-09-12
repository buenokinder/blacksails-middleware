/**
 * A JavaScript Graph Library
 * @author Tensegrity Software GmbH
 * @link   http://www.js-graph.com/
 * @license Copyright Tensegrity Software GmbH. Use and distribution currently only with the consent of Tensegrity Software GmbH! Please read and
 * follow the license agreement provided with this distribution. If there are any questions regarding the software license, please contact us. 
 * Ext.ux.grid.property.Grid: Author Harald Hanek (c) 2011-2012, License http://harrydeluxe.mit-license.org
 */

Ext.onReady(function() {
    JSG.graphItemFactory = new JSGDemo.graph.model.GraphItemFactory();
    JSG.layoutFactory = new JSGDemo.graph.layout.LayoutManager();

    JSGDemo.libraries = new JSGDemo.model.Libraries();
    JSGDemo.libraries.load();

    JSGDemo.viewport = Ext.create('JSGDemo.view.Viewport', {renderTo : Ext.getBody()});
    JSGDemo.viewport.show();
    JSGDemo.viewport.initApplication();

    if (localStorage.getItem('repository') == undefined) 
        JSGDemo.samples.General.createRepository();

    var file = getURLParameters('drawing');
    if (file != undefined) {
        var id = JSGDemo.viewport.getIdByName(file);
        if (id) {
            JSGDemo.viewport.setActiveEditorById(id);
        }
    }
    var element = document.getElementById('loading');
    element.parentNode.removeChild(element);
});

onbeforeunload = function() {
    var ret = undefined;

    var tabs = Ext.getCmp('center');
    if (!tabs)
        return undefined;

    tabs.items.each(function(tab) {
        if (tab.jsgEditor.getGraph().isChanged()) {
             ret = JSGDemo.resourceProvider.getString("You are about to leave this page. There are unsaved Changes. These will be lost, if you leave the page without saving."); 
        }        
    });
    
    return ret; 
};

