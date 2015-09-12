JSGDemo.namespace("JSGDemo.samples");

/**
 * @class JSGDemo.samples.General
 * @constructor
 */
JSGDemo.samples.General = function() {
};

JSGDemo.samples.General.createRepository = function() {
    var tree = JSGDemo.modeltree;

    var root = tree.getRootNode();
    root.removeAll();

    this.createGeneral(root);
    this.createProcess(root);
    this.createLayout(root);
    this.createOrgChart(root);

    tree.validateTree();
    tree.save();
};

JSGDemo.samples.General.createGeneral = function(root) {
	var CONSTS = JSG.graph.attr.consts;
	var ATTR = JSG.graph.attr.ItemAttributes;

    var parentfolder = root.appendChild({name : "Functional Samples", id : JSGDemo.getNewId(), expandable : true, leaf : false});
    
    var overviewDiagram = parentfolder.appendChild({name : "Overview", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        var graphOverview = new JSG.graph.model.Graph();
        var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());

        graphOverview.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(22500, 1000));
        item.getPin().setCoordinate(13250, 1000);
        item.getFormat().setFillColor("#404040");
        item.getTextFormat().setFontColor("#FFFFFF");
        item.getFormat().setLineColor("#333333");
        item.getFormat().setGradientColor("#F3F3F3");
        label = item.addLabel("JS Graph Demo Overview : Click on an item to view a sample");
        label.getTextFormat().setFontSize(16);
        label.getTextFormat().setFontStyle(JSG.graph.attr.TextFormatAttributes.FontStyle.BOLD);
        label.getTextFormat().setHorizontalPosition(JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.CENTER);

    var childFolder = parentfolder.appendChild({name : "Formatting", id : JSGDemo.getNewId(), expandable : true, leaf : false});
    
    addOverviewLabel(graphOverview, 1, "Formatting");
        
    var diagram = childFolder.appendChild({name : "Line Format", id : JSGDemo.getNewId(), expandable : false, leaf : true});
        
        var graph = new JSG.graph.model.Graph();
        for (var i = 1; i <= JSG.graph.model.attributes.LineStyle.DASHDOTDOT; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(1000, 1000 * i));
            edge.setEndPointTo(new JSG.geometry.Point(6000, 1000 * i));
            edge.getFormat().setLineStyle(i);
        }
        for (var i = 1; i < 5; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(5000, 2000));
            item.getPin().setCoordinate(3500, 5000 + i * 2000);

            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0));
            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0));
            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0.4));
            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.4));
            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1));

            item.getFormat().setLineWidth(20 + i * 10);
            item.getFormat().setLineCorner(100 * i);
            item.setItemAttribute(ATTR.CLOSED, false);
            item.getFormat().setLineStyle(i);
            item.addLabel("Corner Rounding = " + 100 * i);
        }
        for (var i = 1; i < 8; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(7000, 1000 * i));
            edge.setEndPointTo(new JSG.geometry.Point(12000, 1000 * i));
            edge.getFormat().setLineWidth(50 * i);
        }
        for (var i = 8; i <= 8 + JSG.graph.model.attributes.LineStyle.DASHDOTDOT; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(7000, 1000 * i));
            edge.setEndPointTo(new JSG.geometry.Point(12000, 1000 * i));
            edge.getFormat().setLineStyle(i - 8);
            edge.getFormat().setLineWidth(10 * i);
        }
        for (var i = 0; i < 360; i+=4) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(13000, 1000 + 20 * i));
            edge.setEndPointTo(new JSG.geometry.Point(18000, 1000 + 40 * i));
            var color = JSGDemo.samples.General.hsl2rgb(i, 50, 50);
            edge.getFormat().setLineColorRGB(color.r, color.g, color.b);
            edge.getFormat().setLineWidth(40);
        }
        for (var i = 0; i < 30; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(20500 + i * 150, 2000 + i * 400);

            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0));
            item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH - 300"), new JSG.graph.expr.Expression(0)));
            item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "0.5 * HEIGHT")));
            item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH - 300"), new JSG.graph.expr.Expression(0, "HEIGHT")));
            item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 1));
            item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(300), new JSG.graph.expr.Expression(0, "0.5 * HEIGHT")));

            var color = JSGDemo.samples.General.hsl2rgb(i * 8, 50, 50);
            item.getFormat().setLineColorRGB(color.r, color.g, color.b);
            item.getFormat().setLineWidth(20 + i * 2);
            item.getFormat().setLineStyle(Math.max(1, i % 5));
            item.setAngle(Math.PI / 30 * i);
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 1, 1, "Line Formats");

    var diagram = childFolder.appendChild({name : "Line Arrows", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        var graph = new JSG.graph.model.Graph();
        var n = JSG.graph.model.attributes.ArrowStyle.SQUARESMALL;
        for (var i = 0; i < n; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(10000, 8000));
            edge.setEndPointTo(new JSG.geometry.Point(10000 + 7500 * Math.cos(Math.PI * 2 * i / n),  
                                                      8000 + 7500 * Math.sin(Math.PI * 2 * i / n)));
            var color = JSGDemo.samples.General.hsl2rgb(i * 20, 50, 50);
            edge.getFormat().setLineColorRGB(color.r, color.g, color.b);
            color = JSGDemo.samples.General.hsl2rgb(180 - i * 20, 50, 50);
            edge.getFormat().setFillColorRGB(color.r, color.g, color.b);
            edge.getFormat().setLineArrowEnd(i);
            edge.getFormat().setLineWidth(i * 3);
        }
        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 2, 1, "Line Arrows");

    var diagram = childFolder.appendChild({name : "Fill Format", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with fill formats
        var graph = new JSG.graph.model.Graph();
        for (var i = 0; i < 360; i+=10) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(1000, 1000));
            item.getPin().setCoordinate(9000 + 3000 * Math.cos(Math.PI * i / 180),  
                                        6000 + 3000 * Math.sin(Math.PI * i / 180));
            var color = JSGDemo.samples.General.hsl2rgb(i, 50, 50);
            item.getFormat().setFillColorRGB(color.r, color.g, color.b);
            item.getFormat().setGradientColor("#FFFFFF");
            item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.GRADIENT);
            item.getFormat().setLineColor("#666666");
            item.getFormat().setGradientAngle(i);

            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(1000, 1000));
            item.getPin().setCoordinate(6000 + 1500 * Math.cos(Math.PI * i / 180),  
                                        6000 + 1500 * Math.sin(Math.PI * i / 180));
            var color = JSGDemo.samples.General.hsl2rgb(i, 50, 50);
            item.getFormat().setFillColorRGB(color.r, color.g, color.b);
            item.getFormat().setLineColor("#666666");
            item.getFormat().setGradientColor("#FFFFFF");
        }
        for (var i = 0; i < 360; i+=30) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(1500, 1500));
            item.getPin().setCoordinate(20000 + 3000 * Math.cos(Math.PI * i / 180),  
                                        6000 + 3000 * Math.sin(Math.PI * i / 180));
            var color = JSGDemo.samples.General.hsl2rgb(i, 50, 50);
            item.getFormat().setFillColorRGB(color.r, color.g, color.b);
            item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.GRADIENT);
            item.getFormat().setLineColor("#666666");
            item.getFormat().setGradientColor("#FFFFFF");
            item.getFormat().setGradientType(JSG.graph.model.attributes.GradientStyle.RADIAL);
            item.getFormat().setGradientOffsetX(i / 360 * 100);
            item.getFormat().setGradientOffsetY(i / 360 * 50);
        }
        for (var i = 0; i < 4; i++) {
            item = JSG.graphItemFactory.createItemFromString("arrowDblHorz");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 3000));
            item.getPin().setCoordinate(3500 + 7000 * i, 13000);
            item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.PATTERN);
            item.getFormat().setPattern("resources/logosmall.png");
            item.getFormat().setPatternStyle(JSG.graph.model.attributes.PatternStyle.STRETCH + i);
            item.getFormat().setLineColor("#666666");
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 3, 1, "Fill Formats");

    var diagram = childFolder.appendChild({name : "Shadows", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with shadows
        var graph = new JSG.graph.model.Graph();
        for (var i = 0; i < 4; i++) {
            item = JSG.graphItemFactory.createItemFromString("star5");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
            item.getPin().setCoordinate(4000 * (i + 1), 2000);
            item.getFormat().setShadowDirection(JSG.graph.model.attributes.ShadowDirection.LEFTTOP + i);
            item.getFormat().setShadowOffsetX(200);
            item.getFormat().setShadowOffsetY(200);
            item.getFormat().setShadowColor("#777777");
        }
        for (var i = 0; i < 6; i++) {
            item = JSG.graphItemFactory.createItemFromString("star6");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
            item.getPin().setCoordinate(4000 * (i + 1), 5000);
            item.getFormat().setShadowOffsetX(200);
            item.getFormat().setShadowOffsetY(200);
            var color = JSGDemo.samples.General.hsl2rgb(i * 40, 50, 50);
            item.getFormat().setShadowColorRGB(color.r, color.g, color.b);
        }
        for (var i = 0; i < 6; i++) {
            item = JSG.graphItemFactory.createItemFromString("polyedge5");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
            item.getPin().setCoordinate(4000 * (i + 1), 8000);
            item.getFormat().setShadowOffsetX(50 * (i + 1));
            item.getFormat().setShadowOffsetY(50 * (i + 1));
            item.getFormat().setShadowColor("#777777");
        }
        for (var i = 0; i < 6; i++) {
            item = JSG.graphItemFactory.createItemFromString("polyedge6");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
            item.getPin().setCoordinate(4000 * (i + 1), 11000);
            item.getFormat().setShadowBlur(i * 8);
            item.getFormat().setShadowOffsetX(300);
            item.getFormat().setShadowOffsetY(300);
            item.getFormat().setShadowColor("#777777");
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 4, 1, "Shadows");

    var diagram = childFolder.appendChild({name : "Text Format", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with text formats
        var graph = new JSG.graph.model.Graph();
        var data = [{
            "name" : "Arial"}, {"name" : "Courier New"}, {"name" : "Georgia"}, {"name" : "Lucida"}, {
            "name" : "Lucida Sans"}, {"name" : "Palatino"}, {"name" : "Tahoma"}, {"name" : "Times New Roman"}, {"name" : "Trebuchet MS"}, {"name" : "Verdana"
        }];
        
        for (var i = 0; i < 7; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(2000 + 3500 * i, 2000);
            var label = item.addLabel(data[i].name);
            label.getTextFormat().setFontSize(14);
            label.getTextFormat().setFontName(data[i].name);
        }
        for (var i = 0; i < 7; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(2000 + 3500 * i, 5000);
            var label = item.addLabel("Size " + (10 + i * 2));
            label.getTextFormat().setFontSize((10 + i * 2));
        }
        for (var i = 0; i < 7; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(2000 + 3500 * i, 8000);
            var label = item.addLabel("Styles");
            label.getTextFormat().setFontStyle(i);
        }
        for (var i = 0; i < 7; i++) {
            item = JSG.graphItemFactory.createItemFromString("polyedge5");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(2000 + 3500 * i, 11000);
            var label = item.addLabel("Color");
            var color = JSGDemo.samples.General.hsl2rgb(i * 30, 50, 50);
            label.getTextFormat().setFontColor(JSG.graph.Utils.colorFromRGB(color.r, color.g, color.b));
        }
        for (var i = 0; i < 3; i++) {
            item = JSG.graphItemFactory.createItemFromString("polyedge6");
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
            item.getPin().setCoordinate(2000 + 3500 * i, 14000);
            var label = item.addLabel("Align\nHorizontal");
            label.getTextFormat().setHorizontalAlignment(i);
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 5, 1, "Text Format");

    addOverviewLabel(graphOverview, 2, "Labels");

    var childFolder = parentfolder.appendChild({name : "Labels", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    // graph with node labels
    var diagram = childFolder.appendChild({name : "Node Labels", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        var graph = new JSG.graph.model.Graph();
        
        for (var i = 1; i < 6; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(3500 * i, 2000);
            var label = item.addLabel("H Pos");
            label.getTextFormat().setHorizontalPosition(i);
        }

        for (var i = 1; i < 6; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(3500 * i, 5500);
            var label = item.addLabel("V Pos");
            label.getTextFormat().setVerticalPosition(i);
        }
        for (var k = 1; k < 4; k++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 5000));
            item.getPin().setCoordinate(5000 + (k - 1) * 9000, 12000);
            item.setAngle((k - 1) * Math.PI / 5);
            for (var i = 1; i < 6; i++) {
                for (var j = 1; j < 6; j++) {
                    var text = "Here";
                    if (i == 3 && j == 3)
                        text = "Multiple Labels\nper Graphical\nObject";
                    var label = item.addLabel(text);
                    label.getTextFormat().setVerticalPosition(i);
                    label.getTextFormat().setHorizontalPosition(j);
                    var color = JSGDemo.samples.General.hsl2rgb(j * i * 10, 50, 50);
                    label.getTextFormat().setFontColor(JSG.graph.Utils.colorFromRGB(color.r, color.g, color.b));
                }
            }
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 1, 2, "Node Labels");

    // graph with edge labels
    var diagram = childFolder.appendChild({name : "Edge Labels", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        var graph = new JSG.graph.model.Graph();
        
        for (var i = 1; i < 6; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge());
            edge.setStartPointTo(new JSG.geometry.Point(2000, 1000 * i));
            edge.setEndPointTo(new JSG.geometry.Point(8000, 2000 + 1000 * i));
            var label = edge.addLabel("Label");
            label.getTextFormat().setVerticalPosition(i);
        }
        for (var i = 1; i < 6; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
            edge.init(new JSG.geometry.Point(12000, 1000 * i), new JSG.geometry.Point(26000 - 1500 * i, 2000 + 1000 * i));
            var label = edge.addLabel("Label");
            label.getTextFormat().setVerticalPosition(i);
        }

        var edge = graph.addItem(new JSG.graph.model.Edge());
        edge.setStartPointTo(new JSG.geometry.Point(2000, 10000));
        edge.setEndPointTo(new JSG.geometry.Point(10000, 16000));

        for (var i = 1; i < 6; i++) {
            var label = edge.addLabel("Label");
            label.getTextFormat().setVerticalPosition(i);
        }


        edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
        edge.init(new JSG.geometry.Point(12000, 10000), new JSG.geometry.Point(24000, 16000));

        for (var i = 1; i < 6; i++) {
            var label = edge.addLabel("Label");
            label.getTextFormat().setVerticalPosition(i);
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 2, 2, "Edge Labels");

    addOverviewLabel(graphOverview, 3, "Shapes");

    var childFolder = parentfolder.appendChild({name : "Shapes", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    var diagram = childFolder.appendChild({name : "Build In Shapes", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with built in shapes
        var graph = new JSG.graph.model.Graph();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
        item.getPin().setCoordinate(2000, 3000);
        item.addLabel("Rectangle");
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
        item.getPin().setCoordinate(5700, 3000);
        item.addLabel("Ellipse");

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
        item.getPin().setCoordinate(9500, 3000);
        item.addLabel("Text");

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(13250, 3000);
        item.addLabel("Polyline");
        item.setItemAttribute(ATTR.CLOSED, false);

        var size = 0.4;
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5 - size, 0.5));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 1 - size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(size, 1));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0.5 + size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1 - size, 1));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1 - size));

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(17000, 3000);
        item.addLabel("Polygon");
        item.setItemAttribute(ATTR.CLOSED, true);

        var size = 0.3;
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5 - size, 0.5));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 1 - size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(size, 1));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0.5 + size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1 - size, 1));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1 - size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5 + size, 0.5));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1 - size, 0));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0.5 - size));
        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(size, 0));

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.BezierShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(20750, 3000);
        item.addLabel("Bezier Curve\nclosed");
        item.setItemAttribute(ATTR.CLOSED, true);

        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.225"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.1")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.5"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.0")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.775"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.3")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.225")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.5")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.775")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.775"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.8")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.5"), new JSG.graph.expr.Expression(0, "HEIGHT")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.225"), new JSG.graph.expr.Expression(0, "HEIGHT * 1.2")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.775")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.5")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.225")));

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.BezierShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(24500, 3000);
        item.addLabel("Bezier Curve");
        item.setItemAttribute(ATTR.CLOSED, false);

        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.225"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.1")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.5"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.0")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.775"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.3")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.225")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.5")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.775")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.775"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.8")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.5"), new JSG.graph.expr.Expression(0, "HEIGHT")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.225"), new JSG.graph.expr.Expression(0, "HEIGHT * 1.2")));
    
        item.getShape().addCpFromCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.775")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.5")));
        item.getShape().addCpToCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH * 0.0"), new JSG.graph.expr.Expression(0, "HEIGHT * 0.225")));

        var data1 = [{"name" : "roundRect"}, {"name" : "roundRectCornerCut"}, {"name" : "roundRectCornerCutSame"}, {"name" : "roundRectCornerCutDiagonal"}, {
                     "name" : "rectCornerCut"}, {"name" : "rectCornerCutSame"}, {"name" : "rectCornerCutDiagonal"}];
        var data2 = [{"name" : "cylinder"}, {"name" : "cube"}, {"name" : "bracketSimpleBoth"}, {"name" : "bracketSimpleLeft"}, {
                     "name" : "bracketSimpleRight"}, {"name" : "bracketCurvedBoth"}, {"name" : "bracketCurvedRight"}];
        var data3 = [{"name" : "arrowLeft"}, {"name" : "arrowUp"}, {"name" : "arrowRight"}, {"name" : "arrowDown"}, {
                     "name" : "arrowDblHorz"}, {"name" : "triangleRight"}, {"name" : "triangleLeft"}];
        var data4 = [{"name" : "polyedge4"}, {"name" : "polyedge5"}, {"name" : "polyedge10"}, {"name" : "arrowDown"}, {
                     "name" : "star3"}, {"name" : "star6"}, {"name" : "star12"}];

        for (var i = 0; i < 7; i++) {
            item = JSG.graphItemFactory.createItemFromString(data1[i].name);
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(2000 + 3750 * i, 6000);
            item.addLabel(data1[i].name);

            item = JSG.graphItemFactory.createItemFromString(data2[i].name);
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(2000 + 3750 * i, 9000);
            item.addLabel(data2[i].name);

            item = JSG.graphItemFactory.createItemFromString(data3[i].name);
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(2000 + 3750 * i, 12000);
            item.addLabel(data3[i].name);

            item = JSG.graphItemFactory.createItemFromString(data4[i].name);
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 2000));
            item.getPin().setCoordinate(2000 + 3750 * i, 15000);
            item.addLabel(data4[i].name);
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 1, 3, "BuiltIn\nShapes");

            
    var diagram = childFolder.appendChild({name : "Library Shapes", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with library shapes
        var shapes1 = [{"name" : "function"}, {"name" : "event"}, {"name" : "decision"}, {"name" : "position"}, {
                     "name" : "or"}, {"name" : "document"}, {"name" : "datastore"}];
        var shapes2 = [{"name" : "bpmntask"}, {"name" : "bpmngatewayparallel"}, {"name" : "bpmnstartevent"}, {"name" : "bpmnstarttimeevent"}, {
                     "name" : "bpmnintermediatelinkthrowingevent"}, {"name" : "bpmndataobject"}, {"name" : "bpmnsubprocess"}];
        var graph = new JSG.graph.model.Graph();

        JSG.connectionRestorer = new JSG.graph.model.ConnectionRestorer();

        for (var i = 0; i < 7; i++) {
            var items = JSG.graphItemFactory.createShape(shapes1[i].name);
            item = items[0];
            graph.addItem(item);
            item.getPin().setCoordinate(2000 + 3750 * i, 5000);

            items = JSG.graphItemFactory.createShape(shapes2[i].name);
            item = items[0];
            graph.addItem(item);
            item.getPin().setCoordinate(2000 + 3750 * i, 9000);
        }

        JSG.connectionRestorer.updateIds(graph);
        JSG.connectionRestorer = undefined;
        
        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 2, 3, "Library\nShapes");

    var diagram = childFolder.appendChild({name : "Layers", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with layers
        var graph = new JSG.graph.model.Graph();

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 2000));
        item.getPin().setCoordinate(4000, 4000);
        item.getTextFormat().setFontColor("#FF0000");
        item.addLabel("Click on the items below to\nshow or hide a layer.");

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 1000));
        item.getPin().setCoordinate(4000, 7000);
        item.addLabel("Hide Status");
        item.setLink(new JSG.graph.expr.StringExpression(0, "\"code:" + 
                                    "var graph = item.getGraph();\n" +
                                    "var layer = graph.getLayer('signal');\n" +
                                    "layer.visible = false;\""));
        item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.NONE);

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 1000));
        item.getPin().setCoordinate(4000, 8500);
        item.addLabel("Show Status");
        item.setLink(new JSG.graph.expr.StringExpression(0, "\"code:" + 
                                    "var graph = item.getGraph();\n" +
                                    "var layer = graph.getLayer('signal');\n" +
                                    "layer.visible = true;\""));
        item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.NONE);

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(7000, 10000));
        item.getPin().setCoordinate(13000, 8000);
        item.getFormat().setFillColor("#DDDDDD");
        var label = item.addLabel("Server Rack");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        addServer(item, 1500, "Server 1", "#FF0000");
        addServer(item, 3000, "Server 2", "#FFFF00");
        addServer(item, 4500, "Server 3", "#00FF00");
        addServer(item, 6000, "Server 4", "#00FF00");
        addServer(item, 7500, "Server 5", "#00FF00");
        addServer(item, 9000, "Server 6", "#FFFF00");
        
        function addServer(parent, position, title, color) {
            var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            parent.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 1000));
            item.getPin().setCoordinate(3500, position);
            var label = item.addLabel(title);
            var signal = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
            item.addItem(signal);
            signal.setBoundingBoxTo(new JSG.geometry.BoundingBox(400, 400));
            signal.setLayer("signal");
            signal.getPin().setCoordinate(5500, 500);
            signal.getFormat().setFillColor(color);
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 3, 3, "Layer");

    var diagram = childFolder.appendChild({name : "Container", id : JSGDemo.getNewId(), expandable : false, leaf : true});
        // graph with containers
        var graph = new JSG.graph.model.Graph();
        
        // create container sample...
        // create rectangular node
        var container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
        container.setSize(6000, 6000);
        container.getPin().setCoordinate(5000, 4000);
        container.getFormat().setFillColor("#DDDDDD");
        
        // add label to container
        var label = container.addLabel("Container");
        // align it to the bottom
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
    
        var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
        node.setSize(3500, 1500);
        node.getPin().setCoordinate(2500, 3000);
        var label = node.addLabel("Node part of Container");

        for (var i = 0; i < 2; i++) {
            // create polygon node
            container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape()));
            // define polygon points (as factor of node dimensions)
            container.setSize(6000, 6000);
            container.getPin().setCoordinate(13000, 4000 + i * 8000);
            container.getFormat().setFillColor("#DDAADD");
            if (i) {
                container.setItemAttribute(ATTR.CLIPCHILDREN, true);
                container.setAngle(0.3);
                container.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.GRADIENT);
            }
            container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.15, 0));
            container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.15));
            container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.8));
            container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.3, 1));
            container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0.45));
        
            var label;
            if (i)
                label = container.addLabel("Rotated Polygon Container with clipping");
            else {
                label = container.addLabel("Polygon Container");
                label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
            }
            
            // add node to container
            var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
            node.setSize(4000, 1000);
            node.getPin().setCoordinate(5000, 1500);
            var label = node.addLabel("Simple Node, not resizing");
        
            // add node to container using formulas
            var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
            node.setSize(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.4"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT * 0.2"));
            node.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.4"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT * 0.7"));
            var label = node.addLabel("Node resizes\nwith Container");
        }
        
        // create elliptical node in container
        var container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
        container.setSize(6000, 6000);
        container.getPin().setCoordinate(5000, 12000);
        container.getFormat().setFillColor("#CCEDEE");
        container.setItemAttribute(ATTR.COLLAPSEDBUTTON, CONSTS.ButtonPosition.TOPCENTER);
        container.setItemAttribute(ATTR.COLLAPSABLE, CONSTS.Direction.BOTH);
        
        // add label to container
        var label = container.addLabel("Collapsable Container");
        // align it to the bottom
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
    
        var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
        node.setSize(3500, 1000);
        node.getPin().setCoordinate(2500, 3500);
        var label = node.addLabel("Node part of Container");

        // create scrollable container
        var container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
        container.setSize(6000, 1000);
        container.getPin().setCoordinate(21500, 4500);
        var label = container.addLabel("Scrollable Container");

        var container = graph.addItem(new JSG.graph.model.ContainerNode());
        container.setSize(6000, 6000);
        container.getPin().setCoordinate(21500, 8500);

        for (var i = 1; i < 10; i++) {
            for (var j = 1; j < 10; j++) {
                var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
                node.setSize(1000, 1000);
                node.getPin().setCoordinate(1500 * i, 1500 * j);
            }            
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 4, 3, "Container");

    addOverviewLabel(graphOverview, 4, "Attributes");

    var childFolder = parentfolder.appendChild({name : "Attributes", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    var diagram = childFolder.appendChild({name : "Node Attributes", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with node attributes
        var graph = new JSG.graph.model.Graph();

        for (var i = 0; i < 12; i++) {
            item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
            graph.addItem(item);
            item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 4000));
            item.getPin().setCoordinate(3000 + i % 6 * 4000, i > 5 ? 11000 : 4000);
            item.getFormat().setFillColor("#FFCCCC");
            switch (i) {
                case 0:
                    item.setItemAttribute(ATTR.CLIPCHILDREN, true);
                    var label = item.addLabel("Clip Children");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BOTTOM);
                    subitem = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
                    item.addItem(subitem);
                    subitem.setBoundingBoxTo(new JSG.geometry.BoundingBox(1000, 1000));
                    subitem.getPin().setCoordinate(2800, 1800);
                    subitem.getFormat().setFillColor("#DDAA44");
                    break;
                case 1:
                    item.setItemAttribute(ATTR.COLLAPSABLE, CONSTS.Direction.BOTH);
                    var label = item.addLabel("Collapsable\nNode");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 2:
                    item.setItemAttribute(ATTR.DELETEABLE, false);
                    var label = item.addLabel("Not deletable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 3:
                    item.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.NONE);
                    var label = item.addLabel("Not moveable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 4:
                    item.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.VERTICAL);
                    var label = item.addLabel("Only vertically moveable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 5:
                    item.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.HORIZONTAL);
                    var label = item.addLabel("Only horizontally moveable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 6:
                    item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.SHAPE);
                    var label = item.addLabel("PortMode\nShape");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 7:
                    item.setItemAttribute(ATTR.ROTATABLE, false);
                    var label = item.addLabel("Not rotatable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 8:
                    item.setItemAttribute(ATTR.SELECTIONMODE, CONSTS.SelectionMode.NONE);
                    var label = item.addLabel("Not selectable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 9:
                    item.setItemAttribute(ATTR.SIZEABLE, false);
                    var label = item.addLabel("Not resizable");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 10:
                    item.setItemAttribute(ATTR.SNAPTO, false);
                    var label = item.addLabel("No snap target");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    break;
                case 11:
                    var label = item.addLabel("Limit Moving of children\nto Container");
                    label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
                    subitem = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
                    item.addItem(subitem);
                    subitem.setBoundingBoxTo(new JSG.geometry.BoundingBox(1000, 1000));
                    subitem.getPin().setCoordinate(1500, 2000);
                    subitem.getFormat().setFillColor("#DDAA44");
                    subitem.setItemAttribute(ATTR.MOVEABLE, CONSTS.Moveable.LIMITTOCONTAINER | CONSTS.Direction.BOTH);
                    break;
            }
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 1, 4, "Node Attributes");

    var diagram = childFolder.appendChild({name : "Edge Attributes", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // graph with edge attributes
        var graph = new JSG.graph.model.Graph();

        for (var i = 0; i < 5; i++) {
            var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
            edge.init(new JSG.geometry.Point(2000, 1000 + 2000 * i), new JSG.geometry.Point(5000 + 1500 * i, 2500 + 2000 * i));
            switch (i) {
                case 0:
                    edge.setItemAttribute(ATTR.DELETEABLE, false);
                    edge.addLabel("Not deletable");
                    break;
                case 1:
                    edge.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.NONE);
                    edge.addLabel("Not moveable");
                    break;
                case 2:
                    edge.setItemAttribute(ATTR.SELECTIONMODE, CONSTS.SelectionMode.NONE);
                    edge.addLabel("Not selectable");
                    break;
                case 3:
                    edge.setItemAttribute(ATTR.SIZEABLE, false);
                    edge.addLabel("Not resizable");
                    break;
                case 4:
                    edge.getLayoutAttributes().setLineBehavior(JSG.graph.model.shapes.OrthoLineBehavior.MANUAL);
                    edge.addLabel("Auto Layout off");
                    break;
            }
        }

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 2, 4, "Edge Attributes");


    addOverviewLabel(graphOverview, 5, "Formulas");

    var childFolder = parentfolder.appendChild({name : "Formulas", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    var diagram = childFolder.appendChild({name : "Formula Coordinates", id : JSGDemo.getNewId(), expandable : false, leaf : true});

        // create Graph with formula samples...       
        var graph = new JSG.graph.model.Graph();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(4000, 3000));
        item.getPin().setCoordinate(5000, 5000);
        var label = item.addLabel("Move this Object\nand the Object to\nthe right will also be moved\nas they are linked\nby Formulas");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#DDEEFF");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Item." + id + "!PIN_X + 6000"), 
                                    new JSG.graph.expr.NumberExpression(0, "Item." + id + "!PIN_Y"));
        item.getFormat().setFillColor("#DDEEFF");
        item.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.NONE);
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(4000, 3000));
        item.getPin().setCoordinate(5000, 12000);
        var label = item.addLabel("Rotate this Object\nand the Object to\nthe right will also be rotated\nas they are linked\nby Formulas");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.BELOWBOTTOM);
        item.getFormat().setFillColor("#AAEEEE");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 3000));
        item.getPin().setCoordinate(11000, 12000);
        item.setAngle(new JSG.graph.expr.NumberExpression(0, "Item." + id + "!ANGLE"));
        item.getFormat().setFillColor("#AAEEEE");
        item.setItemAttribute(ATTR.ROTATABLE, false);

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.getPin().setCoordinate(20000, 5000);
        item.setSize(4000, 2000);
        var label = item.addLabel("Size this Object and the Object below will\n also be resized as they are linked by Formulas");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#EECCEE");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.getPin().setCoordinate(20000, 8000);
        item.setSize(new JSG.graph.expr.NumberExpression(0, "Item." + id + "!WIDTH"), new JSG.graph.expr.NumberExpression(0, "Item." + id + "!HEIGHT"));
        item.getFormat().setFillColor("#EECCEE");
        item.setItemAttribute(ATTR.SIZEABLE, false);

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.getPin().setCoordinate(17000, 13000);
        item.setSize(1000, 1000);
        var label = item.addLabel("Move this Object and an attached polygon point\nwill move accordingly");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#55AAEE");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(5000, 2000));
        item.getPin().setCoordinate(22000, 17000);
        item.getFormat().setFillColor("#55AAEE");

        item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "Item." + id + "!PIN_X - 19000"), 
                                                                  new JSG.graph.expr.Expression(0, "Item." + id + "!PIN_Y - 16000")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH - 300"), new JSG.graph.expr.Expression(0)));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH"), new JSG.graph.expr.Expression(0, "0.5 * HEIGHT")));
        item.getShape().addCoordinate(new JSG.graph.Coordinate(new JSG.graph.expr.Expression(0, "WIDTH - 300"), new JSG.graph.expr.Expression(0, "HEIGHT")));

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 1, 5, "Formula\nCoordinates");

    var diagram = childFolder.appendChild({name : "Formula Formats", id : JSGDemo.getNewId(), expandable : false, leaf : true});
    
        // create Graph with formula samples...       
        var graph = new JSG.graph.model.Graph();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(5000, 5000);
        label = item.addLabel("Change the LINECOLOR of this Object\nand the Object to\nthe right will change its fill color");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#DDEEFF");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(10000, 5000);
        item.getFormat().setFillColor(new JSG.graph.expr.StringExpression("#FFFFFF", "Item." + id + "!LINECOLOR"));
        item.setItemAttribute(ATTR.MOVEABLE, CONSTS.Direction.NONE);
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(5000, 12000);
        label = item.addLabel("Move this Object vertically\nand the Object to\nthe right will change its line width");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#AAEEEE");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(10000, 12000);
        item.getFormat().setLineWidth(new JSG.graph.expr.NumberExpression(10, "Item." + id + "!PIN_Y / 50"));
        item.setItemAttribute(ATTR.ROTATABLE, false);

        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.getPin().setCoordinate(20000, 5000);
        item.setSize(2000, 2000);
        label = item.addLabel("Change the width of this Object and\nthe Label below will change its font size");
        label.getTextFormat().setVerticalPosition(JSG.graph.attr.TextFormatAttributes.VerticalTextPosition.ONTOP);
        item.getFormat().setFillColor("#EECCEE");
        var id = item.getId();
        
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.getPin().setCoordinate(20000, 9000);
        item.setSize(2000, 2000);
        item.getFormat().setFillColor("#EECCEE");
        label = item.addLabel("Label");
        label.getTextFormat().setFontSize(new JSG.graph.expr.NumberExpression(10, "Item." + id + "!WIDTH / 250"));
        label.setText(new JSG.graph.expr.Expression("", "FONTSIZE +  pt"));
        item.setItemAttribute(ATTR.SIZEABLE, false);

        addBackItem(graph);
        this.saveGraph(diagram.get('id'), graph);
        addOverviewItem(graphOverview, diagram, 2, 5, "Formula\nFormats");

    this.saveGraph(overviewDiagram.get('id'), graphOverview);

    function addOverviewItem(graphOverview, diagram, column, row, label) {
        var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graphOverview.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(3000 + column * 4000, 2000 + row * 2250);
        item.setLink("file:" + diagram.get('id'));
        item.addLabel(label);
        item.getFormat().setFillColor("#99CCFF");
        item.getFormat().setLineColor("#444444");
        item.getFormat().setShadowBlur(20);
        item.getFormat().setShadowOffsetX(100);
        item.getFormat().setShadowOffsetY(100);
        item.getFormat().setShadowColor("#999999");
        item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.NONE);
    }

    function addOverviewLabel(graph, row, label) {
        var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(3500, 2000 + row * 2250);
        item.getFormat().setLineStyle(JSG.graph.model.attributes.LineStyle.NONE);
        item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.NONE);
        item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.NONE);
        label = item.addLabel(label);
        label.getTextFormat().setFontSize(10);
        label.getTextFormat().setFontStyle(JSG.graph.attr.TextFormatAttributes.FontStyle.BOLD);
        label.getTextFormat().setHorizontalPosition(JSG.graph.attr.TextFormatAttributes.HorizontalTextPosition.LEFT);
    }
    
    function addBackItem(graph) {
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 1200));
        item.getPin().setCoordinate(25300, 1000);
        item.setLink("file:" + overviewDiagram.get('id'));
        item.getFormat().setFillColor("#404040");
        item.getFormat().setLineColor("#404040");
        item.getTextFormat().setFontColor("#FFFFFF");
        item.setItemAttribute(ATTR.PORTMODE, CONSTS.PortMode.NONE);
        var label = item.addLabel("Back to\nOverview");
    }
};

JSGDemo.samples.General.createProcess = function(root) {
    var CONSTS = JSG.graph.attr.consts;
    var ATTR = JSG.graph.attr.ItemAttributes;

    var parentfolder = root.appendChild({name : "Business Process Samples", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    var epcDiagram = parentfolder.appendChild({name : "EPC Diagram", id : JSGDemo.getNewId(), expandable : false, leaf : true});

    // create Graph with event process chain...       
    var graph = new JSG.graph.model.Graph();

    var item = append(graph, "interface");
    
    item = append(graph, "function", item, 0, 3000);
    item = append(graph, "function", item, 0, 3000);
    attach(graph, "person", item, "lt");
    attach(graph, "document", item, "lb");

    item = append(graph, "event", item, 0, 3000);

    var or = append(graph, "or", item, 0, 3000);

    // left branch
    var iteml = append(graph, "function", or, -3000, 3000, "left");
    attach(graph, "person", iteml, "lt");
    attach(graph, "document", iteml, "lb");

    item = append(graph, "function", iteml, 0, 3000);
    attach(graph, "person", item, "lb");
    item = append(graph, "event", item, 0, 3000);
    var last = append(graph, "function", item, 0, 3000);

    // right branch 
    var itemr = append(graph, "function", or, 3000, 3000, "right");
    attach(graph, "person", itemr, "rt");
    attach(graph, "document", itemr, "rb");
    item = append(graph, "event", itemr, 0, 3000);
    item = append(graph, "function", item, 0, 3000);
    item = append(graph, "function", item, 0, 3000);

    // join
    item = append(graph, "or", item, -3000, 3000, "center", "right");

    var portTarget = item.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.5));
    var portSource = last.addCenterPort();    
    var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
    edge.setSourcePort(portSource);
    edge.setTargetPort(portTarget);
    edge.getFormat().setLineCorner(200);
    edge.getFormat().setLineArrowEnd(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDSMALL);
    edge.getFormat().setFillColor("#000000");

    item = append(graph, "function", item, 0, 3000);
    or = append(graph, "or", item, 0, 3000);
    item = append(graph, "interface", or, 0, 3000);
    item = append(graph, "interface", or, 4000, 3000, "center", "top");
    item = append(graph, "interface", or, 8000, 3000, "center", "top");
    
    this.saveGraph(epcDiagram.get('id'), graph);

    // create Graph with bpmn diagram...       
    var diagram = parentfolder.appendChild({name : "BPMN Diagram", id : JSGDemo.getNewId(), expandable : false, leaf : true});

    var graph = new JSG.graph.model.Graph();

    var pool = JSG.graphItemFactory.createShape("bpmnpool")[0];
    pool.getPin().setCoordinate(13000, 8500);
    pool.setSize(25500, 15000);
    graph.addItem(pool);
  
    var lane1 = JSG.graphItemFactory.createShape("bpmnlane")[0];
    lane1.setSize(25000, 4000);
    pool.getItemAt(2).addItem(lane1);

    var item = JSG.graphItemFactory.createShape("bpmnstartevent")[0];
    item.getPin().setCoordinate(2000, 2000);
    lane1.addItem(item);
    item = append(lane1, "bpmntask", item, 3500, 0);
    var gate = append(lane1, "bpmngatewayexclusive", item, 3500, 0);
    item = append(lane1, "bpmntask", gate, 3500, 0);
    item = append(lane1, "bpmnendevent", item, 10500, 0);
    
    var lane2 = JSG.graphItemFactory.createShape("bpmnlane")[0];
    lane2.setSize(25000, 7000);
    pool.getItemAt(2).addItem(lane2);
    item = append(lane2, "bpmntask", gate, 3500, 500, "center", "left");
    
    attach(lane2, "bpmndataobject", item, "bl");
    attach(lane2, "bpmndataobject", item, "br");

    var gate2 = append(lane2, "bpmngatewayinclusive", item, 3500, 0);
    item = append(lane2, "bpmntask", gate2, 3500, 0);
    item = append(lane2, "bpmnendmessageevent", item, 3500, 0);

    var lane3 = JSG.graphItemFactory.createShape("bpmnlane")[0];
    lane3.setSize(25000, 4000);
    pool.getItemAt(2).addItem(lane3);

    item = append(lane3, "bpmnstarttimeevent", gate2, 0, -500);
    item = append(lane3, "bpmntask", item, 3500, 0);
    item = append(lane3, "bpmnendescalationevent", item, 3500, 0);

    this.saveGraph(diagram.get('id'), graph);

    // create Graph with flowchart...       
    var diagram = parentfolder.appendChild({name : "Flowchart", id : JSGDemo.getNewId(), expandable : false, leaf : true});

    var graph = new JSG.graph.model.Graph();
    item = append(graph, "flowstart");
    item.getPin().setCoordinate(9000, 2000);
    item = append(graph, "flowprocess", item, 0, 2500);
    item = append(graph, "flowdelay", item, 0, 2500);
    var dec = append(graph, "flowdecision", item, 0, 2500);

    // right branch    
    item = append(graph, "flowprocess", dec, 3000, 2500, "right");
    attach(graph, "flowdocument", item, "rt");
    attach(graph, "flowstoreddata", item, "rb");
    item = append(graph, "flowpreparation", item, 0, 2500);
    item = append(graph, "flowsubprocess", item, 0, 2500);
    var join = append(graph, "flowjoin", item, -3000, 2500, "cemter", "right");

    // left branch    
    item = append(graph, "flowprocess", dec, -3000, 2500, "left");
    var or = append(graph, "flowor", item, 0, 2500);
    
    item = append(graph, "flowprocess", or, -4000, 2500, "left");
    item = append(graph, "flowoffpage", item, 0, 2500);

    item = append(graph, "flowprocess", or, 0, 2500);

    var portTarget = join.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.5));
    var portSource = item.addCenterPort();    
    var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
    edge.setSourcePort(portSource);
    edge.setTargetPort(portTarget);
    edge.getFormat().setLineCorner(200);
    edge.getFormat().setLineArrowEnd(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDSMALL);
    edge.getFormat().setFillColor("#000000");

    item = append(graph, "flowprocess", join, 0, 2500);
    item = append(graph, "flowterminator", item, 0, 2500);

    var page = graph.getSettings().getPage();
    page.setOrientation(JSG.graph.model.settings.PageOrientation.PORTRAIT);
    
    this.saveGraph(diagram.get('id'), graph);

    function append(graph, type, previousItem, offsetX, offsetY, portLocSource, portLocTarget) {
        if (offsetX == undefined)
            offsetX = 0;
        if (offsetY == undefined)
            offsetY = 0;

        var newItem = JSG.graphItemFactory.createShape(type)[0];
        graph.addItem(newItem);

        if (previousItem) {
            var box = previousItem.getBoundingBox();
            var org = previousItem.getOrigin();
            newItem.getPin().setCoordinate(org.x + box.getCenter().x + offsetX, org.y + box.getCenter().y + offsetY);
        } else {
            newItem.getPin().setCoordinate(13000, 2000);
        }        

        if (previousItem) {
            var portSource, portTarget;
            if (portLocSource == "right") {
                portSource = previousItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(1, 0.5));
            } else if (portLocSource == "left") {
                portSource = previousItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.5));
            } else {
                portSource = previousItem.addCenterPort();    
            }
            if (portLocTarget == "right") {
                portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(1, 0.5));
            } else if (portLocTarget == "left") {
                portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.5));
            } else if (portLocTarget == "top") {
                portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 0));
            } else {
                portTarget = newItem.addCenterPort();
            }    
    
            var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
            edge.setSourcePort(portSource);
            edge.setTargetPort(portTarget);
            edge.getFormat().setLineCorner(200);
            edge.getFormat().setLineArrowEnd(JSG.graph.model.attributes.ArrowStyle.ARROWFILLEDSMALL);
            edge.getFormat().setFillColor("#000000");
        }        
        
        return newItem;
    }

    function attach(graph, type, parentItem, position) {
        var newItem = JSG.graphItemFactory.createShape(type)[0];
        graph.addItem(newItem);

        var box = parentItem.getBoundingBox();
        var org = parentItem.getOrigin();

        switch (position) {
            case "lt":
                newItem.getPin().setCoordinate(org.x - box.getWidth() * 1, org.y - box.getHeight() / 2);
                
                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 1));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.25));
                break;
            case "lb":
                newItem.getPin().setCoordinate(org.x - box.getWidth() * 1, org.y + box.getHeight() * 1.5);

                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 0));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0, 0.75));
                break;
            case "rt":
                newItem.getPin().setCoordinate(org.x + box.getWidth() * 2, org.y - box.getHeight() / 2);
                
                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 1));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(1, 0.25));
                break;
            case "rb":
                newItem.getPin().setCoordinate(org.x + box.getWidth() * 2, org.y + box.getHeight() * 1.5);

                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 0));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(1, 0.75));
                break;
            case "bl":
                newItem.getPin().setCoordinate(org.x, org.y + box.getHeight() * 2.5);

                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 0));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.25, 1));
                break;
            case "br":
                newItem.getPin().setCoordinate(org.x + box.getWidth(), org.y + box.getHeight() * 2.5);

                var portTarget = newItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.5, 0));    
                var portSource = parentItem.addPortAtRelativeLocation(new JSG.graph.model.Port(), new JSG.geometry.Point(0.75, 1));
                break;
        }

        var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
        edge.setSourcePort(portSource);
        edge.setTargetPort(portTarget);
        edge.getFormat().setLineCorner(200);
        
        return newItem;
    }
};

JSGDemo.samples.General.createLayout = function(root) {
    var CONSTS = JSG.graph.attr.consts;
    var ATTR = JSG.graph.attr.ItemAttributes;

    var parentfolder = root.appendChild({name : "Layout Samples", id : JSGDemo.getNewId(), expandable : true, leaf : false});


    // create Graph with event process chain...       
    var flowDiagram = parentfolder.appendChild({name : "Flow Layout", id : JSGDemo.getNewId(), expandable : false, leaf : true});
    var graph = new JSG.graph.model.Graph();
    
    var generator = new ARAC.layout.tools.GraphGenerator();
    var support = new JSG.aracadapter.GraphGenSupport(graph, "function");
    
    generator.genFlow(support, new ARAC.layout.tools.graphgen.FlowGenContext(
                        { 
                            nodeCount: 50 
                        }));

    var aracGraph = new JSG.aracadapter.AracGraphAdapter(graph);
    var config = ARAC.layout.defaultConfigStore.get('Flow-CardinalPoints-Orth');
      //new ARAC.layout.flow.FlowLayoutConfig({nodeDistance : 1500, layerDistance : 1000, edgeType : ARAC.layout.config.EdgeType.ORTHOGONAL});

    ARAC.layout.apply(aracGraph, config, new ARAC.layout.LayoutWatch());

    this.saveGraph(flowDiagram.get('id'), graph);

    // graph with orgchart
    var treeDiagram = parentfolder.appendChild({name : "Tree Layout", id : JSGDemo.getNewId(), expandable : false, leaf : true});
    var graph = new JSG.graph.model.Graph();
    
    var generator = new ARAC.layout.tools.GraphGenerator();
    var support = new JSG.aracadapter.GraphGenSupport(graph, "orgperson");
    
    generator.genTree(support, new ARAC.layout.tools.graphgen.TreeGenContext(
                        { 
                            nodeCount: 50 
                        }));

    var aracGraph = new JSG.aracadapter.AracGraphAdapter(graph);
    var config = ARAC.layout.defaultConfigStore.get('Tree-CardinalPoints-Orth');
    //new ARAC.layout.tree.TreeLayoutConfig({nodeDistance : 1500, layerDistance : 1000, edgeType : ARAC.layout.config.EdgeType.ORTHOGONAL});

    ARAC.layout.apply(aracGraph, config, new ARAC.layout.LayoutWatch());

    this.saveGraph(treeDiagram.get('id'), graph);
};

JSGDemo.samples.General.createOrgChart = function(root) {
    var CONSTS = JSG.graph.attr.consts;
    var ATTR = JSG.graph.attr.ItemAttributes;

    var parentfolder = root.appendChild({name : "OrgChart Samples", id : JSGDemo.getNewId(), expandable : true, leaf : false});

    var treeDiagram = parentfolder.appendChild({name : "Company", id : JSGDemo.getNewId(), expandable : false, leaf : true});

    // create Graph with company orgchart...       
    var graph = new JSG.graph.model.Graph();
    graph.setType("orgchart");

    var newItem = JSG.graphItemFactory.createShape("orgmanager")[0];
    graph.addItem(newItem);
    newItem.getPin().setCoordinate(13000, 2000);

    var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
    item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 1000));
    item.getPin().setCoordinate(23250, 1000);
    item.getFormat().setFillColor("#404040");
    item.getTextFormat().setFontColor("#FFFFFF");
    item.getFormat().setLineColor("#333333");
    item.getFormat().setGradientColor("#F3F3F3");
    label = item.addLabel("Click on the manager and use the\nbuttons to create employees or assistants");
    graph.addItem(item);

    this.saveGraph(treeDiagram.get('id'), graph);
};

JSGDemo.samples.General.saveGraph = function(id, graph) {
    var file = new JSG.commons.XMLWriter( 'UTF-8', '1.0' );
    
    file.writeStartDocument();

    file.writeStartElement("document");
    file.writeAttributeString("version", "1.0.0");

    file.writeEndElement();
    
    graph.saveXML(file);
    file.writeEndDocument();

    var xml = file.flush();
    var cxml = LZString.compressToUTF16(xml);
    localStorage.setItem(id, cxml);
};

JSGDemo.samples.General.hsl2rgb = function(h, s, l) {
    var m1, m2, hue;
    var r, g, b;
    s /=100;
    l /= 100;
    if (s == 0)
        r = g = b = (l * 255);
    else {
        if (l <= 0.5)
            m2 = l * (s + 1);
        else
            m2 = l + s - l * s;
        m1 = l * 2 - m2;
        hue = h / 360;
        r = Math.round(HueToRgb(m1, m2, hue + 1/3));
        g = Math.round(HueToRgb(m1, m2, hue));
        b = Math.round(HueToRgb(m1, m2, hue - 1/3));
    }

    function HueToRgb(m1, m2, hue) {
        var v;
        if (hue < 0)
            hue += 1;
        else if (hue > 1)
            hue -= 1;
    
        if (6 * hue < 1)
            v = m1 + (m2 - m1) * hue * 6;
        else if (2 * hue < 1)
            v = m2;
        else if (3 * hue < 2)
            v = m1 + (m2 - m1) * (2/3 - hue) * 6;
        else
            v = m1;
    
        return 255 * v;
    }

    return {r: r, g: g, b: b};
};
    
