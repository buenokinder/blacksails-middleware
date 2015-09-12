Ext.define('JSGDemo.view.LineButton', {

    extend : 'Ext.Button',
    alias : 'widget.linebutton',
    cls : 'x-btn-icon',
    tooltip : JSGDemo.resourceProvider.getString("Define Line"),
    setLineWidth : function(width) {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (editor) {
            // var newFormat = new JSG.graph.model.attributes.Format();
            // newFormat.setLineWidth(width);
            // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINEWIDTH);
			var formatmap = new JSG.commons.Map();
            formatmap.put(JSG.graph.attr.FormatAttributes.LINEWIDTH, width);
            editor.getInteractionHandler().applyFormatMap(formatmap);
        }
    },
    setLineStyle : function(type) {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (editor) {
            // var newFormat = new JSG.graph.model.attributes.Format();
            // newFormat.setLineStyle(type);
            // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINESTYLE);
			var formatmap = new JSG.commons.Map();
            formatmap.put(JSG.graph.attr.FormatAttributes.LINESTYLE, type);
            editor.getInteractionHandler().applyFormatMap(formatmap);
        }
    },
    setStartArrow : function(type) {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (editor) {
            // var newFormat = new JSG.graph.model.attributes.Format();
            // newFormat.setLineArrowStart(type);
            // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINEARROWSTART);
			var formatmap = new JSG.commons.Map();
            formatmap.put(JSG.graph.attr.FormatAttributes.LINEARROWSTART, type);
            editor.getInteractionHandler().applyFormatMap(formatmap);
        }
    },
    setEndArrow : function(type) {
        var editor = JSGDemo.viewport.getActiveEditor();
        if (editor) {
            // var newFormat = new JSG.graph.model.attributes.Format();
            // newFormat.setLineArrowEnd(type);
            // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINEARROWEND);
			var formatmap = new JSG.commons.Map();
            formatmap.put(JSG.graph.attr.FormatAttributes.LINEARROWEND, type);
            editor.getInteractionHandler().applyFormatMap(formatmap);
        }
    },
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
                            var textField = menu.down('textfield');
                            textField.setValue(f.getLineColor().getValue());
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
                    // newFormat.setLineColor("#" + selectedColor);
                    // if (f != undefined && f.getLineStyle() == JSG.graph.model.attributes.LineStyle.NONE) {
                        // newFormat.setLineStyle(JSG.graph.model.attributes.LineStyle.SOLID);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINECOLOR | JSG.graph.model.attributes.FormatID.LINESTYLE);
                    // } else {
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINECOLOR);
                    // }
          			var formatmap = new JSG.commons.Map();
		            formatmap.put(JSG.graph.attr.FormatAttributes.LINECOLOR, "#" + selectedColor);
                    if (f != undefined && f.getLineStyle() == JSG.graph.attr.FormatAttributes.LineStyle.NONE) {
                        formatmap.put(JSG.graph.attr.FormatAttributes.LINESTYLE, JSG.graph.attr.FormatAttributes.LineStyle.SOLID);
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
            enableKeyEvents : true,
            fieldLabel : JSGDemo.resourceProvider.getString("Custom:"),
            fieldStyle : {
                'fontSize' : '8pt'
            },
            style : {
                'margin' : '5px',
                'fontSize' : '8pt'
            },
            listeners : {
                'keyup' : function(textfield, event) {
                    var v = textfield.getValue();

                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (!editor)
                        return;
                    var f;
                    var selection = editor.getGraphViewer().getSelection();
                    if (selection)
                        f = JSG.graph.attr.FormatAttributes.retainFromSelection(selection);

                    // var newFormat = new JSG.graph.model.attributes.Format();
                    // newFormat.setLineColor(v);
                    // if (f != undefined && f.getLineStyle() == JSG.graph.model.attributes.LineStyle.NONE) {
                        // newFormat.setLineStyle(JSG.graph.model.attributes.LineStyle.SOLID);
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINECOLOR | JSG.graph.model.attributes.FormatID.LINESTYLE);
                    // } else {
                        // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINECOLOR);
                    // }
                    // textfield.focus();
          			var formatmap = new JSG.commons.Map();
		            formatmap.put(JSG.graph.attr.FormatAttributes.LINECOLOR, v);
                    if (f != undefined && f.getLineStyle() == JSG.graph.attr.FormatAttributes.LineStyle.NONE) {
                        formatmap.put(JSG.graph.attr.FormatAttributes.LINESTYLE, JSG.graph.attr.FormatAttributes.LineStyle.SOLID);
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
                // newFormat.setLineStyle(JSG.graph.model.attributes.LineStyle.NONE);
                // editor.getInteractionHandler().applyFormat(newFormat, JSG.graph.model.attributes.FormatID.LINESTYLE);
      			var formatmap = new JSG.commons.Map();
                formatmap.put(JSG.graph.attr.FormatAttributes.LINESTYLE, JSG.graph.attr.FormatAttributes.LineStyle.NONE);
    		    editor.getInteractionHandler().applyFormatMap(formatmap);
            }
        }, '-', {
            text : JSGDemo.resourceProvider.getString("Width"),
            menu : {
                plain : true,
                width : 181,
                listeners : {
                    show : function(menu, eOpts) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor) {
                            var selection = editor.getGraphViewer().getSelection();
                            if (selection) {
                                var f = JSG.graph.attr.FormatAttributes.retainFromSelection(selection);
                                if (f != undefined) {
                                    var sldWidth = menu.down('slider');
                                    if (f.getLineWidth().getValue() == JSG.graph.model.attributes.LineStyle.HAIRLINE) {
                                    } else {
                                        sldWidth.setValue(f.getLineWidth().getValue());
                                    }
                                }
                            }
                        }
                    }
                },
                items : [{
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Predefined Width"),
                    style : {
                        'font-size' : '8pt',
                        'padding' : '5px',
                        'margin' : '5px',
                        'backgroundColor' : '#DDDDDD'
                    }
                }, {
                    xtype : 'buttongroup',
                    columns : 1,
                    style : {
                        backgroundColor : "transparent",
                        borderColor : "transparent"
                    },
                    items : [{
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidthhairline.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(JSG.graph.model.attributes.LineStyle.HAIRLINE);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth05mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(50);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth1mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(100);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth15mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(150);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth2mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(200);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth25mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(250);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth3mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(300);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linewidth35mm.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineWidth(350);
                        }
                    }]
                }, '-', {
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Custom Width"),
                    style : {
                        'font-size' : '8pt',
                        'padding' : '5px',
                        'margin' : '5px',
                        'backgroundColor' : '#DDDDDD'
                    }
                }, {
                    xtype : 'slider',
                    style : {
                        'margin' : '5px'
                    },
                    value : 20,
                    increment : 10,
                    minValue : 0,
                    maxValue : 1000,
                    width : 198,
                    listeners : {
                        change : function(slider, newValue, thumb, eOpts) {
                            slider.up('button').setLineWidth(newValue);
                        }
                    }
                }]
            }
        }, {
            text : JSGDemo.resourceProvider.getString("Style"),
            menu : {
                plain : true,
                width : 181,
                items : [{
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Styles"),
                    style : {
                        'font-size' : '8pt',
                        'padding' : '5px',
                        'margin' : '5px',
                        'backgroundColor' : '#DDDDDD'
                    }
                }, {
                    xtype : 'buttongroup',
                    columns : 1,
                    style : {
                        backgroundColor : "transparent",
                        borderColor : "transparent"
                    },
                    listeners : {
                        afterrender : function(grp) {
                            this.doLayout();
                        }
                    },
                    items : [{
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linestylesolid.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineStyle(JSG.graph.model.attributes.LineStyle.SOLID);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linestyledot.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineStyle(JSG.graph.model.attributes.LineStyle.DOT);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linestyledash.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineStyle(JSG.graph.model.attributes.LineStyle.DASH);
                        }
                    }, {
                        xtype : 'button',
                        width : 160,
                        height : 22,
                        style : {
                            background : "url(resources/icons/linestyledashdot.png)",
                            margin : "3px 0px"
                        },
                        handler : function(btn) {
                            btn.up('button').setLineStyle(JSG.graph.model.attributes.LineStyle.DASHDOT);
                        }
                    }]
                }]
            }
        }, '-', {
            text : JSGDemo.resourceProvider.getString("Arrow Start"),
            menu : {
                plain : true,
                items : [{
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Arrow Styles"),
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
                        icon : 'resources/icons/arrowNone.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.NONE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilled.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowHalfFilled.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWHALFFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowHalfFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWHALFFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowNarrowFilled.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWNNARROWFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowNarrowFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWNARROWFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleFilled.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLEFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLEFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/Arrow.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROW);
                        }
                    }, {
                        icon : 'resources/icons/ArrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDouble.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLESMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowSingleSide.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWSINGLESIDE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseFilled.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSEFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSEFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSESMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseNarrow.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSENARROW);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseNarrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSENARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/LineArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.LINEARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/CircleArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLEARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/Circle.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLE);
                        }
                    }, {
                        icon : 'resources/icons/CircleSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLESMALL);
                        }
                    }, {
                        icon : 'resources/icons/Diamond.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAMOND);
                        }
                    }, {
                        icon : 'resources/icons/DiamondSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/DiamondNarrow.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDNARROW);
                        }
                    }, {
                        icon : 'resources/icons/DiamondNarrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDNARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/CircleDoubleLine.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLEDOUBLELINE);
                        }
                    }, {
                        icon : 'resources/icons/DoubleLine.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DOUBLELINE);
                        }
                    }, {
                        icon : 'resources/icons/Square.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.SQUARE);
                        }
                    }, {
                        icon : 'resources/icons/SquareSmall.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.SQUARESMALL);
                        }
                    }, {
                        icon : 'resources/icons/DiamondLong.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDLONG);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilledLong.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDLONG);
                        }
                    }, {
                        icon : 'resources/icons/DiagonalLine.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.DIAGONALLINE);
                        }
                    }, {
                        icon : 'resources/icons/CircleSmallAround.png',
                        handler : function(btn) {
                            btn.up('button').setStartArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLESMALLAROUND);
                        }
                    }]
                }]
            }
        }, {
            text : JSGDemo.resourceProvider.getString("Arrow End"),
            menu : {
                plain : true,
                items : [{
                    xtype : 'text',
                    text : JSGDemo.resourceProvider.getString("Arrow Styles"),
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
                        icon : 'resources/icons/arrowNone.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.NONE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilled.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowHalfFilled.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWHALFFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowHalfFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWHALFFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowNarrowFilled.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWNNARROWFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowNarrowFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWNARROWFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleFilled.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLEFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLEFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/Arrow.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROW);
                        }
                    }, {
                        icon : 'resources/icons/ArrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDouble.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowDoubleSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLESMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowSingleSide.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWSINGLESIDE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseFilled.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSEFILLED);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseFilledSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSEFILLEDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSESMALL);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseNarrow.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSENARROW);
                        }
                    }, {
                        icon : 'resources/icons/ArrowReverseNarrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWREVERSENARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/LineArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.LINEARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/CircleArrowReverse.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLEARROWREVERSE);
                        }
                    }, {
                        icon : 'resources/icons/Circle.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLE);
                        }
                    }, {
                        icon : 'resources/icons/CircleSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLESMALL);
                        }
                    }, {
                        icon : 'resources/icons/Diamond.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAMOND);
                        }
                    }, {
                        icon : 'resources/icons/DiamondSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDSMALL);
                        }
                    }, {
                        icon : 'resources/icons/DiamondNarrow.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDNARROW);
                        }
                    }, {
                        icon : 'resources/icons/DiamondNarrowSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDNARROWSMALL);
                        }
                    }, {
                        icon : 'resources/icons/CircleDoubleLine.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLEDOUBLELINE);
                        }
                    }, {
                        icon : 'resources/icons/DoubleLine.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DOUBLELINE);
                        }
                    }, {
                        icon : 'resources/icons/Square.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.SQUARE);
                        }
                    }, {
                        icon : 'resources/icons/SquareSmall.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.SQUARESMALL);
                        }
                    }, {
                        icon : 'resources/icons/DiamondLong.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAMONDLONG);
                        }
                    }, {
                        icon : 'resources/icons/ArrowFilledLong.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDLONG);
                        }
                    }, {
                        icon : 'resources/icons/DiagonalLine.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.DIAGONALLINE);
                        }
                    }, {
                        icon : 'resources/icons/CircleSmallAround.png',
                        handler : function(btn) {
                            btn.up('button').setEndArrow(JSG.graph.model.attributes.ArrowStyle.CIRCLESMALLAROUND);
                        }
                    }]
                }]
            }
        }]
    },
    initComponent : function() {
        this.callParent(arguments);
    }
});
