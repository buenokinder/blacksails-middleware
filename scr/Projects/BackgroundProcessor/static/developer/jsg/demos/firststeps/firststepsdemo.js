
var graphEditor;
var graph;

function onWindowLoaded() {
    insertCode();    
    
    graphEditor = new JSG.ui.GraphEditor("canvas1");
   	//register our default interactions:
	var defInteraction = graphEditor.getInteractionHandler().getDefaultInteraction();
	defInteraction.removeAllActivators(); 
	addActivator(JSG.graph.interaction.CreateEdgeActivator);
	addActivator(JSG.graph.interaction.CreateFriendActivator);
	addActivator(JSG.graph.interaction.ResizeActivator);
	addActivator(JSG.graph.interaction.ReshapeActivator);
	addActivator(JSG.graph.interaction.RotateActivator);
	addActivator(JSG.graph.interaction.EditTextActivator);
	addActivator(JSG.graph.interaction.MoveActivator);
	//finally
	addActivator(JSG.graph.interaction.MarqueeActivator);

    graph = new JSG.graph.model.Graph();
    graphEditor.setGraph(graph);

    resizeCanvas();
    
    setTimeout(resizeCanvas, 1000);
    
    window.onload = window.onresize = resizeCanvas; 

	function addActivator(ActivatorConstructor) {
		defInteraction.addActivator(ActivatorConstructor.KEY, new ActivatorConstructor());
	}
    function resizeCanvas() {
        var canvas = document.getElementById("canvas1");
        var graphDIV = document.getElementById("graph");
        canvas.width = graphDIV.clientWidth;
        canvas.height = window.innerHeight;
        graphEditor.resizeContent(canvas.width, canvas.height);        
    }
}

function insertCode() {
    var sections = document.getElementsByTagName('pre');
    
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if (section.attributes["source"]) {
            var attr = section.attributes["source"];
            var code = getFunctionCode(sampleCode, attr.nodeValue);
            if (code != undefined) {
                section.innerHTML = code;
            }
        }
    }
    
    prettyPrint();

    function getFunctionCode(obj, funcName) {
        for(var f in obj) {
            if(typeof(obj[f]) == "function" && obj.hasOwnProperty(f) && f == funcName) {
                return obj[f].toString();
            }
        }
    }
}

var Samples = function() {

this.createNode = function() {
    // create rectangular node
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    
    node.getPin().setCoordinate(3000, 3000);
    node.setSize(2000, 3000);

    // create ellipsoid node
    node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
    
    node.getPin().setCoordinate(3000, 8000);
    node.setSize(3000, 2000);

    graphEditor.invalidate();
};

this.createEdge = function() {
    // create straight edge
    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setStartPointTo(new JSG.geometry.Point(8000, 2000));
    edge.setEndPointTo(new JSG.geometry.Point(9000, 6000));

    // create orthogonal edge
    edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
    edge.init(new JSG.geometry.Point(3000, 15000), new JSG.geometry.Point(5000, 12000));

    graphEditor.invalidate();
};

this.createLink = function() {
    // create two nodes with ellipsoid shape
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
    node.getPin().setCoordinate(12000, 3000);
    node.setSize(1000, 2000);
    var portSource = node.addCenterPort();    

    node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
    node.getPin().setCoordinate(12000, 8000);
    node.setSize(1000, 2000);
    var portTarget = node.addCenterPort();    

    // create edge and attach it to the previously created ports
    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setSourcePort(portSource);
    edge.setTargetPort(portTarget);

    graphEditor.invalidate();
};

this.createDrawing = function() {
    // start with clean editor
    graphEditor.clear();

    // add wheels
    var x = 2500;
    for (var i = 0; i < 4; i++) {
        var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
        node.getPin().setCoordinate(x, 6000);
        node.setSize(1500, 1500);
        var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
        node.getPin().setCoordinate(x, 6000);
        node.setSize(750, 750);
        x += i == 1 ? 5000 : 3000;
    }    
    
    // add truck
    node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape()));
    node.getPin().setCoordinate(4000, 3750);
    node.setSize(6500, 4000);
    // define polygon points of truck (as factor of node dimensions)
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.15, 0));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 1));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0.45));
    var portTarget = node.addCenterPort();    

    // add trailer
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(12000, 3750);
    node.setSize(6500, 4000);
    node.addLabel("Trailer");
    var portSource = node.addCenterPort();    

    // add window
    node  = JSG.graph.model.GraphItemFactory.prototype.createItemFromString("roundRect");
    node = graph.addItem(node);
    node.getPin().setCoordinate(4500, 2750);
    node.setSize(5000, 1500);

    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setSourcePort(portSource);
    edge.setTargetPort(portTarget);

    graphEditor.invalidate();
};

this.formatDrawing = function() {
    // start with clean editor
    graphEditor.clear();

    // add wheels
    var x = 2500;
    for (var i = 0; i < 4; i++) {
        var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
        node.getPin().setCoordinate(x, 6000);
        node.setSize(1500, 1500);
        // set color
        node.getFormat().setFillColor("#5b0f00");
        // define shadow for tire
        node.getFormat().setShadowOffsetX(150);
        node.getFormat().setShadowOffsetY(150);
        node.getFormat().setShadowBlur(10);
        node.getFormat().setShadowColor("#333333");
        var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
        node.getPin().setCoordinate(x, 6000);
        node.setSize(750, 750);
        node.getFormat().setFillColor("#CCCCCC");
        x += i == 1 ? 5000 : 3000;
    }    
    
    // add truck
    node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape()));
    node.getPin().setCoordinate(4000, 3750);
    node.setSize(6500, 4000);
    // define polygon points of truck (as factor of node dimensions)
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.15, 0));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 1));
    node.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0.45));
    node.getFormat().setFillColor("#fff2cc");
    var portTarget = node.addCenterPort();    

    // add trailer
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(12000, 3750);
    node.setSize(6500, 4000);
    var label = node.addLabel("JS Graph");
    // text formatting
    label.getTextFormat().setFontSize(18);
    label.getTextFormat().setFontColor("#0000FF");
    node.getFormat().setFillColor("#fff2cc");
    var portSource = node.addCenterPort();    

    // add window
    node  = JSG.graph.model.GraphItemFactory.prototype.createItemFromString("roundRect");
    node = graph.addItem(node);
    node.getPin().setCoordinate(4500, 2750);
    node.setSize(5000, 1500);
    // define a linear gradient
    node.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.GRADIENT);
    node.getFormat().setFillColor("#cfe2f3");

    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setSourcePort(portSource);
    edge.setTargetPort(portTarget);
    edge.getFormat().setLineColor("#CCFFCC");
    edge.getFormat().setLineWidth(150);     // 1/100th mm

    graphEditor.invalidate();
    
    return label;
};

this.moveDrawing = function() {
    var label = this.formatDrawing();

    var animation = new JSG.anim.Animation(JSG.anim.AnimationType.LINEAR, this);

    // 2 sec animation...
    animation.start(animate, 2000);

    function animate(progress) {
        for (var i = 0, n = graph._subItems.length; i < n; i++) {
            var node = graph._subItems[i];
            // move object vertically by 0.5 cm
            node.translate(0, 50);
        }
        // rotate trailer label
        label.setAngle(progress * Math.PI * 2);
        graphEditor.invalidate();
    }
};

this.pagePageSettings = function() {
    // set page to page mode and change page settings
    var page = graph.getSettings().getPage();
    page.setFormat(JSG.graph.model.settings.PageSize.A5);
    page.setOrientation(JSG.graph.model.settings.PageOrientation.LANDSCAPE);
     
    // create a node to generate pages
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(25000, 30000);
    node.setSize(3000, 3000);

    graphEditor.setZoom(0.5);
    graphEditor.setViewMode(JSG.ui.graphics.DisplayMode.PAGE);
    graphEditor.invalidate();
};

this.endlessPageSettings = function() {
    // create a node to generate pages
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(25000, 30000);
    node.setSize(3000, 3000);

    graphEditor.setZoom(0.5);
    graphEditor.setViewMode(JSG.ui.graphics.DisplayMode.ENDLESS);
    graphEditor.invalidate();
};

this.localPinAtCenter = function() {
    // start with clean editor
    this.clean();

    // create rectangular nodes
    // define size first and then set the pin
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.setSize(3000, 3000);
    node.getPin().setCoordinate(5000, 2000);

    // define pin and a local pin and then set the size
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(5000, 6000);
    node.getPin().setLocalCoordinate(0, 0);
    node.setSize(3000, 3000);

    // define pin and a local pin using formulas and then set the size
    var node = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.getPin().setCoordinate(5000, 13000);
    node.getPin().setLocalCoordinate(new JSG.graph.expr.NumberExpression(0, "WIDTH * 0.25"), new JSG.graph.expr.NumberExpression(0, "HEIGHT * 0.75"));
    node.getPin().evaluate();
    node.setSize(3000, 3000);

    graphEditor.invalidate();
};

this.nodesWithFormula = function() {
    // start with clean editor
    this.clean();

    // create rectangular node
    var nodeSource = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    nodeSource.setSize(3000, 3000);
    nodeSource.getPin().setCoordinate(3000, 5000);
    var label = nodeSource.addLabel("Move me");
    label.setItemAttribute(JSG.graph.attr.ItemAttributes.SELECTIONMODE, JSG.graph.attr.consts.SelectionMode.NONE);

    // define the pin y coordinate to depend on the previous nodes y coordinates
    var nodeTarget = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    nodeTarget.setSize(3000, 3000);
    nodeTarget.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "5000 + Item." + nodeSource.getId() + "!Pin_X"), new JSG.graph.expr.NumberExpression(0, "Item." + nodeSource.getId() + "!Pin_Y"));
    //changed nodes coordinate after node was added to graph, so we have to evaluate ourself
    nodeTarget.evaluate();  
    // defines item as not moveable -> formula will not be overwritten
    nodeTarget.setItemAttribute(JSG.graph.attr.ItemAttributes.MOVEABLE, JSG.graph.attr.consts.Direction.NONE);
    nodeTarget.setItemAttribute(JSG.graph.attr.ItemAttributes.SIZEABLE, false);

    graphEditor.invalidate();
};

this.lineWithFormula = function() {
    // start with clean editor
    this.clean();

    // create rectangular node
    var nodeSource = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
    nodeSource.setSize(1000, 1000);
    nodeSource.getPin().setCoordinate(2000, 2000);
    nodeSource.setItemAttribute(JSG.graph.attr.ItemAttributes.SIZEABLE, false);
    nodeSource.getFormat().setFillColor("#FF0000");
    nodeSource.getFormat().setBrightness(new JSG.graph.expr.NumberExpression(0, "PIN_Y / 150"));
    //changed format expression after node was added to graph, so we have to evaluate ourself
    nodeSource.evaluate();  

    var label = nodeSource.addLabel("Move me");
    label.setItemAttribute(JSG.graph.attr.ItemAttributes.SELECTIONMODE, JSG.graph.attr.consts.SelectionMode.NONE);

    // define the pin y coordinate to depend on the previous nodes y coordinates
    // create straight edge
    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setStartPointTo(new JSG.geometry.Point(8000, 2000));
    edge.setEndPointTo(new JSG.geometry.Point(9000, 6000));
    edge.getFormat().setLineWidth(new JSG.graph.expr.NumberExpression(0, "Item." + nodeSource.getId() + "!PIN_X / 50"));
    //changed format expression after edge was added to graph, so:
    edge.evaluate();  

    label.setText(new JSG.graph.expr.Expression(0, "Item." + edge.getId() + "!LINEWIDTH"));
    //changed label expression after label was added, so:
    label.evaluate();  


    graphEditor.invalidate();
};

this.createSimpleContainer = function() {
    // start with clean editor
    this.clean();

    // create rectangular node
    var container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    container.setSize(6000, 6000);
    container.getPin().setCoordinate(8000, 8000);
    container.getFormat().setFillColor("#DDDDDD");
    
    // add label to container
    var label = container.addLabel("Container");
    label.setItemAttribute(JSG.graph.attr.ItemAttributes.SELECTIONMODE, JSG.graph.attr.consts.SelectionMode.NONE);
    // align it to the bottom
    label.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.5"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT"));
    label.getPin().setLocalCoordinate(new JSG.graph.expr.NumberExpression(0, "WIDTH * 0.5"), new JSG.graph.expr.NumberExpression(0));
    label.getPin().evaluate(); //changed pins expression, so evaluate it...
    
    var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.setSize(2000, 2000);
    node.getPin().setCoordinate(2000, 3000);

    graphEditor.invalidate();
};

this.createAdvancedContainer = function() {
    // start with clean editor
    this.clean();

    // create polygon node
    container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape()));
    // define polygon points (as factor of node dimensions)
    container.setSize(6000, 6000);
    container.getPin().setCoordinate(8000, 8000);
    container.getFormat().setFillColor("#DDAADD");
    container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.15, 0));
    container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.15));
    container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.8));
    container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.3, 1));
    container.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0.45));

    var label = container.addLabel("Container");
    label.setItemAttribute(JSG.graph.attr.ItemAttributes.SELECTIONMODE, JSG.graph.attr.consts.SelectionMode.NONE);
    label.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.5"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT"));
    label.getPin().setLocalCoordinate(new JSG.graph.expr.NumberExpression(0, "WIDTH * 0.5"), new JSG.graph.expr.NumberExpression(0));
	label.getPin().evaluate(); //changed pins expression, so evaluate it...
	
    // add node to container
    var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.setSize(2000, 2000);
    node.getPin().setCoordinate(4000, 2000);
    var label = node.addLabel("Static Node");

    // add node to container using formulas
    var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape()));
    node.setSize(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.2"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT * 0.2"));
    node.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH * 0.4"), new JSG.graph.expr.NumberExpression(0, "Parent!HEIGHT * 0.7"));
    node.evaluate(); //changed some node expressions after adding node to graph, so evaluate it...
    var label = node.addLabel("Resizing Node");

    graphEditor.invalidate();
};

this.createSymbol = function() {
    // start with clean editor
    this.clean();

    // create rectangular node
    container = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    container.setSize(4000, 2000);
    container.getPin().setCoordinate(8000, 8000);
    container.getFormat().setFillColor("#FFFFFF");
    var label = container.addLabel("Symbol");
    label.setItemAttribute(JSG.graph.attr.ItemAttributes.SELECTIONMODE, JSG.graph.attr.consts.SelectionMode.NONE);

    var node = container.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    node.setSize(600, 600);
    node.getPin().setCoordinate(new JSG.graph.expr.NumberExpression(0, "Parent!WIDTH - 200"), 200);
    node.getPin().setLocalCoordinate(new JSG.graph.expr.NumberExpression(0, "WIDTH * 1"), new JSG.graph.expr.NumberExpression(0));
    node.getPin().evaluate(); //changed pins expression, so evaluate it...
    node.getFormat().setLineStyle(JSG.graph.model.attributes.LineStyle.NONE);
    node.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.PATTERN);
    node.getFormat().setPattern("images/logo.png");

    graphEditor.invalidate();
};

this.clean = function() {
    graphEditor.clear();
    graphEditor.setZoom(1);
    var page = graph.getSettings().getPage();
    page.setFormat(JSG.graph.model.settings.PageSize.A4);
    page.setOrientation(JSG.graph.model.settings.PageOrientation.LANDSCAPE);
    graphEditor.setViewMode(JSG.ui.graphics.DisplayMode.PAGE);
};

this.formatLine = function() {
    // start with clean editor
    this.clean();

    // create edge
    var edge = graph.addItem(new JSG.graph.model.Edge());
    edge.setStartPointTo(new JSG.geometry.Point(1000, 1000));
    edge.setEndPointTo(new JSG.geometry.Point(6000, 5000));
    // format edges with dashed dotted line, color and line width
    edge.getFormat().setLineStyle(JSG.graph.model.attributes.LineStyle.DASHDOTDOT);
    edge.getFormat().setLineWidth(120);
    edge.getFormat().setLineColor("#FFCC00");

    // create orthogonal edge
    var edge = graph.addItem(new JSG.graph.model.Edge(new JSG.graph.model.shapes.OrthoLineShape()));
    edge.init(new JSG.geometry.Point(4000, 8000), new JSG.geometry.Point(12000, 12000)); 
    
    // format edges with dashed line, color and round corners
    edge.getFormat().setLineCorner(200);
    edge.getFormat().setLineStyle(JSG.graph.model.attributes.LineStyle.DASH);
    edge.getFormat().setLineColor("#CC00FF");
    edge.getFormat().setLineWidth(150);

    // format border of rectangle with color and round corners
    var item = graph.addItem(new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape()));
    item.setSize(4000, 2000);
    item.getPin().setCoordinate(4000, 15000);
    item.getFormat().setLineColor("#AAFFDD");
    item.getFormat().setLineCorner(300);
    item.getFormat().setLineWidth(300);


    graphEditor.invalidate();
};

this.formatLineArrow = function() {
    // start with clean editor
    this.clean();

    // create polyline
    var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.PolygonShape());
    graph.addItem(item);

    item.setBoundingBoxTo(new JSG.geometry.BoundingBox(5000, 5000));
    item.getPin().setCoordinate(8000, 8000);

    item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0, 0));
    item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0));
    item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(0.5, 0.4));
    item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 0.4));
    item.getShape().addCoordinate(JSG.graph.Coordinate.fromRelativeXY(1, 1));
    item.setItemAttribute(JSG.graph.attr.ItemAttributes.CLOSED, false);

    // apply line format using arrow
    item.getFormat().setLineWidth(50);
    item.getFormat().setLineArrowEnd(JSG.graph.model.attributes.ArrowStyle.ARROWDOUBLEFILLED);
    item.getFormat().setLineArrowStart(JSG.graph.model.attributes.ArrowStyle.CIRCLEARROWREVERSE);
    // within lines or polylines the fill color is used to fill the arrow heads
    item.getFormat().setFillColor("#FF0000");

    graphEditor.invalidate();
};

this.formatFillSolid = function() {
    // start with clean editor
    this.clean();

    // create objects and fill them with solid colors and apply some transparency
    for (var i = 0; i < 360; i+=20) {
        var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(1000, 1000));
        item.getPin().setCoordinate(9000 + 3000 * Math.cos(Math.PI * i / 180),  
                                    6000 + 3000 * Math.sin(Math.PI * i / 180));
        item.getFormat().setFillColorRGB(Math.min(i, 255), 128, 192);
        item.getFormat().setTransparency(i / 180 * 100);
    }

    graphEditor.invalidate();
};

this.formatFillGradient = function() {
    // start with clean editor
    this.clean();

    // create objects and fill them with gradients
    
    // linear gradient
    var item = createNode(2000, 2000);

    // linear gradient with angle
    item = createNode(5000, 2000);
    item.getFormat().setGradientAngle(45);

    // circular gradient 
    item = createNode(2000, 6000);
    item.getFormat().setGradientType(JSG.graph.model.attributes.GradientStyle.RADIAL);

    // circular gradient with offset 
    item = createNode(5000, 6000);
    item.getFormat().setGradientType(JSG.graph.model.attributes.GradientStyle.RADIAL);
    item.getFormat().setGradientOffsetX(30);
    item.getFormat().setGradientOffsetY(70);

    graphEditor.invalidate();
    
    function createNode(x, y) {
        var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(2000, 2000));
        item.getPin().setCoordinate(x, y);
        item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.GRADIENT);
        item.getFormat().setFillColor("#AA00FF");
        item.getFormat().setGradientColor("#AADDFF");
        
        return item;        
    }
};

this.formatFillPattern = function() {
    // start with clean editor
    this.clean();

    // create objects and fill them with gradients
    var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
    graph.addItem(item);
    item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 3000));
    item.getPin().setCoordinate(3000, 3000);
    item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.PATTERN);
    item.getFormat().setPattern("images/logo.png");

    item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
    graph.addItem(item);
    item.setBoundingBoxTo(new JSG.geometry.BoundingBox(15000, 10000));
    item.getPin().setCoordinate(9000, 12000);
    item.getFormat().setFillStyle(JSG.graph.model.attributes.FillStyle.PATTERN);
    item.getFormat().setPattern("images/logo.png");
    item.getFormat().setPatternStyle(JSG.graph.model.attributes.PatternStyle.REPEAT);
    
    graphEditor.invalidate();
};

this.formatTextFont = function() {
    // start with clean editor
    this.clean();

    var item;
    var data = [{
        "name" : "Arial"}, {"name" : "Courier New"}, {"name" : "Georgia"}, {"name" : "Lucida"}, {
        "name" : "Lucida Sans"}, {"name" : "Palatino"}, {"name" : "Tahoma"}, {"name" : "Times New Roman"}, {"name" : "Trebuchet MS"}, {"name" : "Verdana"
    }];
    
    // format with different font names
    for (var i = 0; i < 7; i++) {
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(2000 + 3500 * i, 2000);
        var label = item.addLabel(data[i].name);
        label.getTextFormat().setFontSize(14);
        label.getTextFormat().setFontName(data[i].name);
    }

    // format with different font sizes
    for (var i = 0; i < 7; i++) {
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(2000 + 3500 * i, 5000);
        var label = item.addLabel("Size " + (10 + i * 2));
        label.getTextFormat().setFontSize((10 + i * 2));
    }

    // format with different font styles
    for (var i = 0; i < 7; i++) {
        item = new JSG.graph.model.Node(new JSG.graph.model.shapes.EllipseShape());
        graph.addItem(item);
        item.setBoundingBoxTo(new JSG.geometry.BoundingBox(3000, 1500));
        item.getPin().setCoordinate(2000 + 3500 * i, 8000);
        var label = item.addLabel("Styles");
        label.getTextFormat().setFontStyle(i);
    }
    
    graphEditor.invalidate();
};

this.formatTextPosition = function() {
    // start with clean editor
    this.clean();

    // create item
    var item = new JSG.graph.model.Node(new JSG.graph.model.shapes.RectangleShape());
    graph.addItem(item);
    item.setBoundingBoxTo(new JSG.geometry.BoundingBox(6000, 5000));
    item.getPin().setCoordinate(9000, 5000);
    
    // add multiple labels to an item and assign different text positions to it.
    for (var i = 1; i < 6; i++) {
        for (var j = 1; j < 6; j++) {
            var text = "Here";
            if (i == 3 && j == 3)
                text = "Multiple Labels\nper Graphical\nObject";
            var label = item.addLabel(text);
            label.getTextFormat().setVerticalPosition(i);
            label.getTextFormat().setHorizontalPosition(j);
        }
    }

    graphEditor.invalidate();
};

}; 

var sampleCode = new Samples();


