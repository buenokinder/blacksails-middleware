Ext.define('JSGDemo.view.LinesButton', {
    extend : 'Ext.SplitButton',
    alias : 'widget.linesbutton',
    cls : 'x-btn-icon',
    id : 'jsglinesbtn',
    icon : 'resources/icons/shapes/edge.png',
    iconAlign : 'right',
    arrowAlign : 'right',
    tooltip : JSGDemo.resourceProvider.getString("Create Line"),
    createItem : function(btn) {
        var label = undefined;
        var item;
        if (btn)
            this.selectedItem = btn.getId();
        switch (this.selectedItem) {
            case "edgeLabel":
                label = JSGDemo.resourceProvider.getString('Label');
                item = JSG.graphItemFactory.createItemFromString('edge');
                break;
            case "orthogonalEdgeLabel":
                label = JSGDemo.resourceProvider.getString('Label');
                item = JSG.graphItemFactory.createItemFromString('orthogonalEdge');
                break;
            case "orthogonalRoundedEdgeLabel":
                label = JSGDemo.resourceProvider.getString('Label');
                item = JSG.graphItemFactory.createItemFromString('orthogonalRoundedEdge');
                break;
            default:
                item = JSG.graphItemFactory.createItemFromString(this.selectedItem);
                break;
        }

        if (item.getShape() instanceof JSG.graph.model.shapes.OrthoLineShape)
            JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateOrthoEdgeInteraction(item, undefined, label));
        else
            JSGDemo.viewport.getActiveEditor().getInteractionHandler().setActiveInteraction(new JSG.graph.interaction.CreateEdgeInteraction(item, label));

        this.setIcon('resources/icons/shapes/' + this.selectedItem.toLowerCase() + '.png');
        this.menu.hide();
    },
    selectedItem : "edge",
    handler : function(button) {
        button.createItem();
    },
    menu : {
        plain : true,
        items : [{
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Straight"),
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
                icon : 'resources/icons/shapes/edge.png',
                id : 'edge',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/edgearrow.png',
                id : 'edgeArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/edgedoublearrow.png',
                id : 'edgeDoubleArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/edgelabel.png',
                id : 'edgeLabel',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }]
        }, {
            xtype : 'text',
            text : JSGDemo.resourceProvider.getString("Orthogonal"),
            style : {
                'font-size' : '8pt',
                'padding' : '5px',
                'margin' : '5px',
                'backgroundColor' : '#DDDDDD'
            }
        }, {
            xtype : 'buttongroup',
            columns : 4,
            style : {
                backgroundColor : "transparent",
                borderColor : "transparent"
            },
            defaults : {
                scale : 'medium'
            },
            items : [{
                icon : 'resources/icons/shapes/orthogonaledge.png',
                id : 'orthogonalEdge',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonaledgearrow.png',
                id : 'orthogonalEdgeArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonaledgedoublearrow.png',
                id : 'orthogonalEdgeDoubleArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonaledgelabel.png',
                id : 'orthogonalEdgeLabel',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonalroundededge.png',
                id : 'orthogonalRoundedEdge',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonalroundededgearrow.png',
                id : 'orthogonalRoundedEdgeArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonalroundededgedoublearrow.png',
                id : 'orthogonalRoundedEdgeDoubleArrow',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }, {
                icon : 'resources/icons/shapes/orthogonalroundededgelabel.png',
                id : 'orthogonalRoundedEdgeLabel',
                handler : function() {
                    Ext.getCmp('jsglinesbtn').createItem(this);
                }
            }]
        }]
    },
    initComponent : function() {
        this.callParent(arguments);
    }
});
