/**
 * @module JSGDemo.view
 * @namespace JSGDemo.view
 */
JSG.namespace("JSGDemo.view");

Ext.define('JSGDemo.view.ShadowButton', {
    extend : 'Ext.Button',
    alias : 'widget.shadowbutton',
    text : JSGDemo.resourceProvider.getString("Shadow"),
    cls : 'x-btn-icon',
    icon : 'resources/icons/shadow.png',
//    tooltip : JSGDemo.Utils.createTooltip("Shadow", "Define the shadow<br>to display for selected items"),
    menu : {
        plain : true,
        listeners : {
            show : function(menu, eOpts) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor) {
                    var selection = editor.getGraphViewer().getSelection();
                    if (selection) {
                        var f = JSG.graph.attr.FormatAttributes.retainFromSelection(selection);
                        if (f != undefined) {
                            var sldWidth = Ext.getCmp('shadowdepth');
                            sldWidth.setValue(f.getShadowOffsetX().getValue());
                            var sldBlur = Ext.getCmp('shadowblur');
                            sldBlur.setValue(f.getShadowBlur().getValue());
                        }
                    }
                }
            }
        },
        items : [{
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Direction"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        }, {
            xtype : 'buttongroup',
            columns : 5,
            style : {
                backgroundColor : "transparent",
                borderColor : "transparent"
            },
            items : [{
                style : {
                    background : "url(resources/icons/shadownone.png)",
                    backgroundRepeat : "no-repeat"
                },
                width : 34,
                height : 34,
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowOffsetX(0);
                        // newFormat.setShadowOffsetY(0);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, 0);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, 0);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);
                        
                        var sldWidth = Ext.getCmp('shadowdepth');
                        sldWidth.setValue(0);
                    }
                }
            }, {
                style : {
                    background : "url(resources/icons/shadowrightbottom.png)",
                    backgroundRepeat : "no-repeat"
                },
                width : 34,
                height : 34,
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowOffsetX(200);
                        // newFormat.setShadowOffsetY(200);
                        // newFormat.setShadowDirection(JSG.graph.model.attributes.ShadowDirection.RIGHTBOTTOM);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWDIRECTION |  JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWDIRECTION, JSG.graph.attr.FormatAttributes.ShadowDirection.RIGHTBOTTOM);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);
		    		    
                        var sldWidth = Ext.getCmp('shadowdepth');
                        sldWidth.setValue(200);
                    }
                }
            }, {
                style : {
                    background : "url(resources/icons/shadowleftbottom.png)",
                    backgroundRepeat : "no-repeat"
                },
                width : 34,
                height : 34,
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowDirection(JSG.graph.model.attributes.ShadowDirection.LEFTBOTTOM);
                        // newFormat.setShadowOffsetX(200);
                        // newFormat.setShadowOffsetY(200);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWDIRECTION |  JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWDIRECTION, JSG.graph.attr.FormatAttributes.ShadowDirection.LEFTBOTTOM);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);

                        var sldWidth = Ext.getCmp('shadowdepth');
                        sldWidth.setValue(200);
                    }
                }
            }, {
                style : {
                    background : "url(resources/icons/shadowrighttop.png)",
                    backgroundRepeat : "no-repeat"
                },
                width : 34,
                height : 34,
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowDirection(JSG.graph.model.attributes.ShadowDirection.RIGHTTOP);
                        // newFormat.setShadowOffsetX(200);
                        // newFormat.setShadowOffsetY(200);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWDIRECTION |  JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWDIRECTION, JSG.graph.attr.FormatAttributes.ShadowDirection.RIGHTTOP);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);

                        var sldWidth = Ext.getCmp('shadowdepth');
                        sldWidth.setValue(200);
                    }
                }
            }, {
                style : {
                    background : "url(resources/icons/shadowlefttop.png)",
                    backgroundRepeat : "no-repeat"
                },
                width : 34,
                height : 34,
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowDirection(JSG.graph.model.attributes.ShadowDirection.LEFTTOP);
                        // newFormat.setShadowOffsetX(200);
                        // newFormat.setShadowOffsetY(200);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWDIRECTION |  JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, 200);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWDIRECTION, JSG.graph.attr.FormatAttributes.ShadowDirection.LEFTTOP);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);

                        var sldWidth = Ext.getCmp('shadowdepth');
                        sldWidth.setValue(200);
                    }
                }
            }]
        }, '-', {
            xtype : 'text',
            text: JSGDemo.resourceProvider.getString("Depth"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        },  {
            xtype : 'slider', 
            value : 20,
            increment : 10,
            minValue : 0,
            maxValue : 500,
            id : 'shadowdepth',
            width : 198,
            style : {
                'margin' : '5px'
            },
            listeners : {
                change : function(slider, newValue, thumb, eOpts) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowOffsetX(newValue);
                        // newFormat.setShadowOffsetY(newValue);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWOFFSETX | JSG.graph.model.attributes.FormatID.SHADOWOFFSETY);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_X, newValue);
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWOFFSET_Y, newValue);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);
                    }
                }
            }
        }, {
            xtype : 'text',
            text: JSGDemo.resourceProvider.getString("Blur"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        },  {
            xtype : 'slider', 
            value : 20,
            increment : 10,
            minValue : 0,
            maxValue : 100,
            id : 'shadowblur',
            width : 198,
            style : {
                'margin' : '5px'
            },
            listeners : {
                change : function(slider, newValue, thumb, eOpts) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowBlur(newValue);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWBLUR);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWBLUR, newValue);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);
                    }
                }
            }
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Shadow Color"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        }, {
            xtype : 'colorpicker',
            width : 198,
            height : 198,
            colors : JSG.colors,
            listeners : {
                select : function(colorPick, selectedColor) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        // var newFormat = new JSG.graph.model.attributes.Format();
                        // newFormat.setShadowColor("#" + selectedColor);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.SHADOWCOLOR);
		      			var formatmap = new JSG.commons.Map();
		                formatmap.put(JSG.graph.attr.FormatAttributes.SHADOWCOLOR, "#" + selectedColor);
		    		    editor.getInteractionHandler().applyFormatMap(formatmap);
                    }
                }
            }
        }]
    },
});
