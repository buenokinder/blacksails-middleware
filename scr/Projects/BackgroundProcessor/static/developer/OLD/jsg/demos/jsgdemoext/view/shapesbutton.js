Ext.define('JSGDemo.view.ShapesButton', {
    extend : 'Ext.SplitButton',
    alias : 'widget.shapesbutton',
    cls : 'x-btn-icon',
    id : 'jsgshapesbtn',
    icon : 'resources/icons/shapes/polyedge4.png',
    iconAlign : 'right',
    arrowAlign : 'right',
    tooltip : JSGDemo.resourceProvider.getString("Create Shape"),
    createItem : function(btn) {
        var node = JSG.graphItemFactory.createItemFromString(btn.getId());
        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateItemInteraction(node));
        this.selectedItem = btn.getId();
        //we use rect.png as icon for container node, so:
        var icon = this.selectedItem; //to be removed...
        this.setIcon('resources/icons/shapes/' + icon + '.png');
        this.menu.hide();
    },
    selectedItem : "polyedge4",
    handler : function(button) {
        var node = JSG.graphItemFactory.createItemFromString(button.selectedItem);
        JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateItemInteraction(node));
    },
    menu : {
        plain : true,
        items : [{
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("General"),
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
            defaults : {
                scale : 'medium'
            },
            items : [{
                icon : 'resources/icons/shapes/polyedge4.png',
                id : 'polyedge4',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/polyedge5.png',
                id : 'polyedge5',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/polyedge6.png',
                id : 'polyedge6',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/polyedge8.png',
                id : 'polyedge8',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/polyedge10.png',
                id : 'polyedge10',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/polyedge12.png',
                id : 'polyedge12',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/triangleleft.png',
                id : 'triangleLeft',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/triangletop.png',
                id : 'triangleTop',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/triangleright.png',
                id : 'triangleRight',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/trianglebottom.png',
                id : 'triangleBottom',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketsimpleboth.png',
                id : 'bracketSimpleBoth',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketsimpleleft.png',
                id : 'bracketSimpleLeft',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketsimpleright.png',
                id : 'bracketSimpleRight',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketcurvedboth.png',
                id : 'bracketCurvedBoth',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketcurvedleft.png',
                id : 'bracketCurvedLeft',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/bracketcurvedright.png',
                id : 'bracketCurvedRight',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/cube.png',
                id : 'cube',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/cylinder.png',
                id : 'cylinder',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Arrows"),
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
            defaults : {
                scale : 'medium'
            },
            items : [{
                icon : 'resources/icons/shapes/arrowleft.png',
                id : 'arrowLeft',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/arrowright.png',
                id : 'arrowRight',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/arrowup.png',
                id : 'arrowUp',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/arrowdown.png',
                id : 'arrowDown',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/arrowdblvert.png',
                id : 'arrowDblVert',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/arrowdblhorz.png',
                id : 'arrowDblHorz',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Rectangles"),
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
            defaults : {
                scale : 'medium'
            },
            columns : 6,
            items : [{
                icon : 'resources/icons/shapes/rect.png',
                id : 'rect',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/rectcornercut.png',
                id : 'rectCornerCut',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/rectcornercutsame.png',
                id : 'rectCornerCutSame',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/rectcornercutdiagonal.png',
                id : 'rectCornerCutDiagonal',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/roundrect.png',
                id : 'roundRect',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/roundrectcornercut.png',
                id : 'roundRectCornerCut',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/roundrectcornercutsame.png',
                id : 'roundRectCornerCutSame',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/roundrectcornercutdiagonal.png',
                id : 'roundRectCornerCutDiagonal',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Stars"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        },  {
            xtype : 'buttongroup',
            columns : 6,
            style : {
                backgroundColor : "transparent",
                borderColor : "transparent"
            },
            defaults : {
                scale : 'medium'
            },
            items : [{
                icon : 'resources/icons/shapes/star3.png',
                id : 'star3',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/star4.png',
                id : 'star4',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/star5.png',
                id : 'star5',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/star6.png',
                id : 'star6',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/star8.png',
                id : 'star8',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/star12.png',
                id : 'star12',
                handler : function() {
                    Ext.getCmp('jsgshapesbtn').createItem(this);
                }
            }]
        }]
    },
    initComponent : function() {
        this.callParent(arguments);
    }
});
