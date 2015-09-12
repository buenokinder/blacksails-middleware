Ext.define('JSGDemo.view.Toolbar', {
    extend : 'Ext.tab.Panel',
    alias : 'widget.jsgtoolbar',
    id : 'jsgtoolbartabs',
    height : 97,
    layout : 'fit',
    plain : true,
    tbUpdate : false,
    listeners : {
        tabchange : function(tabPanel, newCard, oldCard, eOpts) {
            JSGDemo.toolbar.updateToolbar();
        }
    },
    tabBar : {
        height : 23,
        items : [{
            xtype : 'tbfill'
        }, {
            src : 'resources/icons/languages/german.png',
            xtype : 'image',
            width : 16,
            margin : '3, 3, 3, 3',
            style : {
                'cursor' : 'pointer'
            },
            listeners : {
                render : function(c) {
                    c.getEl().on('click', function(e) {
                        JSGDemo.toolbar.checkReload('language', 'de');
                    }, c);
                }
            }
        }, {
            src : 'resources/icons/languages/english.png',
            xtype : 'image',
            margin : '3, 3, 3, 3',
            style : {
                'cursor' : 'pointer'
            },
            width : 16,
            listeners : {
                render : function(c) {
                    c.getEl().on('click', function(e) {
                        JSGDemo.toolbar.checkReload('language', 'en');
                    }, c);
                }
            }
        }]
    },
    /**
     * Checks to see, if files have to be saved before a reload can be executed. A dialog will be displayed, if files
     * need to be saved. Depending on the result of the user interaction, the application will be reload.
     */
    checkReload : function(key, value) {
        var tabs = Ext.getCmp('center');
        var self = this;

        var saveDlg = false;
        JSGDemo.viewport.hasAnyOpenEditorChanged();

        localStorage.setItem(key, value);

        if (saveDlg) {
            Ext.Msg.show({
                title : JSGDemo.resourceProvider.getString("Save Changes?"),
                msg : JSGDemo.resourceProvider.getString("The application has to be reloaded to change the language. There are unsaved changes. Would like to save these?"),
                buttons : Ext.Msg.YESNOCANCEL,
                icon : Ext.Msg.QUESTION,
                fn : function(btn) {
                    var tabs = Ext.getCmp('center');
                    if (btn == 'yes') {
                        tabs.items.each(function(tab) {
                            if (tab.getEditor().getGraph().isChanged()) {
                                tab.save();
                            }
                        });
                        window.location.reload();
                    } else if (btn == 'no') {
                        JSGDemo.ignoreChanges = true;
                        window.location.reload();
                    }
                }
            });
        } else {
            window.location.reload();
        }
    },
    items : [{
        title : JSGDemo.resourceProvider.getString("Start"),
        id : 'tbStart',
        style : {
            border : 'none'
        },
        items : [{
            xtype : 'toolbar',
            id : 'jsgtoolbar',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                minWidth : 40,
                iconAlign : 'top',
                arrowAlign : 'right',
                cls : 'x-btn-icon'
            },
            items : [{
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'splitbutton',
                icon : 'resources/icons/new.png',
                id : 'jsgnewlargebtn',
                text : JSGDemo.resourceProvider.getString("New"),
                tooltip : JSGDemo.resourceProvider.getString("New"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("New Drawing"),
                        icon : 'resources/icons/drawing.png',
                        id : 'jsgnewbtn',
                        handler : function() {
                            JSGDemo.modeltree.createModelItem("diagram");
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("New Organizational Chart"),
                        id : 'jsgneworgbtn',
                        icon : 'resources/icons/orgchart.png',
                        handler : function() {
                            JSGDemo.modeltree.createModelItem("orgchart");
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("New Folder"),
                        id : 'jsgnewfolderbtn',
                        icon : 'resources/icons/newfolder.png',
                        handler : function() {
                            JSGDemo.modeltree.createModelItem("folder");
                        }
                    }]
                },
                handler : function() {
                    JSGDemo.modeltree.createModelItem("diagram");
                }
            }, {
                icon : 'resources/icons/save.png',
                id : 'jsgsavebtn',
                text : JSGDemo.resourceProvider.getString("Save"),
                tooltip : JSGDemo.resourceProvider.getString("Save Drawing"),
                handler : function() {
                    var tab = JSGDemo.viewport.getActiveTab();
                    if (tab)
                        tab.save();
                }
            }, {
                icon : 'resources/icons/print.png',
                id : 'jsgprintbtn',
                text : JSGDemo.resourceProvider.getString("Print"),
                tooltip : JSGDemo.resourceProvider.getString("Print Drawing"),
                handler : function() {
                    var tab = JSGDemo.viewport.getActiveTab();
                    if (tab)
                        tab.print();
                }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/undo.png',
                id : 'jsgundobtn',
                text : JSGDemo.resourceProvider.getString("Undo"),
                tooltip : JSGDemo.resourceProvider.getString("Undo last command"),
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().undo();
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/redo.png',
                text : JSGDemo.resourceProvider.getString("Redo"),
                tooltip : JSGDemo.resourceProvider.getString("Redo last undo command"),
                id : 'jsgredobtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().redo();
                }
            }, {
                xtype : 'splitbutton',
                id : 'jsgcopylargebtn',
                icon : 'resources/icons/copy.png',
                text : JSGDemo.resourceProvider.getString("Copy"),
                tooltip : JSGDemo.resourceProvider.getString("Copy Shapes"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Copy"),
                        id : 'jsgcopybtn',
                        icon : 'resources/icons/copysmall.png',
                        handler : function() {
                            if (JSGDemo.viewport.getActiveEditor())
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().copySelection();
                            JSGDemo.toolbar.updateToolbar();
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Copy Format"),
                        id : 'jsgcopyformatbtn',
                        icon : 'resources/icons/copyformatsmall.png',
                        handler : function() {
                            if (JSGDemo.viewport.getActiveEditor())
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().copySelectionFormat();
                            JSGDemo.toolbar.updateToolbar();
                        }
                    }]
                },
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().copySelection();
                    JSGDemo.toolbar.updateToolbar();
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/cut.png',
                text : JSGDemo.resourceProvider.getString("Cut"),
                tooltip : JSGDemo.resourceProvider.getString("Cut items"),
                id : 'jsgcutbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().cutSelection();
                    JSGDemo.toolbar.updateToolbar();
                }
            }, {
                xtype : 'splitbutton',
                id : 'jsgpastelargebtn',
                icon : 'resources/icons/paste.png',
                text : JSGDemo.resourceProvider.getString("Paste"),
                tooltip : JSGDemo.resourceProvider.getString("Paste Shapes"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Paste"),
                        icon : 'resources/icons/pastesmall.png',
                        id : 'jsgpastebtn',
                        handler : function() {
                            if (JSGDemo.viewport.getActiveEditor())
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().paste();
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Paste Format"),
                        icon : 'resources/icons/pasteformatsmall.png',
                        id : 'jsgpasteformatbtn',
                        handler : function() {
                            if (JSGDemo.viewport.getActiveEditor())
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().pasteFormat();
                        }
                    }]
                },
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().paste();
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/delete.png',
                text : JSGDemo.resourceProvider.getString("Delete"),
                tooltip : JSGDemo.resourceProvider.getString("Delete selected items"),
                id : 'jsgdeletebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().deleteSelection();
                }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/rectangle.png',
                text : JSGDemo.resourceProvider.getString("Rectangle"),
                tooltip : JSGDemo.resourceProvider.getString("Create Rectangle"),
                id : 'jsgrectbtnstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.RectangleShape()));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/ellipse.png',
                id : 'jsgellipsebtnstart',
                text : JSGDemo.resourceProvider.getString("Ellipse"),
                tooltip : JSGDemo.resourceProvider.getString("Create Ellipse"),
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.EllipseShape()));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/polygon.png',
                text : JSGDemo.resourceProvider.getString("Polygon"),
                tooltip : JSGDemo.resourceProvider.getString("Create Polygon"),
                id : 'jsgpolygonbtnstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreatePolyLineInteraction(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape())));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/text.png',
                text : JSGDemo.resourceProvider.getString("Text"),
                tooltip : JSGDemo.resourceProvider.getString("Create Text"),
                id : 'jsgtextbtnstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.RectangleShape(), "Text"));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/polyline.png',
                text : JSGDemo.resourceProvider.getString("Polyline"),
                tooltip : JSGDemo.resourceProvider.getString("Create Polyline"),
                id : 'jsgpolylinebtnstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var polynode = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
                        polynode.setItemAttribute(JSG.graph.attr.ItemAttributes.CLOSED, false);
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreatePolyLineInteraction(polynode));
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/bezier.png',
                text : JSGDemo.resourceProvider.getString("Curve"),
                tooltip : JSGDemo.resourceProvider.getString("Create Curved Polygon"),
                id : 'jsgbezierbtnstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var beziernode = new JSG.graph.model.Node(new JSG.graph.model.shapes.BezierShape());
                        beziernode.setItemAttribute(JSG.graph.attr.ItemAttributes.CLOSED, false);
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateBezierInteraction(beziernode));
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/line.png',
                text : JSGDemo.resourceProvider.getString("Line"),
                tooltip : JSGDemo.resourceProvider.getString("Create Edge"),
                id : 'jsglinebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        editor.getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateEdgeInteraction(new JSG.graph.model.Edge()));
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/hvline.png',
                text : JSGDemo.resourceProvider.getString("HV Line"),
                tooltip : JSGDemo.resourceProvider.getString("Create Orthogonal Edge"),
                id : 'jsghvlinebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        var edge = new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape());
                        editor.getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateOrthoEdgeInteraction(edge));
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/link.png',
                text : JSGDemo.resourceProvider.getString("Default Link"),
                tooltip : JSGDemo.resourceProvider.getString("Define Default Link"),
                overflowText : JSGDemo.resourceProvider.getString("Define Default Link"),
                id : 'jsglinkbtn',
                setItem : function(btn, icon) {
                    this.selectedItem = btn.getId();
                    this.setIcon(icon);
                },
                selectedItem : "defline",
                menu : {
                    items : [{
                        icon : 'resources/icons/shapes/edge.png',
                        text : JSGDemo.resourceProvider.getString("Straight Connection"),
                        id : 'defline',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/edge.png');
                            JSG.defaultEdgeType = "edge";
                        }
                    }, {
                        icon : 'resources/icons/shapes/edgearrow.png',
                        text : JSGDemo.resourceProvider.getString("Straight Connection with Arrow"),
                        id : 'deflinearrow',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/edgearrow.png');
                            JSG.defaultEdgeType = "edgeArrow";
                        }
                    }, {
                        icon : 'resources/icons/shapes/orthogonaledge.png',
                        text : JSGDemo.resourceProvider.getString("Orthogonal Connection"),
                        id : 'defhvline',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/orthogonaledge.png');
                            JSG.defaultEdgeType = "orthogonalEdge";
                        }
                    }, {
                        icon : 'resources/icons/shapes/orthogonaledgearrow.png',
                        text : JSGDemo.resourceProvider.getString("Orthogonal Connection with Arrow"),
                        id : 'defhvlineArrow',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/orthogonaledgearrow.png');
                            JSG.defaultEdgeType = "orthogonalEdgeArrow";
                        }
                    }, {
                        icon : 'resources/icons/shapes/orthogonalroundededge.png',
                        text : JSGDemo.resourceProvider.getString("Rounded Orthogonal Connection"),
                        id : 'defhvrline',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/orthogonalroundededge.png');
                            JSG.defaultEdgeType = "orthogonalRoundedEdge";
                        }
                    }, {
                        icon : 'resources/icons/shapes/orthogonalroundededgearrow.png',
                        text : JSGDemo.resourceProvider.getString("Rounded Orthogonal Connection with Arrow"),
                        id : 'defhvrlineArrow',
                        handler : function() {
                            Ext.getCmp('jsglinkbtn').setItem(this, 'resources/icons/shapes/orthogonalroundededgearrow.png');
                            JSG.defaultEdgeType = "orthogonalRoundedEdgeArrow";
                        }
                    }]
                },
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'linebutton',
                id : 'jsglinefmtbtnstart',
                icon : 'resources/icons/colorline.png',
                text : JSGDemo.resourceProvider.getString("Line Format"),
                tooltip : JSGDemo.resourceProvider.getString("Line"),
                overflowText : JSGDemo.resourceProvider.getString("Line"),
            }, {
                xtype : 'fillbutton',
                id : 'jsgfillfmtbtnstart',
                icon : 'resources/icons/colorfill.png',
                text : JSGDemo.resourceProvider.getString("Fill Format"),
                tooltip : JSGDemo.resourceProvider.getString("Fill"),
                overflowText : JSGDemo.resourceProvider.getString("Fill"),
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/editpoints.png',
                text : JSGDemo.resourceProvider.getString("Edit"),
                tooltip : JSGDemo.resourceProvider.getString("Edit Points"),
                id : 'editpointsstart',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().editSelection();
                }
            }],
        }]
    }, {
        title : JSGDemo.resourceProvider.getString("Insert"),
        id : 'tbInsert',
        items : [{
            xtype : 'toolbar',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                iconAlign : 'top',
                arrowAlign : 'right',
                minWidth : 40,
                cls : 'x-btn-icon'
            },
            items : [{
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'linesbutton',
                text : JSGDemo.resourceProvider.getString('Lines')
            }, {
                xtype : 'button',
                icon : 'resources/icons/rectangle.png',
                text : JSGDemo.resourceProvider.getString("Rectangle"),
                tooltip : JSGDemo.resourceProvider.getString("Create Rectangle"),
                id : 'jsgrectbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.RectangleShape()));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/ellipse.png',
                id : 'jsgellipsebtn',
                text : JSGDemo.resourceProvider.getString("Ellipse"),
                tooltip : JSGDemo.resourceProvider.getString("Create Ellipse"),
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.EllipseShape()));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/polygon.png',
                text : JSGDemo.resourceProvider.getString("Polygon"),
                tooltip : JSGDemo.resourceProvider.getString("Create Polygon"),
                id : 'jsgpolygonbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreatePolyLineInteraction(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape())));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/text.png',
                text : JSGDemo.resourceProvider.getString("Text"),
                tooltip : JSGDemo.resourceProvider.getString("Create Text"),
                id : 'jsgtextbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateNodeInteraction(new JSG.graph.model.shapes.RectangleShape(), "Text"));
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/polyline.png',
                text : JSGDemo.resourceProvider.getString("Polyline"),
                tooltip : JSGDemo.resourceProvider.getString("Create Polyline"),
                id : 'jsgpolylinebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var polynode = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
                        polynode.setItemAttribute(JSG.graph.attr.ItemAttributes.CLOSED, false);
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreatePolyLineInteraction(polynode));
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/bezier.png',
                text : JSGDemo.resourceProvider.getString("Curve"),
                tooltip : JSGDemo.resourceProvider.getString("Create Curved Polygon"),
                id : 'jsgbezierbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor()) {
                        var beziernode = new JSG.graph.model.Node(new JSG.graph.model.shapes.BezierShape());
                        beziernode.setItemAttribute(JSG.graph.attr.ItemAttributes.CLOSED, false);
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateBezierInteraction(beziernode));
                    }
                }
            }, {
                xtype : 'shapesbutton',
                text : JSGDemo.resourceProvider.getString('Shapes')
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/container.png',
                text : JSGDemo.resourceProvider.getString("Container"),
                tooltip : JSGDemo.resourceProvider.getString("Create Scrollable Container"),
                id : 'jsgcontainerbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateItemInteraction(new JSG.graph.model.ContainerNode()));
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Image'),
                icon : 'resources/icons/image.png',
                id : 'jsgimagebtn',
                handler : function() {
                    Ext.getCmp('jsgtoolbartabs').getInput(JSGDemo.resourceProvider.getString('Image'),
                        JSGDemo.resourceProvider.getString('Please enter the URL of the image and then create the image by using the mouse:'), 
                        JSGDemo.resourceProvider.getString('URL'), 
                        function(value) {
                            if (JSGDemo.viewport.getActiveEditor()) {
                                var node = new JSG.graph.model.Node();
                                node.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.PATTERN);
                                node.getFormat().setPattern(value);
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateItemInteraction(node));                            }
                        });
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Hyperlink'),
                icon : 'resources/icons/hyperlink.png',
                id : 'jsghyperlinkbtn',
                handler : function() {
                    Ext.getCmp('jsgtoolbartabs').getInput(JSGDemo.resourceProvider.getString('Hyperlink'),
                        JSGDemo.resourceProvider.getString('Please enter the URL and then create the hyperlink object by using the mouse:'), 
                        JSGDemo.resourceProvider.getString('URL'), 
                        function(value) {
                            if (JSGDemo.viewport.getActiveEditor()) {
                                var node = new JSG.graph.model.Node();
                                node.setLink(value);
                                node.getTextFormat().setFontStyle(JSG.graph.attr.TextFormatAttributes.FontStyle.UNDERLINE);
                                node.getTextFormat().setFontColor('#0000FF');
                                JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateItemInteraction(node, value));
                            }
                        });
                }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button', 
                text : JSGDemo.resourceProvider.getString('Header'),
                icon : 'resources/icons/header.png',
                id : 'jsgheaderbtn',
                menu : {
                    plain : true,
                    width : 260,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                Ext.getCmp("leftheader").setValue(editor.getGraphSettings().getPage().getHeaderLeft());
                                Ext.getCmp("centerheader").setValue(editor.getGraphSettings().getPage().getHeaderCenter());
                                Ext.getCmp("rightheader").setValue(editor.getGraphSettings().getPage().getHeaderRight());
                            }
                        }
                    },
                    items: [{
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'leftheader',
                        fieldLabel: JSGDemo.resourceProvider.getString('Left Header:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setHeaderLeft(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'centerheader',
                        fieldLabel: JSGDemo.resourceProvider.getString('Center Header:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setHeaderCenter(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'rightheader',
                        fieldLabel: JSGDemo.resourceProvider.getString('Right Header:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setHeaderRight(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }]
               }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Footer'),
                icon : 'resources/icons/footer.png',
                id : 'jsgfooterbtn',
                menu : {
                    plain : true,
                    width : 260,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                Ext.getCmp("leftfooter").setValue(editor.getGraphSettings().getPage().getFooterLeft());
                                Ext.getCmp("centerfooter").setValue(editor.getGraphSettings().getPage().getFooterCenter());
                                Ext.getCmp("rightfooter").setValue(editor.getGraphSettings().getPage().getFooterRight());
                            }
                        }
                    },
                    items: [{
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'leftfooter',
                        fieldLabel: JSGDemo.resourceProvider.getString('Left Footer:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFooterLeft(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'centerfooter',
                        fieldLabel: JSGDemo.resourceProvider.getString('Center Footer:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFooterCenter(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'textfield',
                        anchor: '100%',
                        id : 'rightfooter',
                        fieldLabel: JSGDemo.resourceProvider.getString('Right Footer:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        labelWidth : 80,
                        listeners: {
                            change: function(field, value) {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFooterRight(value);
                                    editor.invalidate();                                
                                }
                            }
                        }
                    }]
               }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Filter'),
                icon : 'resources/icons/filter.png',
                id : 'jsgfilterbtn',
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    var panel = Ext.create('JSGDemo.view.FilterDialog');
                    panel.setEditor(editor);
                    panel.show();
                }
            }]
        }]
    }, {
        title : JSGDemo.resourceProvider.getString("Format"),
        id : 'tbFormat',
        items : [{
            xtype : 'toolbar',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                minWidth : 40,
                iconAlign : 'top',
                arrowAlign : 'right',
                cls : 'x-btn-icon'
            },
            items : [{
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'text',
                margin : "6px",
                style : {
                    fontWeight : "bold"
                },
                text : JSGDemo.resourceProvider.getString('Coordinates (mm)'),
                minWidth : '20'
            }, {
                xtype: 'numberfield',
                anchor: '100%',
                id : 'posX',
                fieldLabel: JSGDemo.resourceProvider.getString('X:'),
                fieldStyle : {
                    'fontSize' : '8pt'
                },
                margin : "5px",
                labelWidth : 15,
                minValue : 2,
                maxValue : 1000,
                step: 1,
                value: 1,
                validator : function (value) {
                    return value > 0 && value < 1000 ? true : "Error";
                },
                width : 80,
                listeners: {
                    change: function(field, value) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor && value > 0 && value < 1000) {
                            var selection = editor.getGraphViewer().getSelection();
                            var item = selection[0].getModel();
                            var box = item.getBoundingBox();
                            box.setLeft(value * 100);
                            var cmd = new JSG.graph.command.ResizeItemCommand(item, box);
                            editor.getInteractionHandler().execute(cmd);
                            field.focus();
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                anchor: '100%',
                id : 'posY',
                fieldLabel: JSGDemo.resourceProvider.getString('Y:'),
                fieldStyle : {
                    'fontSize' : '8pt'
                },
                margin : "5px",
                labelWidth : 15,
                minValue : 2,
                maxValue : 1000,
                step: 1,
                value: 1,
                validator : function (value) {
                    return value > 0 && value < 1000 ? true : "Error";
                },
                width : 80,
                listeners: {
                    change: function(field, value) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor && value > 0 && value < 1000) {
                            var selection = editor.getGraphViewer().getSelection();
                            var item = selection[0].getModel();
                            var box = item.getBoundingBox();
                            box.setTop(value * 100);
                            var cmd = new JSG.graph.command.ResizeItemCommand(item, box);
                            editor.getInteractionHandler().execute(cmd);
                            field.focus();
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                anchor: '100%',
                id : 'posWidth',
                fieldLabel: JSGDemo.resourceProvider.getString('Width:'),
                fieldStyle : {
                    'fontSize' : '8pt'
                },
                margin : "5px",
                labelWidth : 35,
                minValue : 2,
                maxValue : 1000,
                step: 1,
                value: 1,
                validator : function (value) {
                    return value > 0 && value < 1000 ? true : "Error";
                },
                width : 100,
                listeners: {
                    change: function(field, value) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor && value > 0 && value < 1000) {
                            var selection = editor.getGraphViewer().getSelection();
                            var item = selection[0].getModel();
                            var box = item.getBoundingBox();
                            box.setWidth(value * 100);
                            var cmd = new JSG.graph.command.ResizeItemCommand(item, box);
                            editor.getInteractionHandler().execute(cmd);
                            field.focus();
                        }
                    }
                }
            }, {
                xtype: 'numberfield',
                anchor: '100%',
                id : 'posHeight',
                fieldLabel: JSGDemo.resourceProvider.getString('Height:'),
                fieldStyle : {
                    'fontSize' : '8pt'
                },
                margin : "5px",
                labelWidth : 40,
                minValue : 2,
                maxValue : 1000,
                step: 1,
                value: 1,
                validator : function (value) {
                    return value > 0 && value < 1000 ? true : "Error";
                },
                width : 100,
                listeners: {
                    change: function(field, value) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor && value > 0 && value < 1000) {
                            var selection = editor.getGraphViewer().getSelection();
                            var item = selection[0].getModel();
                            var box = item.getBoundingBox();
                            box.setHeight(value * 100);
                            var cmd = new JSG.graph.command.ResizeItemCommand(item, box);
                            editor.getInteractionHandler().execute(cmd);
                            field.focus();
                        }
                    }
                }
            }, {
                xtype : 'text',
                minWidth : '30'
            }, {
                xtype : 'linebutton',
                id : 'jsglinefmtbtn',
                icon : 'resources/icons/colorline.png',
                text : JSGDemo.resourceProvider.getString("Line Format"),
                tooltip : JSGDemo.resourceProvider.getString("Line"),
                overflowText : JSGDemo.resourceProvider.getString("Line"),
            }, {
                xtype : 'fillbutton',
                id : 'jsgfillfmtbtn',
                icon : 'resources/icons/colorfill.png',
                text : JSGDemo.resourceProvider.getString("Fill Format"),
                tooltip : JSGDemo.resourceProvider.getString("Fill"),
                overflowText : JSGDemo.resourceProvider.getString("Fill"),
            }, {
                xtype : 'shadowbutton',
                id : 'jsgshadowfmtbtn',
                text : JSGDemo.resourceProvider.getString("Shadow"),
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'fontbutton',
                id : 'jsgfontfmtbtn',
                text : JSGDemo.resourceProvider.getString("Font"),
            }, {
                xtype : 'textbutton',
                id : 'jsgtextfmtbtn',
                text : JSGDemo.resourceProvider.getString("Text"),
            }]
        }]
    }, {
        title : JSGDemo.resourceProvider.getString("Change"),
        id : 'tbChange',
        items : [{
            xtype : 'toolbar',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                minWidth : 40,
                iconAlign : 'top',
                arrowAlign : 'right',
                cls : 'x-btn-icon'
            },
            items : [{
                xtype : 'text',
                minWidth : '20'
            }, {
                xtype : 'button',
                icon : 'resources/icons/editpoints.png',
                text : JSGDemo.resourceProvider.getString("Edit"),
                tooltip : JSGDemo.resourceProvider.getString("Edit Points"),
                id : 'editpoints',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().editSelection();
                }
            }, {
                xtype : 'text',
                minWidth : '20'
            }, {
                xtype : 'button',
                icon : 'resources/icons/group.png',
                text : JSGDemo.resourceProvider.getString("Group"),
                tooltip : JSGDemo.resourceProvider.getString("Group"),
                id : 'group',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().groupSelection();
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/ungroup.png',
                text : JSGDemo.resourceProvider.getString("Ungroup"),
                tooltip : JSGDemo.resourceProvider.getString("Ungroup"),
                id : 'ungroup',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().ungroupSelection();
                }
            }, {
                xtype : 'text',
                minWidth : '25'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Align:"),
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/alignleft.png',
                text : JSGDemo.resourceProvider.getString("Left"),
                tooltip : JSGDemo.resourceProvider.getString("Left"),
                id : 'jsgalignleftbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.LEFT);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/aligncenter.png',
                text : JSGDemo.resourceProvider.getString("Center"),
                tooltip : JSGDemo.resourceProvider.getString("Center"),
                id : 'jsgaligncenterbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.CENTER);
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString("Right"),
                tooltip : JSGDemo.resourceProvider.getString("Right"),
                icon : 'resources/icons/alignright.png',
                id : 'jsgalignrightbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.RIGHT);
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString("Top"),
                tooltip : JSGDemo.resourceProvider.getString("Top"),
                icon : 'resources/icons/aligntop.png',
                id : 'jsgaligntopbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.TOP);
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString("Middle"),
                tooltip : JSGDemo.resourceProvider.getString("Middle"),
                icon : 'resources/icons/alignmiddle.png',
                id : 'jsgalignmiddlebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.MIDDLE);
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString("Bottom"),
                tooltip : JSGDemo.resourceProvider.getString("Bottom"),
                icon : 'resources/icons/alignbottom.png',
                id : 'jsgalignbottombtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.BOTTOM);
                }
            }, {
                xtype : 'text',
                minWidth : '25'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Space:"),
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/alignvdistribute.png',
                text : JSGDemo.resourceProvider.getString("Vertical"),
                tooltip : JSGDemo.resourceProvider.getString("Vertical"),
                id : 'jsgalignvdistributebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.VDISTRIBUTE);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/alignhdistribute.png',
                text : JSGDemo.resourceProvider.getString("Horizontal"),
                tooltip : JSGDemo.resourceProvider.getString("Horizontal"),
                id : 'jsgalignhdistributebtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().alignSelection(JSG.graph.command.Alignment.HDISTRIBUTE);
                }
            }, {
                xtype : 'text',
                minWidth : '25'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Resize:"),
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/vsizemax.png',
                text : JSGDemo.resourceProvider.getString("Highest"),
                tooltip : JSGDemo.resourceProvider.getString("Size to Max"),
                id : 'jsgvsizemaxbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().sizeSelection(JSG.graph.command.SizeItems.VERTICALMAX);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/vsizemin.png',
                text : JSGDemo.resourceProvider.getString("Smallest"),
                tooltip : JSGDemo.resourceProvider.getString("Size to Min"),
                id : 'jsgvsizeminbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().sizeSelection(JSG.graph.command.SizeItems.VERTICALMIN);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/hsizemax.png',
                text : JSGDemo.resourceProvider.getString("Widest"),
                tooltip : JSGDemo.resourceProvider.getString("Widest"),
                id : 'jsghsizemaxbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().sizeSelection(JSG.graph.command.SizeItems.HORIZONTALMAX);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/hsizemin.png',
                text : JSGDemo.resourceProvider.getString("Smallest"),
                tooltip : JSGDemo.resourceProvider.getString("Smallest"),
                id : 'jsghsizeminbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().sizeSelection(JSG.graph.command.SizeItems.HORIZONTALMIN);
                }
            }, {
                xtype : 'text',
                minWidth : '25'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Order:"),
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/ordertop.png',
                text : JSGDemo.resourceProvider.getString("Top"),
                tooltip : JSGDemo.resourceProvider.getString("To Top"),
                id : 'jsgordertopbtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.TOTOP);
                }
            }, {
                xtype : 'button',
                id : 'jsgordertotopbtn',
                icon : 'resources/icons/ordertotop.png',
                text : JSGDemo.resourceProvider.getString("Up"),
                tooltip : JSGDemo.resourceProvider.getString("Move up"),
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.UP);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/orderbottom.png',
                text : JSGDemo.resourceProvider.getString("Bottom"),
                tooltip : JSGDemo.resourceProvider.getString("To Bottom"),
                id : 'jsgorderbottombtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.TOBOTTOM);
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/ordertobottom.png',
                text : JSGDemo.resourceProvider.getString("Down"),
                tooltip : JSGDemo.resourceProvider.getString("Move Down"),
                id : 'jsgordertobottombtn',
                handler : function() {
                    if (JSGDemo.viewport.getActiveEditor())
                        JSGDemo.viewport.getActiveEditor().getInteractionHandler().changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.DOWN);
                }
            }]
        }]
    }, {
        title : JSGDemo.resourceProvider.getString("Layout"),
        id : 'tbLayout',
        style : {
            border : 'none'
        },
        items : [{
            xtype : 'toolbar',
            id : 'jsgtoolbarlayout',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                minWidth : 40,
                iconAlign : 'top',
                arrowAlign : 'right',
                cls : 'x-btn-icon'
            },
            cfgForce : ARAC.layout.defaultConfigStore.get('Force-CenterPoints').copy(),
            cfgTree : ARAC.layout.defaultConfigStore.get('Tree-CardinalPoints').copy(),
            cfgFlow : ARAC.layout.defaultConfigStore.get('Flow-CardinalPoints-Orth').copy(),
            cfgGrid : new ARAC.layout.grid.GridLayoutConfig({cellWidth : 1500, cellHeight : 1500}),
            createAracGraph : function(type, title, nodeCount, newEditor/*, randomSize*/) {
                var newEd = (newEditor == undefined ? true : newEditor);
                //var random = (randomSize == undefined ? false : randomSize);
                if (newEd) {
                    JSGDemo.modeltree.createModelItem("diagram", title);
                }
                var editor = JSGDemo.viewport.getActiveEditor();
                if (!editor)
                    return;
                
                var graph = editor.getGraph();    
                var generator = new ARAC.layout.tools.GraphGenerator();
                var support = new JSG.aracadapter.GraphGenSupport(graph);
                switch(type) {
                    case "force":
                        generator.genFlow(support, new ARAC.layout.tools.graphgen.FlowGenContext(
                            { nodeCount:nodeCount, endConCount:1/*,
                              nodePostProc:[ new ARAC.layout.tools.graphgen.proc.NodeSizeProc(1500, 0.0, 1500, 0.0) ]*/ }));
                        break;
                    case "tree":
                        generator.genTree(support, new ARAC.layout.tools.graphgen.TreeGenContext(
                            { nodeCount:nodeCount, levelAdd:nodeCount/3, leafAdd:2/*,
                              nodePostProc:[ new ARAC.layout.tools.graphgen.proc.NodeSizeProc(1500, 0.0, 1500, 0.0) ]*/ }));
                        break;
                    case "grid":
                        generator.genGrid(support, new ARAC.layout.tools.graphgen.GridGenContext(
                            { nodeCount:nodeCount,
                              nodePostProc:[ new ARAC.layout.tools.graphgen.proc.NodeSizeProc(500, 0.0, 500, 0.0) ] }));
                        break;
                    case "flow":
                        generator.genFlow(support, new ARAC.layout.tools.graphgen.FlowGenContext(
                            { nodeCount:nodeCount/*,
                              nodePostProc:[ new ARAC.layout.tools.graphgen.proc.NodeSizeProc(1500, 0.0, 1500, 0.0) ]*/ }));
                        break;
                }
                
                graph.markDirty();
                graph.setChanged(true);
                editor.invalidate();
            },
            executeAracLayout : function(config) {
                var editor = JSGDemo.viewport.getActiveEditor();
                var graph = editor.getGraph();
                var aracGraph = new JSG.aracadapter.AracGraphAdapter(graph);
                ARAC.layout.apply(aracGraph, config, new ARAC.layout.LayoutWatch());
                editor.invalidate();
//                var anim = new ARAC.layout.anim.Step({}, aracGraph, config,
//                  { invalidate: function() { JSGDemo.viewport.getActiveEditor().invalidate(); } });
//                anim.perform(3);
            },
            executeAracLayoutFromStore : function(name) {
                var editor = JSGDemo.viewport.getActiveEditor();
                var graph = editor.getGraph();
                var aracGraph = new JSG.aracadapter.AracGraphAdapter(graph);
                ARAC.layout.applyFromStore(aracGraph, name, new ARAC.layout.LayoutWatch());
                editor.invalidate();
            },
            items : [{
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Force:"),
                style : {
                    fontWeight : "bold"
                },
                minWidth : '40'
            }, {
                xtype : 'button',
                icon : 'resources/icons/forcecreate.png',
                id : 'createForce',
                text : JSGDemo.resourceProvider.getString("Create"),
                tooltip : JSGDemo.resourceProvider.getString("Create Graph for Force Layout"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Small Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("force", "Force Small", 64);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Medium Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("force", "Force Medium", 128);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Large Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("force", "Force Large", 256);
                        }
                    }]
                }
            }, {
                xtype : 'button',
                icon : /*TODO*/'resources/icons/force.png',
                id : 'executeForce',
                text : JSGDemo.resourceProvider.getString("Execute"),
                handler : function() {
                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                    cmp.executeAracLayout(cmp.cfgForce);
                }
            }, {
                xtype : 'button',
                icon : /*TODO*/'resources/icons/forcesettings.png',
                id : 'settingsForce',
                text : JSGDemo.resourceProvider.getString("Settings"),
                menu : {
                    plain : true,
                    width : 160,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                Ext.getCmp("forcerejection").setValue(cmp.cfgForce.rejection);
                                Ext.getCmp("forceattraction").setValue(cmp.cfgForce.attraction);
                                Ext.getCmp("forcegravitation").setValue(cmp.cfgForce.gravitation);
                            }
                        }
                    },
                    items : [{
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'forcerejection',
                        fieldLabel: JSGDemo.resourceProvider.getString('Rejection:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 200,
                        step: 1,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 200) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgForce.rejection = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'forceattraction',
                        fieldLabel: JSGDemo.resourceProvider.getString('Attraction:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 200,
                        step: 1,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 200) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgForce.attraction = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'forcegravitation',
                        fieldLabel: JSGDemo.resourceProvider.getString('Gravitation:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 200,
                        step: 1,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 200) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgForce.gravitation = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        text : JSGDemo.resourceProvider.getString("Apply"),
                        handler : function () {
                            var cmp = Ext.getCmp('jsgtoolbarlayout');
                            cmp.executeAracLayout(cmp.cfgForce);
                        }
                    }]
                }
            } , {
                xtype : 'text',
                minWidth : '20'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Tree:"),
                style : {
                    fontWeight : "bold"
                },
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/treecreate.png',
                id : 'createTree',
                text : JSGDemo.resourceProvider.getString("Create"),
                tooltip : JSGDemo.resourceProvider.getString("Create Graph for Tree Layout"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Small Tree"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("tree", "Tree Small", 64);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Medium Tree"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("tree", "Tree Medium", 256);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Large Tree"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("tree", "Tree Large", 512);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Two Trees"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("tree", "Double Tree", 64);
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("tree", "", 64, false/*, false*/);
                        }
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/tree.png',
                id : 'executeTree',
                text : JSGDemo.resourceProvider.getString("Execute"),
                handler : function() {
                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                    cmp.executeAracLayout(cmp.cfgTree);
                }
            }, {
                text : JSGDemo.resourceProvider.getString("Tree Layouts"),
                icon : 'resources/icons/treeconfig.png',
                id : 'predefinedTree',
                tooltip : JSGDemo.resourceProvider.getString("Layout Tree using predefined configuration"),
                menu : {
                    plain : true,
                    items : [{
                        xtype : 'buttongroup',
                        columns : 5,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            xtype : 'button',
                            width : 80,
                            height : 80
                        },
                        items : [{
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree Left</br>Aligned"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Head.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down (Left aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.TB-Pb.H');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Head.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right (Left aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.LR-Pb.H');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-BTT-Head.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree bottom up (Left aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.BT-Pb.H');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-RTL-Head.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree right to left (Left aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.RL-Pb.H');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree Center</br>Aligned"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.TB');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.LR');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-BTT-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree bottom up (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.BT');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-RTL-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree right to left (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.RL');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree Right</br>Aligned"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Tail.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down (Right aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.TB-Pb.T');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Tail.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right (Right aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.LR-Pb.T');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-BTT-Tail.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree bottom up (Right aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.BT-Pb.T');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-RTL-Tail.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree right to left (Right aligned)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('Tree-Lo.RL-Pb.T');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Single List"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListS-TTB-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("List top down (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListS-Lo.TB-Pb.HM');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListS-LTR-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("List left to right (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListS-Lo.LR-Pb.HM');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListS-BTT-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("List bottom up (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListS-Lo.BT-Pb.HM');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListS-RTL-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("List right to left (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListS-Lo.RL-Pb.HM');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Double List"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListD-TTB.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Double List top down (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListD-Lo.TB');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListD-LTR.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Double List left to right (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListD-Lo.LR');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListD-BTT.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Double List bottom up (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListD-Lo.BT');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeListD-RTL.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Double List right to left (Centered)"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('ListD-Lo.RL');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Horizontal</br>Vertical</br>Tree"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeHV-TTB-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("HV Tree top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('HV-Lo.TB-Pb.HM');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeHV-LTR-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("HV Tree left to right"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('HV-Lo.LR-Pb.HM');
                            }
                        }, , {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeHV-BTT-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("HV Tree bottom up"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('HV-Lo.BT-Pb.HM');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeHV-RTL-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("HV Tree right to left"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('HV-Lo.RL-Pb.HM');
                            }
                        }]
                    }]
                }
            } , {
                text : JSGDemo.resourceProvider.getString("OrgChart Layouts"),
                icon : 'resources/icons/treeconfig.png',
                id : 'predefinedOrgChart',
                tooltip : JSGDemo.resourceProvider.getString("OrgCharts using predefined configuration"),
                menu : {
                    plain : true,
                    items : [{
                        xtype : 'buttongroup',
                        columns : 3,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            xtype : 'button',
                            width : 80,
                            height : 80
                        },
                        items : [{
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree (TB) combined</br>with List"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Median-L2_TreeListS-TTB-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down / List top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListInTree-ToBottom4');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Median-L2_TreeListS-LTR-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down / List left to right"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListInTree-ToBottom1');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree (LR) combined</br>with List"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Median-L2_TreeListS-TTB-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right / List top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListInTree-ToRight1');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Median-L2_TreeListS-LTR-Median.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right / List left to right"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListInTree-ToRight4');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Tree combined</br>with Double List"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-LTR-Median-L2_TreeListD-TTB.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree left to right / Double list top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListDInTree-ToRight1');
                            }

                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/TreeNormal-TTB-Median-L2_TreeListD-TTB.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Tree top down / Double list top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('OrgChart-ListDInTree-ToBottom4');
                            }
                        }]
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/treesettings.png',
                id : 'settingsTree',
                text : JSGDemo.resourceProvider.getString("Settings"),
                menu : {
                    plain : true,
                    width : 200,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                Ext.getCmp("treestyle").setValue(cmp.cfgTree.treeStyle);
                                Ext.getCmp("treedirection").setValue(cmp.cfgTree.layoutOrientation);
                                Ext.getCmp("treeparentbalancing").setValue(cmp.cfgTree.parentBalancing);
                                Ext.getCmp("treelayerdistance").setValue(cmp.cfgTree.layerDistance);
                                Ext.getCmp("treenodedistance").setValue(cmp.cfgTree.nodeDistance);
                                Ext.getCmp("treeedgetype").setValue(cmp.cfgTree.edgeType);
                                Ext.getCmp("treelinecorners").setValue(cmp.cfgTree.edgeTypeDesc.lineCorners);
                                Ext.getCmp("treeelbowtype").setValue(cmp.cfgTree.edgeTypeDesc.elbow);
                                Ext.getCmp("treesrcslope").setValue(cmp.cfgTree.edgeTypeDesc.srcSlope);
                                Ext.getCmp("treetgtslope").setValue(cmp.cfgTree.edgeTypeDesc.tgtSlope);
                            }
                        }
                    },
                    items : [{
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'treestyle',
                        fieldLabel: JSGDemo.resourceProvider.getString('Style:'),
                        fieldStyle : { 'fontSize' : '8pt' },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  JSG.aracadapter.viewutil.TREE_STYLE_STORE,
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgTree.treeStyle = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'treedirection',
                        fieldLabel: JSGDemo.resourceProvider.getString('Direction:'),
                        fieldStyle : { 'fontSize' : '8pt' },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  JSG.aracadapter.viewutil.LAYOUT_ORIENTATION_STORE,
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgTree.layoutOrientation = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'treeparentbalancing',
                        fieldLabel: JSGDemo.resourceProvider.getString('Parent Balancing:'),
                        fieldStyle : { 'fontSize' : '8pt' },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  JSG.aracadapter.viewutil.PARENT_BALANCING_STORE,
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgTree.parentBalancing = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'treelayerdistance',
                        fieldLabel: JSGDemo.resourceProvider.getString('Layer Distance:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 10000,
                        step: 100,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgTree.layerDistance = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'treenodedistance',
                        fieldLabel: JSGDemo.resourceProvider.getString('Node Distance:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 10000,
                        step: 100,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgTree.nodeDistance = value;
                                }
                            }
                        }
                    }, '-', {
                      xtype: 'combobox',
                      anchor: '100%',
                      id : 'treeedgetype',
                      fieldLabel: JSGDemo.resourceProvider.getString('Edge Type:'),
                      fieldStyle : {
                          'fontSize' : '8pt'
                      },
                      labelWidth : 80,
                      editable : false,
                      margin : "5px",
                      store :  JSG.aracadapter.viewutil.EDGE_TYPE_STORE,
                      displayField : 'name',
                      valueField : 'value',
                      listeners: {
                          select : function(combo, records, opts) {
                              var cmp = Ext.getCmp('jsgtoolbarlayout');
                              cmp.cfgTree.edgeType = records[0].get('value');
                              switch (cmp.cfgTree.edgeType) {
                              case ARAC.layout.config.EdgeType.STRAIGHT:
                                Ext.getCmp("treeelbowtype").disable();
                                Ext.getCmp("treesrcslope").disable();
                                Ext.getCmp("treetgtslope").disable();
                                break;
                              case ARAC.layout.config.EdgeType.ELBOW:
                                Ext.getCmp("treeelbowtype").enable();
                                Ext.getCmp("treesrcslope").enable();
                                Ext.getCmp("treetgtslope").enable();
                                break;
                              case ARAC.layout.config.EdgeType.ORTHOGONAL:
                                Ext.getCmp("treeelbowtype").disable();
                                Ext.getCmp("treesrcslope").disable();
                                Ext.getCmp("treetgtslope").disable();
                                break;
                              }
                          }
                      }
                  }, {
                      xtype: 'numberfield',
                      anchor: '100%',
                      id : 'treelinecorners',
                      fieldLabel: JSGDemo.resourceProvider.getString('Line Corners:'),
                      fieldStyle : { 'fontSize' : '8pt' },
                      labelWidth : 80,
                      margin : "5px",
                      minValue : 0,
                      maxValue : 10000,
                      step: 50,
                      value: 1,
                        validator : function (value) {
                          return value >= 0 && value <= 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value <= 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgTree.edgeTypeDesc.lineCorners = value;
                                }
                            }
                        }
                    }, {
                      xtype: 'combobox',
                      anchor: '100%',
                      id : 'treeelbowtype',
                      fieldLabel: JSGDemo.resourceProvider.getString('Elbow Type:'),
                      fieldStyle : {
                          'fontSize' : '8pt'
                      },
                      labelWidth : 80,
                      editable : false,
                      margin : "5px",
                      store :  JSG.aracadapter.viewutil.ELBOW_TYPE,
                      displayField : 'name',
                      valueField : 'value',
                      listeners: {
                          select : function(combo, records, opts) {
                              var cmp = Ext.getCmp('jsgtoolbarlayout');
                              cmp.cfgTree.edgeTypeDesc.elbow = records[0].get('value');
                          }
                      }
                  }, {
                      xtype: 'numberfield',
                      anchor: '100%',
                      id : 'treesrcslope',
                      fieldLabel: JSGDemo.resourceProvider.getString('Source Slope:'),
                      fieldStyle : { 'fontSize' : '8pt' },
                      labelWidth : 80,
                      margin : "5px",
                      minValue : 0,
                      maxValue : 10000,
                      step: 50,
                      value: 1,
                        validator : function (value) {
                          return value >= 0 && value <= 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value <= 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgTree.edgeTypeDesc.srcSlope = value;
                                }
                            }
                        }
                    }, {
                      xtype: 'numberfield',
                      anchor: '100%',
                      id : 'treetgtslope',
                      fieldLabel: JSGDemo.resourceProvider.getString('Target Slope:'),
                      fieldStyle : { 'fontSize' : '8pt' },
                      labelWidth : 80,
                      margin : "5px",
                      minValue : 0,
                      maxValue : 10000,
                      step: 50,
                      value: 1,
                        validator : function (value) {
                          return value >= 0 && value <= 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value <= 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgTree.edgeTypeDesc.tgtSlope = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        text : JSGDemo.resourceProvider.getString("Apply"),
                        handler : function () {
                            var cmp = Ext.getCmp('jsgtoolbarlayout');
                            cmp.executeAracLayout(cmp.cfgTree);
                        }
                    }]
                }
            }, {
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Hierarchical:"),
                style : {
                    fontWeight : "bold"
                },
                minWidth : '70'
            }, {
                xtype : 'button',
                icon : 'resources/icons/flowcreate.png',
                id : 'createFlow',
                text : JSGDemo.resourceProvider.getString("Create"),
                tooltip : JSGDemo.resourceProvider.getString("Create Hierchical Graph"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Small Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("flow", "Flow Small", 64);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Medium Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("flow", "Flow Medium", 256);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Large Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("flow", "Flow Large", 512);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Two Graphs"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("flow", "Flow Double", 64);
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("flow", "", 64, false/*, false*/);
                        }
                    }]
                }
            }, {
                xtype : 'button',
                cls : 'x-btn-icon',
                icon : 'resources/icons/flow.png',
                id : 'executeFlow',
                text : JSGDemo.resourceProvider.getString("Execute"),
                tooltip : JSGDemo.resourceProvider.getString("Apply Flow Layout"),
                handler : function() {
                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                    cmp.executeAracLayout(cmp.cfgFlow);
                }

            } , {
                text : JSGDemo.resourceProvider.getString("Flow Layouts"),
                icon : 'resources/icons/flowconfig.png',
                id : 'predefinedFlow',
                tooltip : JSGDemo.resourceProvider.getString("Flow layouts using predefined configuration"),
                menu : {
                    plain : true,
                    items : [{
                        xtype : 'buttongroup',
                        columns : 5,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            xtype : 'button',
                            width : 80,
                            height : 80
                        },
                        items : [{
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Generic Flow"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/Flow-TTB-Normal.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Flow top down"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-TTB-N");
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/Flow-LTR-Normal.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Flow left to right"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-LTR-N");
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/Flow-BTT-Normal.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Flow bottom up"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-BTT-N");
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/Flow-RTL-Normal.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Flow right left"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-RTL-N");
                            }
                        },{
                          xtype : 'box',
                          html : JSGDemo.resourceProvider.getString("Generic Flow (LongestPath)"),
                          style : {
                              fontSize : '8pt',
                              textAlign : 'center',
                              display: 'table-cell',
                              verticalAlign: 'middle'
                          },
                      },  {
                          style : {
                            background : "#FAFAFA url(resources/icons/layout/Flow-TTB-LongestPath.png) no-repeat",
                            margin : "3px"
                        },
                        tooltip : JSGDemo.resourceProvider.getString("Flow top down"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-TTB-LP");
                        }
                      }, {
                          style : {
                              background : "#FAFAFA url(resources/icons/layout/Flow-LTR-LongestPath.png) no-repeat",
                              margin : "3px"
                          },
                          tooltip : JSGDemo.resourceProvider.getString("Flow left to right"),
                          handler : function() {
                              Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-LTR-LP");
                          }
                      }, {
                          style : {
                              background : "#FAFAFA url(resources/icons/layout/Flow-BTT-LongestPath.png) no-repeat",
                              margin : "3px"
                          },
                          tooltip : JSGDemo.resourceProvider.getString("Flow bottom up"),
                          handler : function() {
                              Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-BTT-LP");
                          }
                      }, {
                          style : {
                              background : "#FAFAFA url(resources/icons/layout/Flow-RTL-LongestPath.png) no-repeat",
                              margin : "3px"
                          },
                          tooltip : JSGDemo.resourceProvider.getString("Flow right left"),
                          handler : function() {
                              Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore("Flow-RTL-LP");
                          }
                      }]
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/flowsettings.png',
                id : 'settingsFlow',
                text : JSGDemo.resourceProvider.getString("Settings"),
                menu : {
                    plain : true,
                    width : 200,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                Ext.getCmp("flowdirection").setValue(cmp.cfgFlow.layoutOrientation);
                                Ext.getCmp("flowlayerdistance").setValue(cmp.cfgFlow.layerDistance);
                                Ext.getCmp("flownodedistance").setValue(cmp.cfgFlow.nodeDistance);
                                Ext.getCmp("flowedgestyle").setValue(cmp.cfgFlow.edgeType);
                                Ext.getCmp("flowlinecorners").setValue(cmp.cfgFlow.edgeTypeDesc.lineCorners);
                                Ext.getCmp("flowelbowtype").setValue(cmp.cfgFlow.edgeTypeDesc.elbow);
                                Ext.getCmp("flowsrcslope").setValue(cmp.cfgFlow.edgeTypeDesc.srcSlope);
                                Ext.getCmp("flowtgtslope").setValue(cmp.cfgFlow.edgeTypeDesc.tgtSlope);
                            }
                        }
                    },
                    items : [{
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'flowdirection',
                        fieldLabel: JSGDemo.resourceProvider.getString('Direction:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  JSG.aracadapter.viewutil.LAYOUT_ORIENTATION_STORE,
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgFlow.layoutOrientation = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'flowlayerdistance',
                        fieldLabel: JSGDemo.resourceProvider.getString('Layer Distance:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 10000,
                        step: 100,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgFlow.layerDistance = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'flownodedistance',
                        fieldLabel: JSGDemo.resourceProvider.getString('Node Distance:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 1,
                        maxValue : 10000,
                        step: 100,
                        value: 1,
                        validator : function (value) {
                            return value > 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgFlow.nodeDistance = value;
                                }
                            }
                        }
                    }, '-', {
                      xtype: 'combobox',
                      anchor: '100%',
                      id : 'flowedgestyle',
                      fieldLabel: JSGDemo.resourceProvider.getString('Edge Type:'),
                      fieldStyle : {
                          'fontSize' : '8pt'
                      },
                      labelWidth : 80,
                      editable : false,
                      margin : "5px",
                      store :  JSG.aracadapter.viewutil.EDGE_TYPE_STORE,
                      displayField : 'name',
                      valueField : 'value',
                      listeners: {
                          select : function(combo, records, opts) {
                              var cmp = Ext.getCmp('jsgtoolbarlayout');
                              cmp.cfgFlow.edgeType = records[0].get('value');
                              switch (cmp.cfgFlow.edgeType) {
                              case ARAC.layout.config.EdgeType.STRAIGHT:
                                Ext.getCmp("flowelbowtype").disable();
                                Ext.getCmp("flowsrcslope").disable();
                                Ext.getCmp("flowtgtslope").disable();
                                break;
                              case ARAC.layout.config.EdgeType.ELBOW:
                                Ext.getCmp("flowelbowtype").enable();
                                Ext.getCmp("flowsrcslope").enable();
                                Ext.getCmp("flowtgtslope").enable();
                                break;
                              case ARAC.layout.config.EdgeType.ORTHOGONAL:
                                Ext.getCmp("flowelbowtype").disable();
                                Ext.getCmp("flowsrcslope").disable();
                                Ext.getCmp("flowtgtslope").disable();
                                break;
                              }
                          }
                      }
                  }, {
                    xtype: 'numberfield',
                    anchor: '100%',
                    id : 'flowlinecorners',
                    fieldLabel: JSGDemo.resourceProvider.getString('Line Corners:'),
                    fieldStyle : { 'fontSize' : '8pt' },
                    labelWidth : 80,
                    margin : "5px",
                    minValue : 0,
                    maxValue : 10000,
                    step: 50,
                    value: 1,
                      validator : function (value) {
                        return value >= 0 && value <= 10000 ? true : "Error";
                      },
                      listeners: {
                          change: function(field, value) {
                              if (value >= 0 && value <= 10000) {
                                  var cmp = Ext.getCmp('jsgtoolbarlayout');
                                  cmp.cfgFlow.edgeTypeDesc.lineCorners = value;
                              }
                          }
                      }
                  }, {
                    xtype: 'combobox',
                    anchor: '100%',
                    id : 'flowelbowtype',
                    fieldLabel: JSGDemo.resourceProvider.getString('Elbow Type:'),
                    fieldStyle : {
                        'fontSize' : '8pt'
                    },
                    labelWidth : 80,
                    editable : false,
                    margin : "5px",
                    store :  JSG.aracadapter.viewutil.ELBOW_TYPE,
                    displayField : 'name',
                    valueField : 'value',
                    listeners: {
                        select : function(combo, records, opts) {
                            var cmp = Ext.getCmp('jsgtoolbarlayout');
                            cmp.cfgFlow.edgeTypeDesc.elbow = records[0].get('value');
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    anchor: '100%',
                    id : 'flowsrcslope',
                    fieldLabel: JSGDemo.resourceProvider.getString('Source Slope:'),
                    fieldStyle : { 'fontSize' : '8pt' },
                    labelWidth : 80,
                    margin : "5px",
                    minValue : 0,
                    maxValue : 10000,
                    step: 50,
                    value: 1,
                      validator : function (value) {
                        return value >= 0 && value <= 10000 ? true : "Error";
                      },
                      listeners: {
                          change: function(field, value) {
                              if (value >= 0 && value <= 10000) {
                                  var cmp = Ext.getCmp('jsgtoolbarlayout');
                                  cmp.cfgFlow.edgeTypeDesc.srcSlope = value;
                              }
                          }
                      }
                  }, {
                    xtype: 'numberfield',
                    anchor: '100%',
                    id : 'flowtgtslope',
                    fieldLabel: JSGDemo.resourceProvider.getString('Target Slope:'),
                    fieldStyle : { 'fontSize' : '8pt' },
                    labelWidth : 80,
                    margin : "5px",
                    minValue : 0,
                    maxValue : 10000,
                    step: 50,
                    value: 1,
                      validator : function (value) {
                        return value >= 0 && value <= 10000 ? true : "Error";
                      },
                      listeners: {
                          change: function(field, value) {
                              if (value >= 0 && value <= 10000) {
                                  var cmp = Ext.getCmp('jsgtoolbarlayout');
                                  cmp.cfgFlow.edgeTypeDesc.tgtSlope = value;
                              }
                          }
                      }
                  }, '-', {
                        xtype : 'button',
                        text : JSGDemo.resourceProvider.getString("Apply"),
                        handler : function () {
                            var cmp = Ext.getCmp('jsgtoolbarlayout');
                            cmp.executeAracLayout(cmp.cfgFlow);
                        }
                    }]
                }

            }, {
                xtype : 'text',
                minWidth : '20'
            }, {
                xtype : 'text',
                text : JSGDemo.resourceProvider.getString("Grid:"),
                style : {
                    fontWeight : "bold"
                },
                minWidth : '40'
            }, {
                xtype : 'button',
                icon : 'resources/icons/gridcreate.png',
                text : JSGDemo.resourceProvider.getString("Create"),
                tooltip : JSGDemo.resourceProvider.getString("Create Grid"),
                menu : {
                    items : [{
                        text : JSGDemo.resourceProvider.getString("Small Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("grid", "Grid Small", 64, true/*, true*/);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Medium Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("grid", "Grid Medium", 128, true/*, true*/);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Large Graph"),
                        handler : function() {
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("grid", "Grid Large", 256, true/*, true*/);
                        }
                    }, {
                        text : JSGDemo.resourceProvider.getString("Two Graphs"),
                        handler : function() {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("grid", editor, 64);
                            Ext.getCmp('jsgtoolbarlayout').createAracGraph("grid", editor, 64, false/*, true*/);
                        }
                    }]
                }
            }, {
                xtype : 'button',
                cls : 'x-btn-icon',
                icon : 'resources/icons/grid.png',
                id : 'createGrid',
                text : JSGDemo.resourceProvider.getString("Execute"),
                tooltip : JSGDemo.resourceProvider.getString("Apply Grid Layout"),
                handler : function() {
                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                    cmp.executeAracLayout(cmp.cfgGrid);
                }

            } , {
                text : JSGDemo.resourceProvider.getString("Grid Layouts"),
                icon : 'resources/icons/gridconfig.png',
                id : 'predefinedGrid',
                tooltip : JSGDemo.resourceProvider.getString("Grid layouts using predefined configuration"),
                menu : {
                    plain : true,
                    items : [{
                        xtype : 'buttongroup',
                        columns : 5,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            xtype : 'button',
                            width : 80,
                            height : 80
                        },
                        items : [{
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("n Items per row"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-RowPxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("n Items per row, x/y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-RowPxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-RowPxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("n Items per row, x ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-RowPxNy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-RowNxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("n Items per row, y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-RowNxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-RowNxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("n Items per row"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-RowNxNy');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("n Items per column"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-ColPxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("x Items per column, x/y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-ColPxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-ColPxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("x Items per column, x ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-ColPxNy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-ColNxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("x Items per column, y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-ColNxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridDistance-ColNxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("x Items per column"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridDistance-ColNxNy');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Matrix Align by Row"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-RowPxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Row x/y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-RowPxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-RowPxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Row, x ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-RowPxNy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-RowNxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Row, y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-RowNxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-RowNxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Row"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-RowNxNy');
                            }
                        }, {
                            xtype : 'box',
                            html : JSGDemo.resourceProvider.getString("Matrix Align by Column"),
                            style : {
                                fontSize : '8pt',
                                textAlign : 'center',
                                display: 'table-cell',
                                verticalAlign: 'middle'
                            },
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-ColPxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Column, x/y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-ColPxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-ColPxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Column, x ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-ColPxNy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-ColNxPy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Column, y ascending"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-ColNxPy');
                            }
                        }, {
                            style : {
                                background : "#FAFAFA url(resources/icons/layout/GridRaster-ColNxNy.png) no-repeat",
                                margin : "3px"
                            },
                            tooltip : JSGDemo.resourceProvider.getString("Align by Column"),
                            handler : function() {
                                Ext.getCmp('jsgtoolbarlayout').executeAracLayoutFromStore('GridRaster-ColNxNy');
                            }
                        }]
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/gridsettings.png',
                id : 'settingsGrid',
                text : JSGDemo.resourceProvider.getString("Settings"),
                menu : {
                    plain : true,
                    width : 200,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                Ext.getCmp("gridtype").setValue(cmp.cfgGrid.type);
                                Ext.getCmp("griddirection").setValue(cmp.cfgGrid.direction);
                                Ext.getCmp("gridcellcount").setValue(cmp.cfgGrid.cellCount);
                                Ext.getCmp("gridcolgap").setValue(cmp.cfgGrid.colGap);
                                Ext.getCmp("gridrowgap").setValue(cmp.cfgGrid.rowGap);
                            }
                        }
                    },
                    items : [{
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'gridtype',
                        fieldLabel: JSGDemo.resourceProvider.getString('Type:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value": 1, "name": "Flow"},
                                {"value": 2, "name": "Matrix"},
                                {"value": 3, "name": "Back"}
                                //...
                            ]
                        }),
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgGrid.type = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'combobox',
                        anchor: '100%',
                        id : 'griddirection',
                        fieldLabel: JSGDemo.resourceProvider.getString('Direction:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        editable : false,
                        margin : "5px",
                        store :  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value": 1, "name":"By Row"},
                                {"value": 2, "name":"By Column"}
                                //...
                            ]
                        }),
                        displayField : 'name',
                        valueField : 'value',
                        listeners: {
                            select : function(combo, records, opts) {
                                var cmp = Ext.getCmp('jsgtoolbarlayout');
                                cmp.cfgGrid.direction = records[0].get('value');
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'gridcellcount',
                        fieldLabel: JSGDemo.resourceProvider.getString('Items per Line:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 0,
                        maxValue : 1000,
                        step: 1,
                        value: 0,
                        validator : function (value) {
                            return value >= 0 && value < 1000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 1000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgGrid.cellCount = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'gridrowgap',
                        fieldLabel: JSGDemo.resourceProvider.getString('Row Gap:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 0,
                        maxValue : 10000,
                        step: 100,
                        value: 0,
                        validator : function (value) {
                            return value >= 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgGrid.rowGap = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'gridcolgap',
                        fieldLabel: JSGDemo.resourceProvider.getString('Column Gap:'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 0,
                        maxValue : 10000,
                        step: 100,
                        value: 0,
                        validator : function (value) {
                            return value >= 0 && value < 10000 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 10000) {
                                    var cmp = Ext.getCmp('jsgtoolbarlayout');
                                    cmp.cfgGrid.colGap = value;
                                }
                            }
                        }
                    }, '-', {
                        xtype : 'button',
                        text : JSGDemo.resourceProvider.getString("Apply"),
                        handler : function () {
                            var cmp = Ext.getCmp('jsgtoolbarlayout');
                            cmp.executeAracLayout(cmp.cfgGrid);
                        }
                    }]
                }
            }]
        }]
    }, {
        title : JSGDemo.resourceProvider.getString("View"),
        id : 'tbView',
        style : {
            border : 'none'
        },
        items : [{
            xtype : 'toolbar',
            id : 'jsgtoolbarview',
            enableOverflow : true,
            defaults : {
                scale : 'medium',
                minWidth : 40,
                iconAlign : 'top',
                arrowAlign : 'right',
                cls : 'x-btn-icon'
            },
            items : [{
                xtype : 'text',
                minWidth : '10'
            }, {
                xtype : 'button',
                icon : 'resources/icons/pagesize.png',
                text : JSGDemo.resourceProvider.getString('Page Size'),
                id : 'jsgviewpagesize',
                menu : {
                    plain : true,
                    width : 175,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                switch (editor.getGraphSettings().getPage().getFormat()) {
                                    case JSG.graph.model.settings.PageSize.A0:
                                        Ext.getCmp("sizea0").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.A1:
                                        Ext.getCmp("sizea1").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.A2:
                                        Ext.getCmp("sizea2").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.A3:
                                        Ext.getCmp("sizea3").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.A4:
                                        Ext.getCmp("sizea4").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.A5:
                                        Ext.getCmp("sizea5").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.B3:
                                        Ext.getCmp("sizeb3").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.B4:
                                        Ext.getCmp("sizeb4").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.B5:
                                        Ext.getCmp("sizeb5").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.LETTER:
                                        Ext.getCmp("sizeletter").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.LEGAL:
                                        Ext.getCmp("sizelegal").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageSize.LEDGER:
                                        Ext.getCmp("sizeledger").toggle(true, true);
                                        break;
                                }
                                Ext.getCmp("pagewidth").setValue(editor.getGraphSettings().getPage().getWidth() / 100);
                                Ext.getCmp("pageheight").setValue(editor.getGraphSettings().getPage().getHeight() / 100);
                            }
                        }
                    },
                    items : [{
                        xtype : 'buttongroup',
                        columns : 4,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            scale : 'large',
                            iconAlign : 'top'
                        },
                        items : [{
                            icon : 'resources/icons/pagea0.png',
                            id : 'sizea0',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A0);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagea1.png',
                            id : 'sizea1',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A1);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagea2.png',
                            id : 'sizea2',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A2);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagea3.png',
                            id : 'sizea3',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A3);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagea4.png',
                            id : 'sizea4',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A4);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagea5.png',
                            id : 'sizea5',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.A5);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pageb3.png',
                            id : 'sizeb3',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.B3);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pageb4.png',
                            id : 'sizeb4',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.B4);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pageb5.png',
                            id : 'sizeb5',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.B5);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pageletter.png',
                            id : 'sizeletter',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.LETTER);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pagelegal.png',
                            id : 'sizelegal',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.LEGAL);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            icon : 'resources/icons/pageledger.png',
                            id : 'sizeledger',
                            toggleGroup : 'pagesize',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setFormat(JSG.graph.model.settings.PageSize.LEDGER);
                                    editor.invalidate();
                                }
                            }
                        }]
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'pagewidth',
                        fieldLabel: JSGDemo.resourceProvider.getString('Width (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 50,
                        maxValue : 2000,
                        step: 1,
                        value: 0,
                        validator : function (value) {
                            return value > 50 && value < 2000 ? true : "Error";
                              
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 50 && value < 2000) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setWidth(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'pageheight',
                        fieldLabel: JSGDemo.resourceProvider.getString('Height (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        labelWidth : 80,
                        margin : "5px",
                        minValue : 50,
                        maxValue : 2000,
                        step: 1,
                        value: 0,
                        validator : function (value) {
                            return value > 50 && value < 2000 ? true : "Error";
                              
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value > 50 && value < 2000) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setHeight(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/pageorientation.png',
                id : 'jsgviewpageorientation',
                text : JSGDemo.resourceProvider.getString('Orientation'),
                menu : {
                    plain : true,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                switch (editor.getGraphSettings().getPage().getOrientation()) {
                                    case JSG.graph.model.settings.PageOrientation.PORTRAIT:
                                        Ext.getCmp("portrait").toggle(true, true);
                                        break;
                                    case JSG.graph.model.settings.PageOrientation.LANDSCAPE:
                                        Ext.getCmp("landscape").toggle(true, true);
                                        break;
                                }
                            }
                        }
                    },
                    items : [{
                        xtype : 'buttongroup',
                        columns : 1,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            scale : 'large',
                            iconAlign : 'left'
                        },
                        items : [{
                            icon : 'resources/icons/pageportrait.png',
                            text : JSGDemo.resourceProvider.getString("Portrait"),
                            id : 'portrait',
                            width : 120,
                            toggleGroup : 'pageorientation',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setOrientation(JSG.graph.model.settings.PageOrientation.PORTRAIT);
                                    editor.invalidate();
                                }
                            }
                        }, {
                            text : JSGDemo.resourceProvider.getString("Landscape"),
                            icon : 'resources/icons/pagelandscape.png',
                            id : 'landscape',
                            width : 120,
                            toggleGroup : 'pageorientation',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().getPage().setOrientation(JSG.graph.model.settings.PageOrientation.LANDSCAPE);
                                    editor.invalidate();
                                }
                            }
                        }]
                    }]
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/pageborders.png',
                id : 'jsgviewpagemargins',
                text : JSGDemo.resourceProvider.getString('Margins'),
                menu : {
                    plain : true,
                    width : 160,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                Ext.getCmp("leftmargin").setValue(editor.getGraphSettings().getPage().getLeftMargin() / 100);
                                Ext.getCmp("topmargin").setValue(editor.getGraphSettings().getPage().getTopMargin() / 100);
                                Ext.getCmp("rightmargin").setValue(editor.getGraphSettings().getPage().getRightMargin() / 100);
                                Ext.getCmp("bottommargin").setValue(editor.getGraphSettings().getPage().getBottomMargin() / 100);
                                Ext.getCmp("headermargin").setValue(editor.getGraphSettings().getPage().getHeaderMargin() / 100);
                                Ext.getCmp("footermargin").setValue(editor.getGraphSettings().getPage().getFooterMargin() / 100);
                            }
                        }
                    },
                    items: [{
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'leftmargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Left (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setLeftMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'topmargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Top (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setTopMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'rightmargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Right (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setRightMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'bottommargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Bottom (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setBottomMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'headermargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Header (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setHeaderMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }, '-', {
                        xtype: 'numberfield',
                        anchor: '100%',
                        id : 'footermargin',
                        fieldLabel: JSGDemo.resourceProvider.getString('Footer (mm):'),
                        fieldStyle : {
                            'fontSize' : '8pt'
                        },
                        margin : "5px",
                        minValue : 0,
                        step: 5,
                        value: 0,
                        labelWidth : 80,
                        validator : function (value) {
                            return value >= 0 && value < 200 ? true : "Error";
                        },
                        listeners: {
                            change: function(field, value) {
                                if (value >= 0 && value < 200) {
                                    var editor = JSGDemo.viewport.getActiveEditor();
                                    if (editor) {
                                        editor.getGraphSettings().getPage().setFooterMargin(value * 100);
                                        editor.invalidate();                                
                                    }
                                }
                            }
                        }
                    }]
                }                
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('View Mode'),
                id : 'jsgviewmode',
                icon : 'resources/icons/viewmode.png',
                menu : {
                    plain : true,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                switch (editor.getGraphSettings().getDisplayMode()) {
                                    case JSG.ui.graphics.DisplayMode.ENDLESS:
                                        Ext.getCmp("viewmodeendless").toggle(true, true);
                                        break;
                                    case JSG.ui.graphics.DisplayMode.PAGE:
                                        Ext.getCmp("viewmodepage").toggle(true, true);
                                        break;
                                }
                            }
                        }
                    },
                    items : [{
                        xtype : 'buttongroup',
                        columns : 1,
                        style : {
                            backgroundColor : "transparent",
                            borderColor : "transparent"
                        },
                        defaults : {
                            scale : 'large',
                            iconAlign : 'left'
                        },
                        items : [{
                            icon : 'resources/icons/viewmodeendless.png',
                            text : JSGDemo.resourceProvider.getString("Endless Paper"),
                            id : 'viewmodeendless',
                            width : 120,
                            toggleGroup : 'viewmode',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().setDisplayMode(JSG.ui.graphics.DisplayMode.ENDLESS);
                                    editor.invalidate();                                
                                }
                            }
                        }, {
                        text : JSGDemo.resourceProvider.getString("Show Pages"),
                            icon : 'resources/icons/viewmodepage.png',
                            id : 'viewmodepage',
                            width : 120,
                            toggleGroup : 'viewmode',
                            toggleHandler : function() {
                                var editor = JSGDemo.viewport.getActiveEditor();
                                if (editor) {
                                    editor.getGraphSettings().setDisplayMode(JSG.ui.graphics.DisplayMode.PAGE);
                                    editor.invalidate();
                                }
                            }
                        }]
                    }]
                }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Zoom'),
                icon : 'resources/icons/zoom.png',
                id : 'jsgviewzoom',
                menu : {
                    plain : true,
                    width : 181,
                    listeners : {
                        show : function(menu, eOpts) {
                            var editor = JSGDemo.viewport.getActiveEditor();
                            if (editor) {
                                var sldZoom = menu.down('slider');
                                var zoom = editor.getZoom();
                                sldZoom.setValue(zoom * 100);

                                if (zoom == 0.25) {
                                    Ext.getCmp("zoom25").setChecked(true);
                                } else if (zoom == 0.5) {
                                    Ext.getCmp("zoom50").setChecked(true);
                                } else if (zoom == 0.75) {
                                    Ext.getCmp("zoom75").setChecked(true);
                                } else if (zoom == 1) {
                                    Ext.getCmp("zoom100").setChecked(true);
                                } else if (zoom == 1.5) {
                                    Ext.getCmp("zoom150").setChecked(true);
                                } else if (zoom == 2) {
                                    Ext.getCmp("zoom200").setChecked(true);
                                } else if (zoom == 4) {
                                    Ext.getCmp("zoom400").setChecked(true);
                                }
                            }
                        }
                    },
                    setZoom : function (value) {
                        var editor = JSGDemo.viewport.getActiveEditor();
                        if (editor) {
                            editor.setZoom(value / 100);
                        }
                        
                    },
                    items : [{
                        xtype : 'menucheckitem',
                        text : '25 %',
                        id : 'zoom25',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(25);
                        }
                    }, {
                        xtype : 'menucheckitem',
                        text : '50 %',
                        id : 'zoom50',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(50);
                        }
                    }, {
                        text : '75 %',
                        xtype : 'menucheckitem',
                        id : 'zoom75',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(75);
                        }
                    }, {
                        xtype : 'menucheckitem',
                        text : '100 %',
                        id : 'zoom100',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(100);
                        }
                    }, {
                        xtype : 'menucheckitem',
                        text : '150 %',
                        id : 'zoom150',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(150);
                        }
                    }, {
                        xtype : 'menucheckitem',
                        text : '200 %',
                        id : 'zoom200',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(200);
                        }
                    }, {
                        xtype : 'menucheckitem',
                        text : '400 %',
                        id : 'zoom400',
                        group : 'pagezoom',
                        handler : function(btn) {
                            btn.up('menu').setZoom(400);
                        }
                    }, '-', {
                        xtype : 'menucheckitem',
                        xtype : 'text',
                        text : JSGDemo.resourceProvider.getString("Custom Zoom"),
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
                        increment : 5,
                        minValue : 10,
                        maxValue : 400,
                        width : 198,
                        listeners : {
                            change : function(slider, newValue, thumb, eOpts) {
                                slider.up('menu').setZoom(newValue);
                            }
                        }
                    }]
                }
            }, {
                xtype : 'button',
                text : JSGDemo.resourceProvider.getString('Zoom to Fit'),
                icon : 'resources/icons/zoomtofit.png',
                id : 'jsgviewzoomtofit',
                handler : function() {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        editor.setZoom(JSG.ui.GraphEditor.ZOOM_FIT);
                    }
                }
            }, {
                xtype : 'text',
                minWidth : '35'
            }, {
                xtype : 'button',
                icon : 'resources/icons/grid.png',
                text : JSGDemo.resourceProvider.getString('Grid'),
                id : 'jsgviewgrid',
                enableToggle : true,
                toggleHandler : function(btn, state) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        editor.getGraphSettings().setGridVisible(state);                        editor.invalidate();
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/scalevisible.png',
                text : JSGDemo.resourceProvider.getString('Scale'),
                id : 'jsgviewscale',
                enableToggle : true,
                toggleHandler : function(btn, state) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        editor.getGraphSettings().setScaleVisible(state);
                        editor.invalidate();
                    }
                }
            }, {
                xtype : 'button',
                icon : 'resources/icons/portsvisible.png',
                text : JSGDemo.resourceProvider.getString('Ports'),
                id : 'jsgviewports',
                enableToggle : true,
                toggleHandler : function(btn, state) {
                    var editor = JSGDemo.viewport.getActiveEditor();
                    if (editor) {
                        editor.getGraphSettings().setPortsVisible(state);
                        editor.invalidate();
                    }
                }
            }]
        }]
    }],
    getInput : function(title, infotext, label, callback) {
        var win = Ext.create('Ext.window.Window', {
            title : title,
            width : 450,
            height : 150,
            layout : 'fit',
            modal : true,
    
            items : [{
                plain : true,
                border : 0,
                bodyPadding : 5,
                fieldDefaults : {
                    labelWidth : 55,
                    anchor : '100%'
                },
                layout : {
                    type : 'vbox',
                    align : 'stretch' // Child items are stretched to full width
                },
                items : [{
                    xtype : 'label',
                    text : infotext,
                    margin : '0, 0, 20, 0'   
                }, {
                    xtype : 'textfield',
                    fieldLabel : label,
                    id : 'dlginput',
                    name : 'subject'
                }],
            }],
            dockedItems : [{
                xtype : 'toolbar',
                dock : 'bottom',
                ui : 'footer',
                layout : {
                    pack : 'center'
                },
                items : [{
                    minWidth : 80,
                    text : JSGDemo.resourceProvider.getString('OK'),
                    handler : function() {
                        var value = Ext.getCmp('dlginput').getValue();
                        this.up('window').close();
                        callback(value);
                    }
                }, {
                    minWidth : 80,
                    text : JSGDemo.resourceProvider.getString('Cancel'),
                    handler : function() {
                        this.up('window').close();
                    }
                }]
            }]
        });
        win.show();
    },
    onSelectionChanged : function(notification) {
        this.tbUpdate = true;
    },
    updateToolbarIdle : function() {
        if (this.tbUpdate)
            this.updateToolbarWorker();
        return true;
    },
    updateToolbar : function() {
        this.tbUpdate = true;
    },
    updateToolbarWorker : function() {
        if (!this.tbUpdate)
            return;
            
        var editor = JSGDemo.viewport.getActiveEditor();
        var anyEditor = editor ? true : false;
        var selection = editor ? editor.getGraphViewer().getSelection() : undefined;
        var singleSelection = (selection != undefined) && (selection.length === 1) && anyEditor;
        var anySelection = (selection != undefined) && (selection.length > 0) && anyEditor;
        var multiSelection = (selection != undefined) && (selection.length > 1) && anyEditor;
        var enabled;
        var btn;
        
        var tabs = Ext.getCmp('jsgtoolbartabs');
        tab = tabs.getActiveTab();

        switch (tab.id) {
            case 'tbStart':
                btn = Ext.getCmp('jsgsavebtn');
                if (btn != undefined) {
                    if (anyEditor) {
                        var graph = editor.getGraph();
                        if (graph) {
                            btn.setDisabled(!graph.isChanged());
                        }
                    } else { 
                        btn.setDisabled(true);
                    }
                }  
                btn = Ext.getCmp('jsgprintbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgundobtn');
                if (btn != undefined) {
                    enabled = anyEditor && editor.getInteractionHandler().isUndoAvailable();
                    btn.setDisabled(!enabled);
                }  
                btn = Ext.getCmp('jsgredobtn');
                if (btn != undefined) {
                    enabled = anyEditor && editor.getInteractionHandler().isRedoAvailable();
                    btn.setDisabled(!enabled);
                }  
                btn = Ext.getCmp('jsgcopylargebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgcopybtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgcopyformatbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgcutbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgpastelargebtn');
                if (btn != undefined) {
                    enabled = anyEditor && (editor.getInteractionHandler().isPasteAvailable() || editor.getInteractionHandler().isPasteFormatAvailable());
                    btn.setDisabled(!enabled);
                }  
                btn = Ext.getCmp('jsgpastebtn');
                if (btn != undefined) {
                    enabled = anyEditor && editor.getInteractionHandler().isPasteAvailable();
                    btn.setDisabled(!enabled);
                }  
                btn = Ext.getCmp('jsgpasteformatbtn');
                if (btn != undefined) {
                    enabled = anyEditor && editor.getInteractionHandler().isPasteFormatAvailable();
                    btn.setDisabled(!enabled);
                }  
                btn = Ext.getCmp('jsgdeletebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsglinebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsghvlinebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgellipsebtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgrectbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgpolygonbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgpolylinebtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgbezierbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgtextbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsglinefmtbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgfillfmtbtnstart');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('editpointsstart');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                break;
            case 'tbInsert':
                btn = Ext.getCmp('jsglinesbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgellipsebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgrectbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgpolygonbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgpolylinebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgbezierbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgtextbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgtextbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgshapessbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  

                btn = Ext.getCmp('jsgcontainerbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgimagebtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsghyperlinkbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgheaderbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgfooterbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  

                btn = Ext.getCmp('jsgfilterbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                break;
            case 'tbFormat':
                if (singleSelection) {
                    var model = selection[0].getModel();
                    var bbox = model.getBoundingBox();
                    var cmp = Ext.getCmp('posX');
                    if (cmp) {
                        cmp.setRawValue(bbox.getLeft() / 100);
                        cmp.setDisabled(false);
                    }
                    cmp = Ext.getCmp('posY');
                    if (cmp) {
                        cmp.setRawValue(bbox.getTop() / 100);
                        cmp.setDisabled(false);
                    }
                    cmp = Ext.getCmp('posWidth');
                    if (cmp) {
                        cmp.setRawValue(bbox.getWidth() / 100);
                        cmp.setDisabled(false);
                    }
                    cmp = Ext.getCmp('posHeight');
                    if (cmp) {
                        cmp.setRawValue(bbox.getHeight() / 100);
                        cmp.setDisabled(false);
                    }
                } else {
                    var cmp = Ext.getCmp('posX');
                    cmp.setRawValue("");
                    cmp.setDisabled(true);
                    var cmp = Ext.getCmp('posY');
                    cmp.setRawValue("");
                    cmp.setDisabled(true);
                    var cmp = Ext.getCmp('posWidth');
                    cmp.setRawValue("");
                    cmp.setDisabled(true);
                    var cmp = Ext.getCmp('posHeight');
                    cmp.setRawValue("");
                    cmp.setDisabled(true);
                }
                btn = Ext.getCmp('jsglinefmtbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgfillfmtbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgshadowfmtbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgfontfmtbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                btn = Ext.getCmp('jsgtextfmtbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }  
                break;
            case 'tbChange':
                btn = Ext.getCmp('editpoints');
                if (btn != undefined) {
                    btn.setDisabled(!singleSelection);
                }  
                btn = Ext.getCmp('group');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }  
                btn = Ext.getCmp('ungroup');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }
                  
                btn = Ext.getCmp('jsgalignleftbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgaligncenterbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgalignrightbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgaligntopbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgalignmiddlebtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgalignbottombtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                
                btn = Ext.getCmp('jsgalignvdistributebtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgalignhdistributebtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                
                btn = Ext.getCmp('jsgvsizemaxbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsgvsizeminbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsghsizemaxbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }
                btn = Ext.getCmp('jsghsizeminbtn');
                if (btn != undefined) {
                    btn.setDisabled(!multiSelection);
                }

                btn = Ext.getCmp('jsgordertopbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }
                btn = Ext.getCmp('jsgordertotopbtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }
                btn = Ext.getCmp('jsgorderbottombtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }
                btn = Ext.getCmp('jsgordertobottombtn');
                if (btn != undefined) {
                    btn.setDisabled(!anySelection);
                }
                break;
            case 'tbLayout':
                btn = Ext.getCmp('executeForce');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('settingsForce');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('predefinedTree');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('predefinedOrgChart');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('executeTree');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('settingsTree');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('predefinedFlow');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('executeFlow');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('settingsFlow');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('predefinedGrid');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('executeGrid');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('settingsGrid');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                break;
            case 'tbView':
                btn = Ext.getCmp('jsgviewpagesize');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewpageorientation');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewpagemargins');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewmode');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewzoom');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewzoomtofit');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                }  
                btn = Ext.getCmp('jsgviewgrid');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                    if (editor) {
                        btn.toggle(editor.getGraphSettings().getGridVisible());
                    }
                }  
                btn = Ext.getCmp('jsgviewscale');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                    if (editor) {
                        btn.toggle(editor.getGraphSettings().getScaleVisible());
                    }
                }  
                btn = Ext.getCmp('jsgviewports');
                if (btn != undefined) {
                    btn.setDisabled(!anyEditor);
                    if (editor) {
                        btn.toggle(editor.getGraphSettings().getPortsVisible());
                    }
                }  

                break;
        }

        this.tbUpdate = false;
        
    },
    initComponent : function() {
        this.callParent(arguments);

        if (!JSG.touchDevice) {
            Ext.TaskManager.start({
                run : this.updateToolbarIdle,
                interval : 500, // every half second
                scope : this
            });
        }
    }
});

