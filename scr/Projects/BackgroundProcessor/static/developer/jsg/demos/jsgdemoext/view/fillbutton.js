/**
 * @module JSGDemo.view
 * @namespace JSGDemo.view
 */
JSG.namespace("JSGDemo.view");

/**
 * Template for an Ext component to define the settings for the fillcolor. A button is created, which
 * initiates a menu containing a color picker to select the color, a none menu item to remove the color
 * and a slider to define the transparency.
 * 
 * @class FillButton
 * @extends Ext.Button
 */
Ext.define('JSGDemo.view.FillButton', {
    extend : 'Ext.Button',
    alias : 'widget.fillbutton',
    cls : 'x-btn-icon',
    icon : 'resources/icons/colorfill.png',
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
                            var sldTransparency = menu.down('slider');
                            sldTransparency.setValue(100 - f.getTransparency().getValue());
                            var textField = menu.down('textfield');
                            textField.setValue(f.getFillColor().getValue());
                        }
                    }
                }
            }
        },
        items : [{
            xtype : 'colorpicker',
            width : 198,
            height : 198,
            value : 'FFFFFF',
            colors : JSG.colors,
            listeners : {
                select : function(colorPick, selectedColor) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (!editor)
                        return;
                    var f;
                    var selection = editor.getGraphViewer().getSelection();
                    if (selection) 
                        f = JSG.graph.attr.FormatAttributes.retainFromSelection(selection);
                    
                    
                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setFillColor("#" + selectedColor);
                    // if (f != undefined && f.getFillStyle() == JSG.graph.model.attributes.FillStyle.NONE) {
                        // newFormat.setFillStyle(JSG.graph.model.attributes.FillStyle.SOLID);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLCOLOR | JSG.graph.model.attributes.FormatID.FILLSTYLE);
                    // } else {
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLCOLOR);
                    // }
                    var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.FormatAttributes.FILLCOLOR, "#" + selectedColor);
                    if (f != undefined && f.getFillStyle() == JSG.graph.model.attributes.FillStyle.NONE) {
                        formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.SOLID);
                    }
                    editor.getInteractionHandler().applyFormatMap(formatmap);

                    
                    
                    var cmp = colorPick.up('menu');
                    textField = cmp.down('textfield');
                    textField.setValue("#" + selectedColor);
                }
            }
        }, {
            xtype : 'textfield',
            width : 180,
            enableKeyEvents: true,
            fieldLabel : JSGDemo.resourceProvider.getString("Custom:"),
            fieldStyle : {
                'fontSize' : '8pt'
            },
            style : {
                'margin' : '5px',
                'fontSize' : '8pt'
            },
            listeners : {
                'keyup': function(textfield, event) {
                    var v= textfield.getValue();

                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (!editor)
                        return;
                    var f;
                    var selection = editor.getGraphViewer().getSelection();
                    if (selection) 
                        f = JSG.graph.attr.FormatAttributes.retainFromSelection(selection);
                    
                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setFillColor(v);
                    // if (f != undefined && f.getFillStyle() == JSG.graph.model.attributes.FillStyle.NONE) {
                        // newFormat.setFillStyle(JSG.graph.model.attributes.FillStyle.SOLID);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLCOLOR | JSG.graph.model.attributes.FormatID.FILLSTYLE);
                    // } else {
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLCOLOR);
                    // }
                    // textfield.focus();
                    
					var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.FormatAttributes.FILLCOLOR, v);
                    if (f != undefined && f.getFillStyle() == JSG.graph.model.attributes.FillStyle.NONE) {
                        formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.SOLID);
                    }
                    editor.getInteractionHandler().applyFormatMap(formatmap);
					textfield.focus();
                }
            }
        }, {
            text : JSGDemo.resourceProvider.getString("None"),
            handler : function() {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (!editor)
                    return;
                // var newFormat = new JSG.graph.model.attributes.Format();
                // newFormat.setFillStyle(JSG.graph.model.attributes.FillStyle.NONE);
                // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLSTYLE);
				var formatmap = new JSG.commons.Map();
                formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.NONE);
                editor.getInteractionHandler().applyFormatMap(formatmap);
            }
        }, '-', {
            text : JSGDemo.resourceProvider.getString("Gradient"),
            menu : {
                plain : true,
                items : [{
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Style:"),
                    style : {
                        'font-size' : '8pt',
                        'padding' : '5px',
                        'margin' : '5px',
                        'backgroundColor' : '#DDDDDD'
                    }
                }, {
                    xtype : 'buttongroup',
                    columns : 6,
                    style : {
                        backgroundColor : "transparent",
                        borderColor : "transparent"
                    },
                    items : [{
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear Left Right"),
                        style : {
                            background : "url(resources/icons/gradientlr.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(0);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear Right Left"),
                        style : {
                            background : "url(resources/icons/gradientrl.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(180);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear Top Bottom"),
                        style : {
                            background : "url(resources/icons/gradienttb.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(90);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear Bottom Top"),
                        style : {
                            background : "url(resources/icons/gradientbt.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(270);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear 45 degrees"),
                        style : {
                            background : "url(resources/icons/gradient45.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(45);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear 135 degrees"),
                        style : {
                            background : "url(resources/icons/gradient135.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 0px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(135);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear 225 degrees"),
                        style : {
                            background : "url(resources/icons/gradient225.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(225);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Linear 315 degrees"),
                        style : {
                            background : "url(resources/icons/gradient315.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setLinearGradient(315);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Radial Top Left"),
                        style : {
                            background : "url(resources/icons/gradientctl.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setRadialGradient(0, 0);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Radial Top Right"),
                        style : {
                            background : "url(resources/icons/gradientctr.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setRadialGradient(100, 0);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Radial Bottom Right"),
                        style : {
                            background : "url(resources/icons/gradientcrb.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setRadialGradient(100, 100);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Radial Bottom Left"),
                        style : {
                            background : "url(resources/icons/gradientcbl.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 0px 3px 3px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setRadialGradient(0, 100);
                        }
                    }, {
                        xtype : 'button',
                        width : 28,
                        height : 28,
                        tooltip : JSGDemo.resourceProvider.getString("Radial from Center"),
                        style : {
                            background : "url(resources/icons/gradientcout.png)",
                            backgroundRepeat : "no-repeat",
                            margin : "3px 3px 3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('menu').setRadialGradient(50, 50);
                        }
                    }]
                }, {
                    text : JSGDemo.resourceProvider.getString("No Gradient"),
                    style : {
                        margin : "3px 3px 3px 3px"
                    },
                    handler : function() {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor) {
                            // var newFormat = new JSG.graph.model.attributes.Format();
                            // newFormat.setFillStyle(JSG.graph.model.attributes.FillStyle.SOLID);
                            // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.FILLSTYLE);
							var formatmap = new JSG.commons.Map();
		                    formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.SOLID);
		                    editor.getInteractionHandler().applyFormatMap(formatmap);
                        }
                    }
                }, {
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Target Color"),
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
                                // newFormat.setGradientColor("#" + selectedColor);
                                // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.GRADIENTCOLOR);
								var formatmap = new JSG.commons.Map();
			                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTCOLOR, "#" + selectedColor);
			                    editor.getInteractionHandler().applyFormatMap(formatmap);
                            }
                        }
                    }
            }],
            setLinearGradient : function(angle) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor) {
                    // var f = JSG.graph.model.attributes;
                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setFillStyle(f.FillStyle.GRADIENT);
                    // newFormat.setGradientType(f.GradientStyle.LINEAR);
                    // newFormat.setGradientAngle(angle);
                    // editor.getInteractionHandler().applyFormat(newFormat, f.FormatID.GRADIENTTYPE | f.FormatID.GRADIENTANGLE | f.FormatID.FILLSTYLE);
        			var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.GRADIENT);
                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTTYPE, JSG.graph.attr.FormatAttributes.GradientStyle.LINEAR);
                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTANGLE, angle);
                    editor.getInteractionHandler().applyFormatMap(formatmap);
                }
            },
            setRadialGradient : function(x, y) {
                var editor = JSGDemo.viewport.getActiveEditor();
                if (editor) {
                    // var f = JSG.graph.model.attributes;
                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setFillStyle(f.FillStyle.GRADIENT);
                    // newFormat.setGradientType(f.GradientStyle.RADIAL);
                    // newFormat.setGradientOffsetX(x);
                    // newFormat.setGradientOffsetY(y);
                    // editor.getInteractionHandler().applyFormat(newFormat, f.FormatID.GRADIENTTYPE | f.FormatID.GRADIENTOFFSETX | f.FormatID.GRADIENTOFFSETY | f.FormatID.FILLSTYLE);
        			var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.FormatAttributes.FILLSTYLE, JSG.graph.attr.FormatAttributes.FillStyle.GRADIENT);
                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTTYPE, JSG.graph.attr.FormatAttributes.GradientStyle.RADIAL);
                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTOFFSET_X, x);
                    formatmap.put(JSG.graph.attr.FormatAttributes.GRADIENTOFFSET_Y, y);
                    editor.getInteractionHandler().applyFormatMap(formatmap);
                }
            }
                }
        }, '-', {
            xtype : 'text',
            text: JSGDemo.resourceProvider.getString("Transparency"),
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
            width : 198,
            style : {
                'margin' : '5px'
            },
            listeners : {
                change : function(slider, newValue, thumb, eOpts) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (!editor)
                        return;
                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setTransparency(100 - newValue);
                    // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.TRANSPARENCY);
        			var formatmap = new JSG.commons.Map();
                    formatmap.put(JSG.graph.attr.FormatAttributes.TRANSPARENCY, 100 - newValue);
                    editor.getInteractionHandler().applyFormatMap(formatmap);
                }
            }
        }]
    }
});
