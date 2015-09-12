/**
 * @module JSGDemo.view
 * @namespace JSGDemo.view
 */
JSG.namespace("JSGDemo.view");

/**
 * Template to define the model tree for the JSGDemo Application. It is simply a Ext JS TreePanel derived class. The ModelTree
 * contains all models organized by folders.
 *
 * @class ModelTree
 * @extends Ext.tree.Panel
 * @constructor
 */
Ext.define('JSGDemo.view.ModelTree', {
    extend : 'Ext.tree.Panel',
    alias : 'widget.modeltree',
    anchor : '100% 66%',
    layout : 'fit',
    id : 'modeltree',
    useArrows : true,
    hideHeaders : true,
    rootVisible : true,
    folderSort : true,
    store : Ext.create('graphitemstore'),
    plugins : Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 2,
        pluginId : 'cellplugin',
        listeners : {
            edit : function(editor, e, eOpts) {
                JSGDemo.modeltree.save();
                JSGDemo.modeltree.getStore().sort([{property : 'leaf', direction : 'ASC'}, {property : 'name', direction : 'ASC'}]);
                if (e.record.tab) {
                    e.record.tab.updateTitle(e.value, true);
                }
            }                    
        }
    }),
    viewConfig : {
        plugins : {
            ptype : 'treeviewdragdrop',
            sortOnDrop : true,
            appendOnly : true
        },
        listeners : {
            drop : function(node, data, overModel, dropPosition) {
                JSGDemo.modeltree.validateTree();
                JSGDemo.modeltree.save();
            }
        }
    },
    contextMenu : new Ext.menu.Menu({
        items : [{
            id : 'createDiagramCX',
            text : JSGDemo.resourceProvider.getString("New Diagram "),
            icon : 'resources/icons/drawing.png'
        }, {
            id : 'createOrgChartCX',
            text : JSGDemo.resourceProvider.getString("New Organizational Chart"),
            icon : 'resources/icons/orgchart.png'
        }, '-', {
            id : 'createFolderCX',
            text : JSGDemo.resourceProvider.getString("New Folder"),
            icon : 'resources/icons/newfolder.png'
        }, '-', {
            id : 'deleteItem',
            text : JSGDemo.resourceProvider.getString("Delete"),
            icon : 'resources/icons/deletesmall.png'
        }],
        listeners : {
            click : function(menu, item) {
                if (item == undefined)
                    return;
                    
                switch (item.id) {
                    case 'deleteItem':
                        JSGDemo.modeltree.deleteModelItem();
                        break;
                    case 'createFolderCX':
                        JSGDemo.modeltree.createModelItem("folder");
                        break;
                    case 'createDiagramCX':
                        JSGDemo.modeltree.createModelItem("diagram");
                        break;
                    case 'createOrgChartCX':
                        JSGDemo.modeltree.createModelItem("orgchart");
                        break;
                }
            }
        }
    }),
    listeners : {
        itemcontextmenu : function(tree, record, item, index, e, eOpts) {
            var c = tree.panel.contextMenu;
            var deleteItem = c.items.get("deleteItem");
            var root = tree.panel.getRootNode();
            deleteItem.setDisabled(record == root);
            c.showAt(e.getXY());
            e.stopEvent();
        },
        afterrender : function(tree, eOpts) {
        },
        itemdblclick : function(tree, model, htmlitem, index, e) {
        },
        selectionchange : function( tree, selected, eOpts ) {
            JSGDemo.toolbar.updateToolbar();
        },
        itemclick :  function(tree, record, item, index, e, eOpts ) {
            if (record.get('leaf')) {
                if (record.tab) {
                    Ext.getCmp('center').setActiveTab(record.tab);
                } else {
                    var tab = JSGDemo.modeltree.createModelEditor(record);
                    if (tab) 
                        tab.load(record);
                }
            }
        }
    },
    columns : [{
        xtype : 'treecolumn', // this is so we know which column will show the tree
        text : JSGDemo.resourceProvider.getString("Name"),
        flex : 1,
        editor : {
            xtype : 'textfield',
            selectOnFocus: true
        },
        sortable : true,
        dataIndex : 'name'
    }],
    /**
     * Save the model tree to the local storage. The tree is saved automatically after any change.
     * The storage info is automatically updated.
     * 
     * @method save
     */
    save : function() {
        var root = this.getRootNode();
        if (!root)
            return;
        var json = root.serialize();
        if (json) 
            localStorage.setItem('repository', JSON.stringify(json));
        
        JSGDemo.viewport.updateStorageInfo();
    },
    /**
     * Load all model items from the localStorage, if any information is present.
     * 
     * @method load
     */
    load : function() {
        var data = localStorage.getItem('repository');
        var store = this.getStore();

        if (data) {
            try {
                var json = JSON.parse(data);        
                store.getProxy().data = json;
                store.load();
                this.validateTree();
            } catch(err) {
//                JSGDemo.viewport.showWarning("Error reading Process Tree: " + err);
                return undefined;
            }
        } else {
//            this.importXML("bicdemo.xml");
        }

        var root = this.getRootNode();
        if (root) {
            if (json)   
                root.set('name', json.name);
            else
                root.set('name', "Diagrams");
        } else {
            store.load();
            var root = this.getRootNode();
            if (root)
                root.set('name', "Diagrams");
        }
    },
    /**
     * Create a new model item or folder by adding it to the tree and creating a new editor for it, if the new 
     * item is not a folder. The editor is then opened.
     * 
     * @param {String} type Method to use for the new item or 'folder' to create a new folder.
     */
    createModelItem : function(type, name) {
        var self = this;
        var selection = this.getSelectionModel().getSelection()[0];
        var node;
        var tab;

        this.focus();
        
        if (selection) {
            if (selection.get('leaf')) {
                node = selection.parentNode;
            } else {
                node = selection;
            }
        } else {
            node = this.getRootNode();
        }

        if (node) {        
            node.set("expandable", true);
            var childNode;
            
            switch (type) {
                case 'diagram':
                    label = JSGDemo.resourceProvider.getString(name == undefined ? "New Diagram" : name);
                    break;
                case 'orgchart':
                    label = JSGDemo.resourceProvider.getString(name == undefined ? "New Orgchart" : name);
                    break;
                case 'folder':
                    label = JSGDemo.resourceProvider.getString(name == undefined ? "New Folder" : name);
                    break;
            }

            if (type == "folder") {
                childNode = node.appendChild({
                    name : label,
                    id : JSGDemo.getNewId(),
                    expandable : false,
                    leaf : false
                });
            } else {
                childNode = node.appendChild({
                    name : label,
                    id : JSGDemo.getNewId(),
                    expandable : false,
                    leaf : true
                });
            }
            
            node.bubble(function(cnode) {
                cnode.expand();
            });
            
            this.getStore().sort([{property : 'leaf', direction : 'ASC'}, {property : 'name', direction : 'ASC'}]);
            this.getSelectionModel().select(childNode, false);
            this.save();

            if (type != "folder") {
                var record = this.getStore().getNodeById(childNode.get('id'));
                if (record)
                    tab = this.createModelEditor(record);
                    tab.setCustomType(type);
            }
        }
        
        return tab;
    },
    /**
     * Create an editor tab containing a graph and attach it to a tree record. In addition the tab is attached to a method.
     * The tab is added to the tab panel and activated.
     * 
     * @method createModelEditor
     * @param {Ext.data.Record} record Record or tree item to attach the tab to.
     * @return {Ext.tab.Tab} Tab, that has been created.
     */
    createModelEditor : function(record) {
        // create editor tab
        var tabs = Ext.getCmp('center');
        var tab = tabs.add({
            title : record.get('name'),
            xtype : 'editor',
            id : 'drawing' + JSGDemo.viewport.editorCount,
            html : '<canvas id="canvas' + JSGDemo.viewport.editorCount + '" height="300" width="300" tabindex="0" style="cursor: auto;"> </canvas>'
        });

        tab.show();
        tabs.doLayout();

        // create graph and attach it to the record    
        var graph = new JSG.graph.model.Graph();
        tab.jsgEditor = new JSG.ui.GraphEditor("canvas" + JSGDemo.viewport.editorCount);
        tab.jsgEditor.setInteractionHandler(new JSGDemo.graph.interaction.InteractionHandler(tab.jsgEditor.getGraphViewer()));
        tab.jsgEditor.setGraph(graph);
        tab.jsgEditor.resizeContent(tab.el.getWidth(), tab.el.getHeight());
        
        tab.record = record;
        record.tab = tab;
        
        tabs.setActiveTab(tab); //<-- will not send tab.activate() event because of tab.show() but we still need to inform toolbar!

        JSG.graph.notifications.NotificationCenter.getInstance().register(tab, JSG.graph.controller.GraphItemController.ITEM_CHANGED_NOTIFICATION, "onItemChanged");
        JSG.graph.notifications.NotificationCenter.getInstance().register(tab, JSG.graph.controller.GraphController.GRAPH_CHANGED_NOTIFICATION, "onItemChanged");
        // JSG.graph.notifications.NotificationCenter.getInstance().register(tab, JSG.graph.controller.GraphController.ITEM_ADDED_NOTIFICATION, "onItemChanged");
        // JSG.graph.notifications.NotificationCenter.getInstance().register(tab, JSG.graph.controller.GraphController.ITEM_REMOVED_NOTIFICATION, "onItemChanged");
    
        JSGDemo.viewport.editorCount++;
        
        this.save();

        JSGDemo.toolbar.updateToolbar();
        JSGDemo.statusbar.onNotification();
        JSGDemo.navigator.setGraphEditor(tab.jsgEditor);
    
        return tab;
    },
    deleteModelItem : function() {
        var selection = this.getSelectionModel().getSelection()[0];
        var allow = true;

        // check to see, if any item is currently open
        if (!selection.get('leaf')) {
            selection.cascadeBy(function(node) {
                if (node.get('leaf')) {
                    var tab = node.tab;
                    if (tab && tab.getEditor()) {
                        allow = false;
                    } 
                }
            }); 
        }
        
        if (!allow) {
            this.showWarning("Please close the open diagrams within this folder windows before deleting the folder!");
            return;        
        }

        this.getSelectionModel().deselectAll(true);

        Ext.Msg.show({
            title : JSGDemo.resourceProvider.getString("Warning"),
            msg : JSGDemo.resourceProvider.getString("The selected diagrams will permanently deleted. Continue anyway?"),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(btn) {
                if (btn == 'yes') {
                    if (selection.get('leaf')) {
                        var tab = selection.tab;
                        if (tab && tab.getEditor()) {
                            var tabs = Ext.getCmp('center');
                            tabs.remove(selection.tab);
                            var id = selection.get('id');
                            if (id)
                                localStorage.removeItem(id);
                        } 
                    } else {
                        selection.cascadeBy(function(node) {
                            if (node.get('leaf')) {
                                var id = node.get('id');
                                if (id)
                                    localStorage.removeItem(id);
                            }
                        }); 
                    }
            
                    selection.remove(false);
                    
                    JSGDemo.modeltree.validateTree();
                    JSGDemo.modeltree.save();
//                    JSGDemo.statusbar.onNotification();
                }
            }
        });
    },
    /**
     * Show a dialog to let the user point to an XML File containing a repository to be imported.
     * 
     * @method showImportDialog
     */
    showImportDialog : function() {
        var dlg = Ext.create('JSGDemo.view.ImportDialog');
        dlg.show();
    },
    /**
     * Import a repository from the given XML File.
     * 
     * @method importXML
     * @param {String} file Filename of XML File containing the repository information.
     * @return {Boolean} True, if import successful, otherwise false.
     */
    importXML : function(file) {
        var xhttp = new XMLHttpRequest();
    
        xhttp.open("GET", file, false);
        xhttp.send(); 
        
        var xml = xhttp.responseXML;
        if (!xml || !xml.hasChildNodes()) {
            JSGDemo.viewport.showWarning("Error reading Repository");
            return false;
        }
    
        var root = xml.childNodes[0];
        if (!root || !root.hasChildNodes()) {
            JSGDemo.viewport.showWarning("Error reading Repository");
            return false;
        }
            
        var xmlTree = root.getElementsByTagName("repositorytree")[0];
        if (!xmlTree) {
            JSGDemo.viewport.showWarning("Error reading Repository");
            return false;
        }
            
        var jsonString = xmlTree.textContent.decode();
        var json = JSON.parse(jsonString);
        if (!json) { 
            JSGDemo.viewport.showWarning("Error reading Repository");
            return false;
        }

        // remove open editors
        var tabs = Ext.getCmp('center');
        tabs.items.each(function(tab) {
            tabs.remove(tab);
        });

        // clear current storage
        localStorage.clear();
         
        var store = this.getStore();
        store.getProxy().data = json;
        store.load();

        var xmlProcesses = root.getElementsByTagName("repositoryitem");
        if (!xmlProcesses)
            return false;

        for (var j = 0, m = xmlProcesses.length; j < m; j++) {
            var xmlProcess = xmlProcesses[j];
            var id = xmlProcess.getAttribute('id');
            if (id) {
                var xmlProcessData = xmlProcess.getElementsByTagName("document")[0];
                if (xmlProcessData) {
                    var xml = new XMLSerializer().serializeToString(xmlProcessData);
                    if (!xml) {
                        JSGDemo.viewport.showWarning("Error reading File: " + id);
                    } else {
                        var cxml = LZString.compressToUTF16(xml);
                        localStorage.setItem(id, cxml);
                    }
                }
            }
        }
        
        var rootNode = this.getRootNode();
        rootNode.set('name', json.name);

        if (!root || !root.hasChildNodes()) {       // obviously this does not make too much sense, but prevents an error in the optimization, which leads to errors in IE 11
            JSGDemo.viewport.showWarning("Error reading Repository");
            return false;
        }
        
        this.save();
        
        return true;
    },
    /**
     * Start the export process. Using this function, changed model items can be saved if user chooses so.
     * 
     * @method exportXML
     */
    exportXML : function() {
        var change = JSGDemo.viewport.hasAnyOpenEditorChanged();
        if (change) {
            Ext.Msg.show({
                title : JSGDemo.resourceProvider.getString("Save Changes?"),
                msg : JSGDemo.resourceProvider.getString("There are unsaved changes. These will not be reflected in the export file, unless they are saved. Would like to save these?"),
                buttons : Ext.Msg.YESNOCANCEL,
                icon : Ext.Msg.QUESTION,
                fn : function(btn) {
                    if (btn == 'yes') {
                        JSGDemo.modeltree.saveAll();
                        JSGDemo.modeltree.exportXMLInit();        
                    } else if (btn == 'no') {
                        JSGDemo.modeltree.exportXMLInit();        
                    }
                }
            });
        } else {
            JSGDemo.modeltree.exportXMLInit();        
        }
    },
    /**
     * Export tree to an XML file. It is made available for download for the user. Using this function a wait indicator is shown.
     * 
     * @method exportXMLInit
     */
    exportXMLInit : function() {
        Ext.getCmp('load-indicator').show();        
        Ext.defer(function() {
            JSGDemo.modeltree.exportXMLRun();
            Ext.getCmp('load-indicator').hide();        
        }, 200);
    },
    /**
     * Export tree to an XML file. It is made available for download for the user.
     * 
     * @method exportXMLRun
     */
    exportXMLRun : function() {
        if (!JSGDemo.viewport.checkOnlineStatus()) {
            JSGDemo.viewport.showOfflineWarning();
            return;
        }

        var root = this.getRootNode();
        if (!root)
            return;

        var xml = new JSG.commons.XMLWriter();         
    
        // create header
        xml.writeStartDocument();
        xml.writeStartElement("JSGraph");
        xml.writeAttributeString("version", "1.0.0");

        // save tree        
        xml.writeStartElement("repositorytree");
        var json = root.serialize();
        xml.writeString(JSON.stringify(json).encode());        
        xml.writeEndElement();

        var self = this;    
        // now save process data, if present    
        root.cascadeBy(function(node) {
            if (node.get('leaf')) {
                var data = localStorage.getItem(node.get('id'));
                if (data) {
                    var ddata = LZString.decompressFromUTF16(data);
                    if (ddata) {
                        var pos = ddata.search(/\?>/);
                        if (pos != -1)
                            ddata = ddata.slice(pos + 2);
        
                        xml.writeStartElement("repositoryitem");
                        xml.writeAttributeString("id", node.get('id'));
                        xml.writeString(ddata);                
                        xml.writeEndElement();
                    }
                }
            }
        }); 

        xml.writeEndElement();
        xml.writeEndDocument();

        var directory = JSGDemo.saveServerData("export", "GraphExport.xml", xml.flush());
        if (!directory)
            return;

        JSGDemo.ignoreChanges = true;

        // provide download        
        JSGDemo.provideLink(directory, "GraphExport.xml", "GraphExport.xml", "xml");
    },
    /** 
     * Save all changed model items.
     * 
     * @method saveAll
     */
    saveAll : function() {
        var tabs = Ext.getCmp('center');

        tabs.items.each(function(tab) {
            if (tab.getEditor().getGraph().isChanged()) 
                tab.save();
        });
    },
    /**
     * Validates the model tree by iterating through the complete tree checking for expandable folders and
     * updating the expandable flag. This is necessary, because if an expandable node without children is expanded
     * Ext JS creates and shows invalid trees. 
     * 
     * @method validateTree
     */
    validateTree : function() {
        var root = this.getRootNode();
       
        if (!root)
            return;
        
        root.cascadeBy(function(node) {
            node.set("expandable", node.hasChildNodes());
            if (!node.hasChildNodes()) {
                node.set("expanded", false);
            }
        }); 
    }
});


