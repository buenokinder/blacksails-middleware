Ext.define('JSGDemo.view.FontButton', {
    extend : 'Ext.Button',
    alias : 'widget.fontbutton',
    icon : 'resources/icons/fontformat.png',
    cls : 'x-btn-icon',
    tooltip : JSGDemo.resourceProvider.getString("Define Font Format"),
    handler : function() {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (!editor)
            return;
        var selection = editor.getGraphViewer().getSelection();
        // var tf = JSG.graph.model.attributes.TextFormat.unionFromSelection(selection);
		var tf = JSG.graph.attr.TextFormatAttributes.retainFromSelection(selection);
        var cmbFont = Ext.getCmp('fontname');
        var cmbSize = Ext.getCmp('fontsize');
        var btnBold = Ext.getCmp('FontBold');
        var btnItalic = Ext.getCmp('FontItalic');
        var btnUnderline = Ext.getCmp('FontUnderline');
        if (tf == undefined) {
            cmbFont.setValue("");
            cmbSize.setValue("");
            btnBold.toggle(false);
            btnItalic.toggle(false);
            btnUnderline.toggle(false);
        } else {
            if (tf.getFontName() == undefined)
                cmbFont.setValue("");
            else
                cmbFont.setValue(tf.getFontName().getValue());

            if (tf.getFontSize() == undefined)
                cmbSize.setValue("");
            else
                cmbSize.setValue(String(tf.getFontSize().getValue()));

            var style = tf.getFontStyle();
            if (style == undefined) {
                btnBold.toggle(false);
                btnItalic.toggle(false);
                btnUnderline.toggle(false);
            } else {
                var value = style.getValue();
                btnBold.toggle(value & JSG.graph.attr.TextFormatAttributes.FontStyle.BOLD);
                btnItalic.toggle(value & JSG.graph.attr.TextFormatAttributes.FontStyle.ITALIC);
                btnUnderline.toggle(value & JSG.graph.attr.TextFormatAttributes.FontStyle.UNDERLINE);
            }
        }
        // var enable = selection.length != 1  || !(selection[0].getModel() instanceof JSG.graph.model.TextNode);
        // var cmp = Ext.getCmp('PosOutsideTop');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosTop');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosMiddle');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosBottom');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosOutsideBottom');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosOutsideLeft');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosLeft');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosCenter');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosRight');
        // cmp.setDisabled(enable);
        // var cmp = Ext.getCmp('PosOutsideRight');
        // cmp.setDisabled(enable);

    },
    menu : {
        plain : true,
        items : [{
            xtype : 'combobox',
            anchor : '100%',
            id : 'fontname',
            fieldLabel : JSGDemo.resourceProvider.getString('Font Name:'),
            fieldStyle : {
                'fontSize' : '8pt'
            },
            labelWidth : 70,
            editable : false,
            margin : "5px",
            store : Ext.create('Ext.data.Store', {
                fields : ['name'],
                data : [{
                    "name" : "Arial"
                }, {
                    "name" : "Courier New"
                }, {
                    "name" : "Georgia"
                }, {
                    "name" : "Lucida"
                }, {
                    "name" : "Lucida Sans"
                }, {
                    "name" : "Palatino"
                }, {
                    "name" : "Tahoma"
                }, {
                    "name" : "Times New Roman"
                }, {
                    "name" : "Trebuchet MS"
                }, {
                    "name" : "Verdana"
                }]
            }),
            displayField : 'name',
            listeners : {
                select : function(combo, records, eOpts) {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setFontName(records[0].get('name'));
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.FONTNAME);
					var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.TextFormatAttributes.FONTNAME, records[0].get('name'));
                    JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }
        }, {
            xtype : 'combobox',
            anchor : '100%',
            id : 'fontsize',
            fieldLabel : JSGDemo.resourceProvider.getString('Font Size:'),
            fieldStyle : {
                'fontSize' : '8pt'
            },
            labelWidth : 70,
            editable : false,
            margin : "5px",
            store : Ext.create('Ext.data.Store', {
                fields : ['size'],
                data : [{
                    "size" : "8"
                }, {
                    "size" : "9"
                }, {
                    "size" : "10"
                }, {
                    "size" : "11"
                }, {
                    "size" : "12"
                }, {
                    "size" : "14"
                }, {
                    "size" : "18"
                }, {
                    "size" : "24"
                }, {
                    "size" : "30"
                }, {
                    "size" : "36"
                }, {
                    "size" : "48"
                }, {
                    "size" : "60"
                }, {
                    "size" : "72"
                }]
            }),
            displayField : 'size',
            editable : true,
            queryMode : 'local',
            listeners : {
                select : function(combo, records, eOpts) {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setFontSize(Number(records[0].get('size')));
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.FONTSIZE);
					var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.TextFormatAttributes.FONTSIZE, Number(records[0].get('size')));
                    JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Style"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        }, {
            xtype : 'buttongroup',
            id : 'fontstyle',
            style : {
                backgroundColor : "transparent",
                borderColor : "transparent"
            },
            setFontStyle : function() {
                // var newFormat = new JSG.graph.model.attributes.TextFormat();
                var style = 0;
                var btnBold = Ext.getCmp('FontBold');
                var btnItalic = Ext.getCmp('FontItalic');
                var btnUnderline = Ext.getCmp('FontUnderline');
                if (btnBold.pressed)
                    style += JSG.graph.attr.TextFormatAttributes.FontStyle.BOLD;
                if (btnItalic.pressed)
                    style += JSG.graph.attr.TextFormatAttributes.FontStyle.ITALIC;
                if (btnUnderline.pressed)
                    style += JSG.graph.attr.TextFormatAttributes.FontStyle.UNDERLINE;
                // newFormat.setFontStyle(style);
                // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.FONTSTYLE);
				var formatmap = new JSG.commons.Map();
                formatmap.put(JSG.graph.attr.TextFormatAttributes.FONTSTYLE, style);
                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
            },
            items : [{
                style : {
                    background : "url(resources/icons/bold.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'FontBold',
                enableToggle : true,
                width : 32,
                height : 32,
                handler : function() {
                    Ext.getCmp('fontstyle').setFontStyle();
                }
            }, {
                style : {
                    background : "url(resources/icons/italic.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'FontItalic',
                width : 32,
                height : 32,
                enableToggle : true,
                handler : function() {
                    Ext.getCmp('fontstyle').setFontStyle();
                }
            }, {
                style : {
                    background : "url(resources/icons/underline.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'FontUnderline',
                width : 32,
                height : 32,
                enableToggle : true,
                handler : function() {
                    Ext.getCmp('fontstyle').setFontStyle();
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Horizontal Alignment"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        }, {
            xtype : 'buttongroup',
            style : {
                backgroundColor : "transparent",
                borderColor : "transparent"
            },
            items : [{
                style : {
                    background : "url(resources/icons/textleftalign.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'TextLeftAlign',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalAlignment(JSG.graph.model.attributes.TextAlignment.LEFT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALALIGN);
					var formatmap = new JSG.commons.Map();
					var align = JSG.graph.attr.TextFormatAttributes.TextAlignment.LEFT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALALIGN, align);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textcenteralign.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'TextCenterAlign',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalAlignment(JSG.graph.model.attributes.TextAlignment.CENTER);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALALIGN);
					var formatmap = new JSG.commons.Map();
					var align = JSG.graph.attr.TextFormatAttributes.TextAlignment.CENTER;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALALIGN, align);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textrightalign.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'TextRightAlign',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalAlignment(JSG.graph.model.attributes.TextAlignment.RIGHT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALALIGN);
					var formatmap = new JSG.commons.Map();
					var align = JSG.graph.attr.TextFormatAttributes.TextAlignment.RIGHT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALALIGN, align);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Font Color"),
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
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setFontColor("#" + selectedColor);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.FONTCOLOR);
					var formatmap = new JSG.commons.Map();
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.FONTCOLOR, "#" + selectedColor);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }
        }]
    },
    initComponent : function() {
        this.callParent(arguments);
    }
});
