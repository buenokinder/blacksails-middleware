Ext.define('JSGDemo.view.Viewport', {
    extend : 'Ext.Viewport',
    alias : 'widget.jsgviewport',
    layout : 'border',
    id : 'jsgViewPort',
    editorCount : 0,
    items : [{
        id : 'north',
        xtype : 'panel',
        region : 'north',
        height : 105,
        items : [{
            xtype : "panel",
            height : 27,
            layout : {
                type : 'hbox',
                align : 'middle',
                pack : 'center'
            },
            bodyStyle: {
                background: '#404040'
            },
            items : [{
                xtype : 'text',
                width : 50,
                text : ""
            }, {
                xtype : 'label',
                flex : 1,
                text : "Tensegrity Software - JS Graph Demo",
                style: 'display:inline-block;text-align:center;color:white;font-weight:bold;'   
            }, {
                xtype : 'text',
                width : 50,
                text : ""
            }]
            
        },{
            xtype : 'jsgtoolbar',
        }]
    }, {
        xtype : 'panel',
        region : 'west',
        split : true,
        width : JSG.touchDevice ? 250 : 350,
        layout : 'anchor',
        title : JSGDemo.resourceProvider.getString("Drawings"),
        collapsible : true,
        items : [{
            split : true,
            anchor : '100% 66%',
            layout : 'fit',
            items : [{
                xtype : 'modeltree',
                id : 'jsgmodeltree',
            }]
        }, {
            xtype : 'panel',
            anchor : '100% 33%',
            layout : 'fit',
            title : JSGDemo.resourceProvider.getString("Navigator"),
            items : [{
                xtype : 'box',
                layout : 'fit',
                html : '<canvas id="navigatorCanvas" style="cursor: auto;"></canvas>',
                id : 'navigatorContainer',
                listeners : {
                    resize : {
                        fn : function(el) {
                            if (JSGDemo.navigator)
                                JSGDemo.navigator.resize(el.getWidth(), el.getHeight());
                        }
                    }
                }
            }]     
        }]
    }, {
        xtype : 'tabpanel',
        id : 'center',
        region : 'center',
        deferredRender : false,
        enableTabScroll : true,
        width : 600,
        height : 250,
        tabPosition : 'bottom',
        layout : 'fit'
    }, {
        xtype : 'panel',
        region : 'east',
        split : true,
        width : 300,
        layout : 'fit',
        title : JSGDemo.resourceProvider.getString("Libraries"),
        collapsible : true,
        items : [{
            xtype : 'panel',
            split : true,
            id : 'librarycategories',
            layout : 'accordion',
            activeItem : 0
        }]
    }, {
        region : 'south',
        id : 'statusbar',
        xtype : 'statusbar'
    }, {
        xtype : 'loadmask',
        id : 'load-indicator',
        msg : JSGDemo.resourceProvider.getString("Please Wait..."),
        indicator : true,
        hidden : true,
        target : this
    }],
    initComponent : function() {
        Ext.QuickTips.init();
        this.callParent(arguments);
    },
    initNavigator : function(canvasId) {
        var container = document.getElementById("navigatorContainer");
        var width = container ? container.clientWidth : undefined;
        var height = container ? container.clientHeight : undefined;
        JSGDemo.navigator = new JSG.ui.navigator.JSGNavigator(canvasId, width, height);
    },
    initApplication : function() {
        JSGDemo.toolbar = Ext.getCmp('jsgtoolbartabs');
        JSGDemo.statusbar = Ext.getCmp('statusbar');
        this.initNavigator("navigatorCanvas");

        JSG.graph.notifications.NotificationCenter.getInstance().register(JSGDemo.toolbar, JSG.graph.view.SelectionProvider.SELECTION_CHANGED_NOTIFICATION, "onSelectionChanged");

        JSGDemo.modeltree = Ext.getCmp('jsgmodeltree');
        JSGDemo.modeltree.load();

        JSGDemo.toolbar.updateToolbar();

        this.initLibraries();
        this.initKeys();
        this.updateStorageInfo();
    },
    /**
     * Initialize global keys. 
     * 
     * @method initKeys
     */
    initKeys : function() {
        var map = new Ext.util.KeyMap({
                target : Ext.getBody(), 
                binding : [{
                    key: 83,
                    ctrl: true,
                    handler: function(key, event) {
                        var tab = JSGDemo.viewport.getActiveTab();
                        event.preventDefault();
                        event.stopPropagation();
                        event.stopEvent();
                        if (tab)
                            tab.save();
                    },
                    scope: this,
                    defaultEventAction: "stopEvent"
                }, {    
                    key: 80,
                    ctrl: true,
                    handler: function(key, event) {
                        var tab = JSGDemp.viewport.getActiveTab();
                        event.preventDefault();
                        event.stopPropagation();
                        event.stopEvent();
                        if (tab)
                            tab.print();
                    },
                    scope: this,
                    defaultEventAction: "stopEvent"
                }, {   
                    key: 65,
                    ctrl: true,
                    handler: function(key, event) {
                        if (event.target.type != "textarea" && event.target.type != "text" )
                            event.stopEvent();
                       // do nothing intentionally
                    },
                    scope: this
                }, {
                    key: 27,
                    handler: function(key, event) {
                        var activeEditor = this.getActiveEditor();
                        if(activeEditor != undefined) {
                            var ev = event.browserEvent;
                            var canvas = activeEditor.getGraphicSystem().getCanvas();
                            var type = ev.type == "keydown" ? JSG.ui.events.KeyEventType.DOWN : JSG.ui.events.KeyEventType.UP;
                            var keyEvent = JSG.ui.events.KeyEvent.fromEvent(canvas, ev, type);
                            activeEditor.getInteractionHandler().handleKeyEvent(keyEvent);
                            if(keyEvent.doRepaint === true) {
                                activeEditor.repaint();
                            }
                            //ARGH, THIS IS IMPORTANT!! OTHERWISE ALL SUBSEQUENT MOUSEEVENTs HAVE KEY CODE ESC!!!
                            JSG.ui.events.currentKey = undefined;
                        }
                    },
                    scope: this,
                    defaultEventAction: "stopEvent"
                }, {
                    key: 81,
                    ctrl: true,
                    handler: function(key, event) {
                        localStorage.clear();
                        JSGDemo.samples.General.createRepository();
                    },
                    scope: this
                }]
        });
    },
    initLibraries : function() {
        var libPanel = Ext.getCmp('librarycategories');
        JSGDemo.libraries.libraries.iterate(
            function(key, library) {
                var panel = Ext.create('Ext.panel.Panel', {
                    layout : 'fit',
                    title : library.name,
                    html : '<canvas id="libCanvas' + library.name + '" tabindex="0" style="cursor: auto;"></canvas>',
                    listeners : {
                        resize : {
                            fn : function(el) {
                                if (!el.lib) {
                                    el.lib = new JSG.ui.shapelibrary.ShapeLibrary("libCanvas" + library.name, 0, 0);
                                    //define interactions:
                                    var dndActivator = el.lib.getInteractionActivator(JSG.graph.interaction.DragDropActivator.KEY);
                                    dndActivator.getTargetEditor = function() {
                                        return JSGDemo.viewport.getActiveEditor();
                                    };
                            
                                    for (var i = 0, n = library.sections.length; i < n; i++) {
                                        var section = library.sections[i];        
                                        el.lib.addCategory(section.label);
                                        
                                        var shapes = library.shapes.elements();
                                        for (var j = 0, m = shapes.length; j < m; j++) {
                                            var shape = shapes[j];
                                            var symbol = JSGDemo.libraries.symbols.get(shape.type);
                                            if (symbol && shape.section == section.type) {
                                                JSG.imagePool.add(symbol.icon, symbol.type);
                                                JSG.imagePool.add(symbol.iconsmall, symbol.type + "small");
                                                var item = el.lib.addShape(shape.type, symbol.label, symbol.type, "");
                                            }
                                        }
                                    }
                                }
                                el.lib.resize(el.getWidth(), el.getHeight());
                            }
                        }
                    }
                });
                libPanel.add(panel);
                if (JSGDemo.activeRepository && library.type == JSGDemo.activeRepository) 
                    panel.expand();
            }
        );
    },
    updateStorageInfo : function() {
        
    },
    /**
     * Get the active or visible tab.
     * 
     * @method getActiveTab
     * @return {Ext.tab.Tab} Active Tab.
     */
    getActiveTab : function() {
        var tabs = Ext.getCmp('center');
        return tabs.getActiveTab();
    },
    /**
     * Get the active graph editor, which is the editor of the active tab.
     * 
     * @method getActiveEditor
     * @param {type} param_name param_description.
     * @return {JSG.ui.GraphEditor} Currently active GraphEditor.
     */
    getActiveEditor : function() {
        var tabs = Ext.getCmp('center');
        var tab = tabs.getActiveTab();
        if (tab)
            return tab.getEditor();
    },
    /**
     * Search the tree for a name and return the corresponding id.
     * 
     * @param {String} name Record name.
     * @return {String} Id of the record containing the name.  
     */
    getIdByName : function(name) {
        var tree = JSGDemo.modeltree;
        var root = tree.getRootNode();
        var record = undefined;
        var self = this;
       
        if (!root)
            return;
        
        root.cascadeBy(function(node) {
            if (node.get("name") == name) {
                record = node;
                return false;
            }
        }); 
        
        if (record)
            return record.get('id'); 
    },
    hasAnyOpenEditorChanged : function() {
        var ret = false;
        var tabs = Ext.getCmp('center');
        tabs.items.each(function(tab) {
            if (tab.getEditor().getGraph().isChanged()) 
                ret = true;
        });
        
        return ret;
    },
    /**
     * Activate an editor identified by the item id. If the editor does not exist yet, it is automatically created and then activated.
     * 
     * @param {String} id Editor id.  
     */
    setActiveEditorById : function(id) {
        var tree = JSGDemo.modeltree;
        var root = tree.getRootNode();
        var record = undefined;
        var self = this;
       
        if (!root)
            return;
        
        root.cascadeBy(function(node) {
            if (node.get("id") == id) {
                record = node;
                return false;
            }
        }); 
        
        if (record) {
            if (record.tab) {
                Ext.getCmp('center').setActiveTab(record.tab);
            } else {
                var tab = tree.createModelEditor(record);
                if (tab)
                    tab.load(record);
                record.bubble(function(cnode) {
                    cnode.expand();
                });
                
                tree.getSelectionModel().select(record, false);
            }
        }
    },
});
