JSGDemo.namespace("JSGDemo.graph.layout");

JSGDemo.graph.layout.AracConfig =
{
    ARAC_FORCE: new ARAC.layout.force.ForceLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      nodeDistance:3200,
      iterations:120}),

    ARAC_TREE_LOTB_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000}),
    ARAC_TREE_LOBT_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.BOTTOM_TO_TOP,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000}),
    ARAC_TREE_LOLR_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.LEFT_TO_RIGHT,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000}),
    ARAC_TREE_LORL_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.RIGHT_TO_LEFT,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000}),

    ARAC_TREE_LOTB_PBH: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      parentBalancing:ARAC.layout.config.ParentBalancing.HEAD,
      nodeDistance:1000,
      layerDistance:2000}),
    ARAC_TREE_LOTB_PBT: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
      nodeDistance:1000,
      layerDistance:2000}),

    ARAC_TREELISTSINGLE_LOTB_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
//      parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      nodeDistance:1000,
      layerDistance:500}),
    ARAC_TREELISTSINGLE_LOBT_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.LEFT_TO_RIGHT,
//      parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      nodeDistance:1000,
      layerDistance:500}),
    ARAC_TREELISTSINGLE_LOLR_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.BOTTOM_TO_TOP,
//      parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      nodeDistance:1000,
      layerDistance:500}),
    ARAC_TREELISTSINGLE_LORL_PBM: new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.RIGHT_TO_LEFT,
//      parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      nodeDistance:1000,
      layerDistance:500}),

    ARAC_ORGCHART_L0TREE_L3LISTSINGLE : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[new ARAC.layout.tree.TreeLevelConfig(3,
        new ARAC.layout.tree.TreeLayoutConfig({
          layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
          treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
          parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
          nodeDistance:1000,
          layerDistance:2000}))]}),
    ARAC_ORGCHART_L0LISTSINGLE_L3TREE : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[new ARAC.layout.tree.TreeLevelConfig(3,
        new ARAC.layout.tree.TreeLayoutConfig({
          layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
          treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
          parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
          nodeDistance:1000,
          layerDistance:2000}))]}),
    ARAC_ORGCHART_L0TREE_L3ListSINGLE_L5TREE : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[
        new ARAC.layout.tree.TreeLevelConfig(3,
          new ARAC.layout.tree.TreeLayoutConfig({
            layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
            treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
            parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
            nodeDistance:1000,
            layerDistance:2000})),
        new ARAC.layout.tree.TreeLevelConfig(5,
          new ARAC.layout.tree.TreeLayoutConfig({
            layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
            treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
            parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
            nodeDistance:1000,
            layerDistance:2000})) ]
    }),
    ARAC_ORGCHART_L0LISTSINGLE_L3TREE_L6LISTSINGLE : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[
        new ARAC.layout.tree.TreeLevelConfig(3,
          new ARAC.layout.tree.TreeLayoutConfig({
            layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
            treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
            parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
            nodeDistance:1000,
            layerDistance:2000})),
        new ARAC.layout.tree.TreeLevelConfig(6,
          new ARAC.layout.tree.TreeLayoutConfig({
            layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
            treeStyle:ARAC.layout.config.TreeStyle.TREE_LIST_SINGLE,
            parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
            nodeDistance:1000,
            layerDistance:2000})) ]
    }),

    ARAC_ORGCHART_CHECK : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[new ARAC.layout.tree.TreeLevelConfig(3,
        new ARAC.layout.tree.TreeLayoutConfig({
          layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
          treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
          parentBalancing:ARAC.layout.config.ParentBalancing.HEAD,
          nodeDistance:1000,
          layerDistance:2000}))]}),
    ARAC_ORGCHART_ANTICHECK : new ARAC.layout.tree.TreeLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
      treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
      parentBalancing:ARAC.layout.config.ParentBalancing.MEDIAN,
      nodeDistance:1000,
      layerDistance:2000,
      levelDescriptor:[new ARAC.layout.tree.TreeLevelConfig(3,
        new ARAC.layout.tree.TreeLayoutConfig({
          layoutOrientation:ARAC.layout.config.LayoutOrientation.TOP_TO_BOTTOM,
          treeStyle:ARAC.layout.config.TreeStyle.TREE_NORMAL,
          parentBalancing:ARAC.layout.config.ParentBalancing.TAIL,
          nodeDistance:1000,
          layerDistance:2000}))]}),

    ARAC_FLOW: new ARAC.layout.flow.FlowLayoutConfig({
      layoutOrigin:new ARAC.Coord(2000, 2000),
      nodeDistance:3000,
      layerDistance:2000,
//      submitIntermediateResults:true,
//      resultUpdate:function() { editor.invalidate(); }
    })
};
