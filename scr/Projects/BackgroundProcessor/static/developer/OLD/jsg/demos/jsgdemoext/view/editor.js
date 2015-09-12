/**
 * @module JSGDemo.view
 * @namespace JSGDemo.view
 */
JSG.namespace("JSGDemo.view");

/**
 * Template for an Ext component containing the canvas, which is the user interface element containing the Graph.
 * 
 * @class Editor
 * @extends Ext.panel.Panel
 */
Ext.define('JSGDemo.view.Editor', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.editor',
    deferredRender : false,
    layout : 'fit',
    closable : true,
    listeners : {
        resize : function(tab, w, h) {
            if (tab.getEditor() != undefined)
                tab.getEditor().resizeContent(w, h);
        },
        activate : function(tab) {
            if (tab.getEditor() != undefined) {
                JSGDemo.navigator.setGraphEditor(tab.getEditor());

                var tree = JSGDemo.modeltree;
                
                tab.record.bubble(function(cnode) {
                    cnode.expand();
                });
                tree.getSelectionModel().select(tab.record);
                
                //update toolbar:
                JSGDemo.toolbar.updateToolbar();
                JSGDemo.statusbar.onNotification();
            }
        },
        beforeclose : function(tab) {
            if (tab.getEditor().getGraph().isChanged()) {
                Ext.Msg.show({
                    title : JSGDemo.resourceProvider.getString("Save Changes?"),
                    msg : JSGDemo.resourceProvider.getString("You are closing a Diagram that has unsaved changes. Would you like to save your changes?"),
                    buttons : Ext.Msg.YESNOCANCEL,
                    icon : Ext.Msg.QUESTION,
                    fn : function(btn) {
                        var tabs = Ext.getCmp('center');
                        if (btn == 'yes') {
                            tab.save();
                            tabs.remove(tab);
                        } else if (btn == 'no') {
                            tabs.remove(tab);
                        }
                    }
                });
                return false;
            }
            return true;
        },
        destroy : function(tab, opts) {
            if (tab.getEditor() != undefined) {
                tab.getEditor().destroy();
                tab.record.tab = undefined;
                tab.jsgEditor = undefined;
                var nc = JSG.graph.notifications.NotificationCenter.getInstance();
                nc.unregister(tab, JSG.graph.controller.GraphItemController.ITEM_CHANGED_NOTIFICATION);
                nc.unregister(tab, JSG.graph.controller.GraphController.GRAPH_CHANGED_NOTIFICATION);
                // nc.unregister(tab, JSG.graph.controller.GraphController.ITEM_ADDED_NOTIFICATION);
                // nc.unregister(tab, JSG.graph.controller.GraphController.ITEM_REMOVED_NOTIFICATION);
                var tabs = Ext.getCmp('center');
                if (!tabs.items.items.length) { //last tab closed?
                    JSGDemo.navigator.clear();
                    var tree = JSGDemo.modeltree;
                    tree.getSelectionModel().deselectAll();
                    JSGDemo.toolbar.updateToolbar();
                }
            }
        },
    },
    /**
     * Get the GraphEditor used in this tab.
     * 
     * @return {JSG.ui.GraphEditor} Editor attached to the tab. 
     */
    getEditor : function () {
        return this.jsgEditor;
    },
    setCustomType : function(type) {
        switch (type) {
            case "orgchart":
                var graph = this.getEditor().getGraph();
                graph.setType(type);
                graph.getLayoutAttributes().setAutoLayout(true);
                graph.getLayoutAttributes().setLayout("OrgChart");
                break;
        }
        
    },
    /**
     * Loads the item from the local storage. The data is fetched the local storage using the id that is
     * a data member of the record. The record is the node with the process, which has been selected for loading.
     * The data is received as a compressed XML String. The string will be decompressed, parsed and passed to the JS-Graph
     * Library for reading the process. 
     * 
     * @method load
     * @param {Ext.tab.Panel} tab Tab with the editor containing the process to be saved.
     */
    load : function(record) {
        Ext.getCmp('load-indicator').show();        
        Ext.defer(function() {
            var data = localStorage.getItem(record.get('id'));
            if (data) {
                var ddata = LZString.decompressFromUTF16(data);
                if (ddata) {
                    var parser = new DOMParser();
                    var xml = parser.parseFromString(ddata, "text/xml");
                    if (xml) {        
                        record.tab.jsgEditor.readXML(xml);
                        record.tab.setCustomType(record.tab.jsgEditor.getGraph().getType().getValue());
                        record.tab.jsgEditor.invalidate();
                    } else {
                        this.showWarning("Diagram File does not contain a valid XML Structure!");
                    }
                } else {
                    this.showWarning("File could not be decompressed!");
                }
            } 
            Ext.getCmp('load-indicator').hide();        
        }, 200);
    },
    /**
     * Save the given item to the local storage. The data is fetched from the editor 
     * in the JS-Graph XML Format. Then the XML String is compressed and put into the local storage
     * using the id of the process. The visible storage info in the status bar is automatically updated.
     * 
     * @method save
     * @param {Ext.tab.Panel} tab Tab with the editor containing the process to be saved.
     */
    save : function() {
        var xml = this.jsgEditor.saveXML();
        if (xml) {
            var cxml = LZString.compressToUTF16(xml);
            localStorage.setItem(this.record.get('id'), cxml);
            this.updateTitle(this.title, true);
        }
        JSGDemo.viewport.updateStorageInfo();
    },
    /**
     * Print the given process to a PDF file. The graph is saved to the server pagewise as SVG-files. The the SVG's are
     * converted to PDF and the resulting PDF pages are merged to one PDF Document. Using this function a progress indicator is shown.
     * 
     * @method print
     */
    print : function() {
        var self = this;
        Ext.getCmp('load-indicator').show();        
        Ext.defer(function() {
            self.printRun();
            Ext.getCmp('load-indicator').hide();        
        }, 200);
    },
    /**
     * Print the given process to a PDF file. The graph is saved to the server pagewise as SVG-files. The the SVG's are
     * converted to PDF and the resulting PDF pages are merged to one PDF Document.
     * 
     * @method printRun
     */
    printRun : function() {
        // create folder
        try {
            var httpRequestObject = new XMLHttpRequest();
            httpRequestObject.open("post", "php/createTmpDirectory.php", false);
            httpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequestObject.send("name=print");

            printGraphDocumentPages(this.getEditor(), this.record.get('name'), httpRequestObject.responseText);
        } catch(err) {
            JSGDemo.viewport.showOfflineWarning();
        }
    
        function printGraphDocumentPages(editor, name, directory) {
            // save one svg per page to folder
            var pagesDone = 0;
            var graph = editor.getGraph();
            var vpages = graph.getVerticalPrintPages();
            var hpages = graph.getHorizontalPrintPages();
            var totalPages = hpages * vpages;
            
            for (var j = 0; j < hpages; j++) {
                for (var i = 0; i < vpages; i++) {
                    var file = editor.saveSVGPage(j, i, true);
                    var httpRequestObject = new XMLHttpRequest();
                    httpRequestObject.open("post", "php/saveFile.php", false);
                    httpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
                    httpRequestObject.onreadystatechange = function() {
                        if (httpRequestObject.readyState == 4 && httpRequestObject.status == 200) {
                            if (++pagesDone >= totalPages) {
                                showPDF(directory);
                            }
                        }
                    };
                    httpRequestObject.send("name=" + directory + "/SVGPage" + zeroPad(j * vpages + i, 100) + ".svg&data=" + encodeURIComponent(file));
                }
            }
        }
    
        function zeroPad(nr, base) {
            base = base || 10;
            var len = (String(base).length - String(nr).length) + 1;
            return len > 0 ? new Array(len).join('0') + nr : nr;
        }
    
        function showPDF(directory) {
            var httpRequestObject = new XMLHttpRequest();
            httpRequestObject.open("post", "php/createPDF.php", false);
            httpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequestObject.send("directory=" + directory);

            var res = httpRequestObject.responseText;
            // Show pdf
            var url = location.href;
            var baseURL = url.substring(0, url.lastIndexOf('/'));
            var pdfwin = window.open(baseURL + "/" + "php/" + res, "_blank", "width=800, height=800, scrollbars=yes");
        }
    },
    /**
     * Export the graphic of the current tab to a PNG file. It will be provided for download. The user can select, if the complete graph
     * will be visualized or just the selected items.
     * 
     * @method exportToPNG 
     */
    exportToPNG : function() {
        var self = this;
        var selection = this.getEditor().getSelectionProvider().getSelection();
        if (selection.length > 0) {
            Ext.Msg.show({
                title : JSGDemo.resourceProvider.getString("Process"),
                msg : JSGDemo.resourceProvider.getString("Should the image only contain the selection objects?"),
                buttons : Ext.Msg.YESNO,
                icon : Ext.Msg.QUESTION,
                fn : function(btn) {
                    if (btn == 'yes') {
                        self.exportToPNGInit(true);
                    } else if (btn == 'no') {
                        self.exportToPNGInit(false);
                    } 
                }
            });
        } else {
            this.exportToPNGInit(false);
        }
    },
    /**
     * Export the graphic to a PNG file. It will be provided for download. The complete graph
     * will be visualized or just the selected items based on the selected flag. A progress indicator will be shown.
     * 
     * @method exportToPNGInit 
     * @param {boolean} selected Export complete graph or only selected items.
     */
    exportToPNGInit : function(selected) {
        var self = this;
        Ext.getCmp('load-indicator').show();        
        Ext.defer(function() {
            self.exportToPNGRun(selected);
            Ext.getCmp('load-indicator').hide();        
        }, 200);
    },
    /**
     * Export the graphic to a PNG file. It will be provided for download. The complete graph
     * will be visualized or just the selected items based on the selected flag. No progress indicator will be shown.
     * 
     * @method exportToPNGRun
     * @param {boolean} selected Export complete graph or only selected items.
     */
    exportToPNGRun : function(selected) {
        if (!JSGDemo.viewport.checkOnlineStatus()) {
            JSGDemo.viewport.showOfflineWarning();
            return;
        }

        try {
            var self = this;
            var graph = undefined; 
            var selection = this.getEditor().getSelectionProvider().getSelection();

            if (selected) {
                graph = new JSG.graph.model.Graph();
                graph.addAttribute(new JSGDemo.graph.DiagramAttributes());
                var xml = JSG.copyItems(selection);
                //we simply paste selection to graph :)
                JSGDemo.Utils.paste(xml, graph);
            } else {
                graph = this.getEditor().getGraph().copy();
                graph.evaluate();
            }

            // create temporary canvas
            var canvas = document.createElement("canvas");
            canvas.id = "exportcanvas";
            canvas.getContext("2d").imageSmoothingEnabled = false;
    
            // create editor
            var editor = new JSG.ui.GraphEditor(canvas);
            editor.setGraph(graph);

            var rectGraph = graph.getUsedRect();
            rectGraph.expandBy(500, 500);               // frame for shadows
            var ratioGraph = rectGraph.width / rectGraph.height;

            // create image(s)
            var settings = editor.getGraphSettings();
            settings.setDisplayMode(JSG.ui.graphics.DisplayMode.ENDLESS);
            settings.setGridVisible(false);
            settings.setScaleVisible(false);
            
            editor.getGraphViewer().getScrollPanel().getHorizontalScrollBar().setVisible(false); 
            editor.getGraphViewer().getScrollPanel().getVerticalScrollBar().setVisible(false); 

            var cs = editor.getCoordinateSystem();
            var zoom = 1;
            var hRoundedPages = 1;
            var vRoundedPages = 1;
            var logToImageFactor = 300 / cs.logToDeviceX(2540);
            var pageWidth;
            var pageHeight;
            
            if (selected) {
                pageWidth = 15000;
                pageHeight = pageWidth / ratioGraph;
            } else {
                if (ratioGraph > 1) {
                    pageWidth = 25000;
                    pageHeight = 15000;
                } else {
                    pageWidth = 15000;
                    pageHeight = 21000;
                }
            }

            var targetPageWidth = pageWidth / 2540 * 300;
            var targetPageHeight = pageHeight / 2540 * 300;
            var ratioPage = pageWidth / pageHeight;
            
            if (ratioPage > ratioGraph) {
                zoom = pageHeight / rectGraph.height;
                editor.resizeContent(targetPageHeight * ratioGraph, targetPageHeight);
            } else {
                zoom = pageWidth / rectGraph.width;
                editor.resizeContent(targetPageWidth, targetPageWidth / ratioGraph);
            }               
            if (!selected)
                zoom = Math.min(zoom, 1);
            zoom *= logToImageFactor;

            editor.getGraphViewer().getScrollPanel().getViewPort().getFormat().setFillColor("#FFFFFF");
            editor.getGraphViewer().getCoordinateSystem().setZoom(zoom);
            editor.invalidate();

            // submit images to server
            editor.setScrollPosition(-rectGraph.x, -rectGraph.y);
            editor.invalidate();

            var httpRequestObject = new XMLHttpRequest();
            httpRequestObject.open("post", "php/createTmpDirectory.php", false);
            httpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequestObject.send("name=export");
        
            var directory = httpRequestObject.responseText;

            JSGDemo.ignoreChanges = true;

            var xhttp = new XMLHttpRequest();
            xhttp.open("post", "php/saveImage.php", false);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

            var image = canvas.toDataURL("image/png");
            var output = encodeURIComponent(image);

            xhttp.send("name=" + directory + "/image.png" + "&data=" + output);

            var name = this.record.get('name') + ".png";

            JSGDemo.provideLink(directory, "image.png", name, "png");
        } catch(err) {
            JSGDemo.viewport.showWarning("Failed to create graphic!");
            return;
        }
    },
    /**
     * Event listener. It is called, if an item within the graph changes
     * 
     * @param notification 
     */
    onItemChanged : function(notification) {
        this.updateTitle(this.title, false);
        btn = Ext.getCmp('undobtn');
        if (btn != undefined) {
            var editor = this.getEditor();
            enabled = editor.getInteractionHandler().isUndoAvailable();
            btn.setDisabled(!enabled);
        }  
        JSGDemo.toolbar.updateToolbar();
    },
    /**
     * Update the title of the editor. The title is displayed as the tab text. If the graph is changed
     * and not saved, an asterisk is placed before the title name to indicate, that is needs to be saved.  
     * @param {String} title New title name.
     * @param {Boolean} invalidate Flag, to indicate, if the editor content shall be repainted. This is necessary, if the 
     * title changes and the header of the graph needs to be repainted.
     */
    updateTitle : function(title, invalidate) {

        if (title[0] == '*') 
            title = title.substring(1, title.length);

        var editor = this.getEditor();
        if (editor) {
            var graph = editor.getGraph();
            if (graph) {
                //graph.getSettings().getPage().setHeaderCenter(title);
                if (graph.isChanged()) 
                    title = '*'+ title;
                if (invalidate)
                    editor.repaint();    
            }
        }
        
        this.setTitle(title);        
    }
});
