JSGDemo.namespace("JSG.graph.model");
/**
 * @class JSGDemo.graph.layout.LayoutManager
 *
 * TODO description
 *
 * @constructor
 */

JSGDemo.graph.layout.LayoutManager = function() {
};

JSGDemo.graph.layout.LayoutManager.prototype.createLayoutFromString = function(typeStr) {
    switch(typeStr) {
        case "Grid":
        case "Tree":
        case "Flow":
        case "OrgChart":
        case "Force":
            return {layout : function (model, constraints) {
                try {
                    ARAC.layout.apply(model, constraints/*, new ARAC.layout.LayoutWatch()*/);
                } catch (e) {
                    
                } 
                
            }};
    };
    
    return undefined;    
};

JSGDemo.graph.layout.LayoutManager.prototype.createConstraintsForLayout = function(typeStr) {
    switch(typeStr) {
        case "Grid":
            return ARAC.layout.defaultConfigStore.get('Grid-Default').copy();
        case "Tree":
            return ARAC.layout.defaultConfigStore.get('Tree-CardinalPoints').copy();
        case "OrgChart":
            return ARAC.layout.defaultConfigStore.get('OrgChart-Demo').copy();
        case "Flow":
            return ARAC.layout.defaultConfigStore.get('Flow-CardinalPoints').copy();
        case "Force":
            return ARAC.layout.defaultConfigStore.get('Force-CenterPoints').copy();
    };
    
    return undefined;    
};

JSGDemo.graph.layout.LayoutManager.prototype.getLayoutStrings = function() {
    var layouts = [];
    
    layouts.push("None");
    layouts.push("Grid");
    layouts.push("Tree");
    layouts.push("Flow");
    layouts.push("Force");
    
    return layouts;           
};

/** creates an own model representation from given jsg graph */
JSGDemo.graph.layout.LayoutManager.prototype.getLayoutModel = function(graph, constraints) {

    return  new JSG.aracadapter.AracGraphAdapter(graph);
};

JSGDemo.graph.layout.LayoutManager.prototype.getLayoutIndex = function(point, viewer, controller, sortSource, highLight, drop) {
    
    var oldIndex = undefined;
    var selection = undefined;
    var sameParent = false;

    if (!drop) {
        selection = viewer.getSelection();
        if (selection == undefined || selection.length != 1)
            return undefined;
        oldIndex = selection[0].getModel().getIndex(); 
    }

    var model = controller.getModel();
    var layoutAttributes = model.getLayoutAttributes();

    switch(layoutAttributes.getLayout().getValue()) {
        case "Grid":
            if (layoutAttributes.getAutoLayout().getValue()) {
                for (var i = 0, n = model._subItems.length; i < n; i++) {
                    var item = model._subItems[i];
                    if ((this.isSortDesired(item.getType().getValue(), sortSource)) && 
                        (drop || item != selection[0].getModel())) {
                        var rect = item.getTranslatedBoundingBox(viewer.getGraph(), new JSG.geometry.BoundingBox(0, 0)).getBoundingRectangle();
                        if (selection  && selection.length == 1) 
                            sameParent = (selection[0].getModel().getParent() == item.getParent());
                        else
                            sameParent = false;
                        var constraints = layoutAttributes.getConstraints();
                        switch (constraints.flowDirection) {
                            case ARAC.layout.config.FlowDirection.ROW_FLOW:
                                if (point.y > rect.y && point.y < rect.y + rect.height / 2) {
                                    return {"index" : i, "before" : true};                
                                } else if (point.y < rect.getBottom() + constraints.rowGap && point.y >= rect.y + rect.height / 2) {
                                    if (sameParent && oldIndex < i && !highLight)
                                        return {"index" : i, "before" : true};                
                                    else 
                                        return {"index" : i, "before" : false};                
                                } else if (!i && point.y <= rect.y) {
                                    return {"index" : 0, "before" : true};                
                                } else if (i == n - 1 && point.y >= rect.y + rect.height) {
                                    return {"index" : i, "before" : false};                
                                }
                                break;
                            case ARAC.layout.config.FlowDirection.COL_FLOW:
                                if (point.x > rect.x && point.x < rect.x + rect.width / 2) {
                                    return {"index" : i, "before" : true};                
                                } else if (point.x < rect.getRight() + constraints.colGap && point.x >= rect.x + rect.width / 2) {
                                    if (sameParent && oldIndex < i && !highLight)
                                        return {"index" : i, "before" : true};                
                                    else 
                                        return {"index" : i, "before" : false};                
                                } else if (!i && point.x <= rect.x) {
                                    return {"index" : 0, "before" : true};                
                                } else if (i == n - 1 && point.x >= rect.x + rect.width) {
                                    return {"index" : i, "before" : false};                
                                }
                                break;
                        }                      
                    }
                }        
            }
            break;
    };
    
    return undefined;    
};

JSGDemo.graph.layout.LayoutManager.prototype.applyLayoutResult = function(model, tracker) {
    
    if (tracker) {
        var animation = new JSG.anim.Animation(JSG.anim.AnimationType.LINEAR, this);
        // var animation = new JSG.anim.Animation(JSG.anim.AnimationType.CIRC, this);
        // var animation = new JSG.anim.Animation(JSG.anim.AnimationType.EASE_OUT, this);
    
        //1.5 sec animation...
        animation.start(layoutItems, 1000);
    } else {
        layoutItems(1);
    }

    function layoutItems(progress) {
        JSG.setDrawingDisabled(true);
        var box = new JSG.geometry.BoundingBox(0, 0);
        var vertices = model.vertices; 
        var edges = model.edges; 
        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            var item = vertex.data;
            if (item != undefined) {
                box = item.getBoundingBox(box);
                var x = box._topleft.x + (vertex.rect.x - box._topleft.x) * progress;
                var y = box._topleft.y + (vertex.rect.y - box._topleft.y) * progress;
                box.setTopLeft(x, y);
                // angle setzen
                if (!item.isCollapsed())
                    box.setSize(vertex.rect.width, vertex.rect.height);
                item.setBoundingBoxTo(box);
                if (vertex.label) {
                    item.addLabel(vertex.label);
                }
            }
        }
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            var item = edge.data;
            if (item != undefined) {
                var points = [];

                if (edge.source.isDummy()) {
                    // source
                    var vertex = edge.source;
                    var lastDummyEdge;
                    
                    while (vertex.isDummy()) {
                        lastDummyEdge = vertex.inEdges[0];
                        vertex = vertex.inEdges[0].source;
                    }

                    // first dummy source    
                    points.push(getProgressPoint(vertex.rect.getCenter()));                            
    
                    // dummy vertices are step points
                    vertex = lastDummyEdge.target;                            
                    while (vertex.isDummy()) {
                        points.push(getProgressPoint(vertex.rect.getCenter()));
                        vertex = vertex.outEdges[0].target;                            
                    }
                    
                    // target
                    points.push(getProgressPoint(vertex.rect.getCenter()));                            
                    
                } else if (edge.target.isDummy()) {
                    // source
                    var vertex = edge.source;
                    points.push(getProgressPoint(vertex.rect.getCenter()));                            
    
                    // dummy vertices are step points
                    vertex = edge.target;                            
                    while (vertex.isDummy()) {
                        points.push(getProgressPoint(vertex.rect.getCenter()));
                        vertex = vertex.outEdges[0].target;                            
                    }
                    
                    // target
                    points.push(getProgressPoint(edge.target.rect.getCenter()));                            
                    
                } else {
                    points.push(getProgressPoint(edge.source.rect.getCenter()));                            
                    points.push(getProgressPoint(edge.target.rect.getCenter()));                            
                }

                item.setPoints(points); 
            }
        }
        JSG.setDrawingDisabled(false);
        
        if (tracker != undefined)
            tracker.update();
            
            
        function getProgressPoint(point) {
            return new JSG.geometry.Point(point.x * progress, point.y * progress);
        }             
    }
};

JSGDemo.graph.layout.LayoutManager.prototype.isAutoResizeDesired = function(type, containerType) {
    switch (containerType) {
        case "bpmnpool":
        case "bpmnlane":
            switch (type) {
                case "bpmnpoolcontainer":
                case "bpmnlanecontainer":
                case "bpmnpool":
                case "bpmnlane":
                    return true;
                default:
                    return false;
            }
            break;
        case "flowvlane":
            switch (type) {
                case "flowvlanecontainer":
                case "flowvlane":
                    return true;
                default:
                    return false;
            }
            break;
        case "flowhlane":
            switch (type) {
                case "flowhlanecontainer":
                case "flowhlane":
                    return true;
                default:
                    return false;
            }
            break;
    }

    return true;
};

JSGDemo.graph.layout.LayoutManager.prototype.isLayoutDesired = function(type, containerType) {
    switch (containerType) {
        case "bpmnpoolcontainer":
        case "bpmnlanecontainer":
            switch (type) {
                case "bpmnpool":
                case "bpmnlane":
                    return true;
                default:
                    return false;
            }
            break;
        case "flowvlanecontainer":
            switch (type) {
                case "flowvlane":
                    return true;
                default:
                    return false;
            }
            break;
        case "flowhlanecontainer":
            switch (type) {
                case "flowhlane":
                    return true;
                default:
                    return false;
            }
            break;
    }

    return true;
};

JSGDemo.graph.layout.LayoutManager.prototype.isSortDesired = function(type1, type2) {
    
    switch (type1) {
        case "bpmnpool":
        case "bpmnlane":
            switch (type2) {
                case "bpmnpool":
                case "bpmnlane":
                    return true;
            }
            break;
        case "flowvlane":
            switch (type2) {
                case "flowvlane":
                    return true;
            }
            break;
        case "flowhlane":
            switch (type2) {
                case "flowhlane":
                    return true;
            }
            break;
    }
    
    return false;
};
