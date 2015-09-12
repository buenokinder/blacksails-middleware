/**
 * @module JSGDemo.view
 * @namespace JSGDemo.view
 */
JSG.namespace("JSGDemo.view");

/**
 * Template to define the status bar for BIC Design. Mostly straightforward JS-Ext code, defining the status bar layout. 
 * The status bar contains controls to manage zooming and to show the storage status.
 *
 * @class Statusbar
 * @extends Ext.panel.Panel
 * @constructor
 */
Ext.define('JSGDemo.view.Statusbar', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.statusbar',
    height : 26,
    dockedItems : [{
        xtype : 'toolbar',
        id : 'statustoolbar',
        dock : 'bottom',
        items : [JSGDemo.resourceProvider.getString("Ready"), '->', {
            id : 'zoominfo',
            text : "100 %"   
        }, {
            xtype : 'button',
            cls : 'x-btn-icon',
            icon : 'resources/icons/zoomminus.png',
            id : 'jsgzoomminusbtn',
            handler : function(button) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor)
                    editor.setZoom(editor.getZoom() - 0.1);
            }
        }, {
            xtype : 'slider',
            value : 100,
            id : 'jsgzoomslider',
            increment : 10,
            minValue : 20,
            maxValue : 400,
            width : 100,
            listeners : {
                changecomplete : function(slider, newValue, thumb, eOpts) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor)
                        editor.setZoom(newValue / 100);
                }
            }
        }, {
            xtype : 'button',
            cls : 'x-btn-icon',
            icon : 'resources/icons/zoomplus.png',
            id : 'jsgzoomplusbtn',
            handler : function(button) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor)
                    editor.setZoom(editor.getZoom() + 0.1);
            }
        }, {
            xtype : 'button',
            cls : 'x-btn-icon',
            id : 'jsgzoom100btn',
            icon : 'resources/icons/zoom100.png',
            handler : function(button) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor)
                    editor.setZoom(1.0);
            }
        }, {
            xtype : 'button',
            cls : 'x-btn-icon',
            icon : 'resources/icons/zoomfit.png',
            id : 'jsgzoomtofitbtn',
            handler : function(button) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor)
                    editor.setZoom(JSG.ui.GraphEditor.ZOOM_FIT);
            }
        }, '-',  {
            xtype : 'button',
            icon : 'resources/icons/viewmodeendlesss.png',
            enableToggle : true,
//            pressed : !JSGDemo.config.pagemode,
            toggleGroup : 'pagemode',
            disabled : false,
            toggleHandler : function(btn, state) {
                if (state) {
                    var tabs = Ext.getCmp('center');
                    tabs.items.each(function(tab) {
                        tab.jsgEditor.setViewMode(JSG.ui.graphics.DisplayMode.ENDLESS);
                    });
                }
            }
        }, {
            xtype : 'button',
            icon : 'resources/icons/viewmodepages.png',
            enableToggle : true,
            // pressed : JSGDemo.config.pagemode,
            toggleGroup : 'pagemode',
            disabled : false,
            toggleHandler : function(btn, state) {
                if (state) {
                    var tabs = Ext.getCmp('center');
                    tabs.items.each(function(tab) {
                        tab.jsgEditor.setViewMode(JSG.ui.graphics.DisplayMode.PAGE);
                    });
                }
            }
        }]
    }],
    initComponent : function() {
        Ext.QuickTips.init();
        this.callParent(arguments);
        var nc = JSG.graph.notifications.NotificationCenter.getInstance();
        nc.register(this, JSG.ui.GraphEditor.ZOOM_NOTIFICATION);
    },
    onNotification : function(notification) {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (editor) {
            var slider = Ext.getCmp('jsgzoomslider');
            slider.setValue(editor.getZoom() * 100);
            var text = Ext.getCmp('zoominfo');
            text.setText(Math.round(editor.getZoom() * 100) + " %");
        }
    }
});
