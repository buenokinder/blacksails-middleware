
Ext.define('filtermodel', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'name',
        type : 'string'
    }, {
        name : 'visible',
        type : 'bool'
    }, {
        name : 'selectable',
        type : 'bool'
    }]
});

Ext.define('JSGDemo.view.FilterDialog', {
    extend : 'Ext.window.Window',
    alias : 'widget.filterdialog',
    id : 'layerdlg',
    height : 300,
    width : 400,
    modal : true,
    title : JSGDemo.resourceProvider.getString("Filter Settings"),
    layout : 'fit',
    items : [{
        xtype : 'panel',
        layout : 'fit',
        width : 500,
        bodyPadding : '10 10 10 10',
        items : [{
            xtype : 'gridpanel',
            id : 'layergrid',
            store : Ext.create('Ext.data.ArrayStore', {
                model : 'filtermodel',
                autoSync : true
            }),
            height : 300,
            plugins : Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit : 1,
                pluginId : 'cellplugin'
            }),
            columns : [{
                id : 'name',
                text : JSGDemo.resourceProvider.getString("Name"),
                flex : 1,
                sortable : true,
                dataIndex : 'name',
                editor: 'textfield'
            }, {
                xtype : 'checkcolumn',
                text : JSGDemo.resourceProvider.getString("Visible"),
                width : 75,
                sortable : true,        
                dataIndex : 'visible'
//                editor: 'checkbox'
            }, {
                xtype : 'checkcolumn',
                text : JSGDemo.resourceProvider.getString("Selectable"),
                width : 75,
                sortable : true,         
                dataIndex : 'selectable'
//                editor: 'checkbox'
            }]
        }],
        buttons : [{
            text : JSGDemo.resourceProvider.getString("Add"),
            handler : function() {
                var win = this.up('window');
                var grid = win.down('gridpanel');
                var store = grid.getStore();
                var layer;
                var name = 'New Filter ';
                do {
                    layer = true;
                    name += '1';
                    for (var i = 0, n = store.getCount(); i < n; i++) {
                        var rec = store.getAt(i);
                        if (rec.get('name') == name) {
                            layer = false;
                            break;
                        }
                    }
                } while (!layer);
                store.add({name : name, visible : true, selectable : true});
            }
        }, {
            text : JSGDemo.resourceProvider.getString("OK"),
            handler : function(button) {
                var win = this.up('window');
                var grid = win.down('gridpanel');
                var store = grid.getStore();
                // TODO create command
                for (var i = 0, n = store.getCount(); i < n; i++) {
                    var rec = store.getAt(i);
                    var layer = win.jsgEditor.getGraph().getLayer(rec.get('name'));
                    if (layer != undefined) {
                        layer.visible = rec.get('visible');
                        layer.selectable = rec.get('selectable');
                    }
                }
                win.jsgEditor.invalidate();
                win.close();
            }
        }, {
            text : JSGDemo.resourceProvider.getString("Cancel"),
            handler : function() {
                var win = this.up('window');
                win.close();
            }
        }]
    }],
    setEditor : function(editor) {
        var layerData = editor.getGraph()._layers.elements();
        var grid = this.down('gridpanel');
        grid.getStore().loadData(layerData);
        this.jsgEditor = editor;
    }
});
