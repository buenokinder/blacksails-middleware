Ext.define('JSGDemo.view.TextButton', {
    extend : 'Ext.Button',
    alias : 'widget.textbutton',
    icon : 'resources/icons/textformat.png',
    text : "",
    cls : 'x-btn-icon',
    tooltip : JSGDemo.resourceProvider.getString("Define Text Format"),
    handler : function() {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (!editor)
            return;
    },
    menu : {
        plain : true,
        items : [{
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Horizontal Position"),
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
                    background : "url(resources/icons/textpositionoutsideleft.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosOutsideLeft',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalPosition(JSG.graph.model.attributes.HorizontalTextPosition.TOLEFT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.TOLEFT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionleft.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosLeft',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalPosition(JSG.graph.model.attributes.HorizontalTextPosition.LEFT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.LEFT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositioncenter.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosCenter',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalPosition(JSG.graph.model.attributes.HorizontalTextPosition.CENTER);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.CENTER;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionright.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosRight',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalPosition(JSG.graph.model.attributes.HorizontalTextPosition.RIGHT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.RIGHT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionoutsideright.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosOutsideRight',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setHorizontalPosition(JSG.graph.model.attributes.HorizontalTextPosition.TORIGHT);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.HORIZONTALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.TORIGHT;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.HORIZONTALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Vertical Position"),
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
                    background : "url(resources/icons/textpositionoutsidetop.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosOutsideTop',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setVerticalPosition(JSG.graph.model.attributes.VerticalTextPosition.ONTOP);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.VERTICALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.ONTOP;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.VERTICALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositiontop.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosTop',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setVerticalPosition(JSG.graph.model.attributes.VerticalTextPosition.TOP);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.VERTICALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.TOP;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.VERTICALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionmiddle.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosMiddle',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setVerticalPosition(JSG.graph.model.attributes.VerticalTextPosition.CENTER);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.VERTICALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.CENTER;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.VERTICALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);					
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionbottom.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosBottom',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setVerticalPosition(JSG.graph.model.attributes.VerticalTextPosition.BOTTOM);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.VERTICALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.BOTTOM;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.VERTICALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }, {
                style : {
                    background : "url(resources/icons/textpositionoutsidebottom.png)",
                    backgroundRepeat : "no-repeat"
                },
                id : 'PosOutsideBottom',
                width : 32,
                height : 32,
                handler : function() {
                    // var newFormat = new JSG.graph.model.attributes.TextFormat();
                    // newFormat.setVerticalPosition(JSG.graph.model.attributes.VerticalTextPosition.BELOWBOTTOM);
                    // JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormat(newFormat, JSG.graph.model.attributes.TextFormatID.VERTICALPOSITION);
					var formatmap = new JSG.commons.Map();
					var pos = JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.BELOWBOTTOM;
	                formatmap.put(JSG.graph.attr.TextFormatAttributes.VERTICALPOSITION, pos);
	                JSGDemo.viewport.getActiveEditor().getInteractionHandler().applyTextFormatMap(formatmap);
                }
            }]
        }, '-', {
            xtype : 'button',
            text : JSGDemo.resourceProvider.getString("Add Label"),
            handler : function () {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (!editor)
                    return;
                var selection = editor.getGraphViewer().getSelection();
                editor.getInteractionHandler().execute(new JSG.graph.command.AddLabelCommand(selection[0].getModel(), "Label"));
                
            }
        }]
    }
});
