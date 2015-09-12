JSGDemo.namespace("JSGDemo.graph.interaction");

JSGDemo.graph.interaction.InteractionHandler = function(viewer) {
    JSGDemo.graph.interaction.InteractionHandler._super.constructor.apply(this, arguments);
};
JSG.extend(JSGDemo.graph.interaction.InteractionHandler, JSG.graph.interaction.InteractionHandler);

JSGDemo.graph.interaction.InteractionHandler.prototype._eventLocation = new JSG.geometry.Point(0, 0);


JSGDemo.graph.interaction.InteractionHandler.prototype.handleRightClick = function(event) {
	JSGDemo.graph.interaction.InteractionHandler._super.handleRightClick.call(this, event);
	this.showContextMenu(event);
};


JSGDemo.graph.interaction.InteractionHandler.prototype.showContextMenu = function(event) {
	var interaction = this.getActiveInteraction();
	event.consume();
	this._eventLocation.setTo(event.location);

	if (this._mnuContext != undefined) {
		this._mnuContext.removeAll();
	}

	if ( interaction instanceof JSG.graph.interaction.EditShapeInteraction) {
		this._mnuContext = new Ext.menu.Menu({
			interactionHandler : this,
			listeners : {
				hide : function(mnuContext) {
					Ext.destroy(mnuContext);
				}
			},

			items : [{
				text : JSGDemo.resourceProvider.getString("Delete Point"),
				disabled : !interaction._marker || interaction._editview.getMarkerCount() < 3 || interaction._marker.isTemporary == true,
				scope : this,
				handler : function() {
					this.viewer.translateFromParent(this._eventLocation);
					var interaction = this.getActiveInteraction();
					var marker = interaction.getMarkerAt(this._eventLocation);
					if (marker)
						interaction.deleteMarker(marker);
				}
			}, {
				text : JSGDemo.resourceProvider.getString(interaction._item.isClosed() ? "Open" : "Close"),
				scope : this,
				handler : function() {
					var close = interaction._item.isClosed() ? false : true;
					var item = interaction._item;
					var path = JSG.graph.attr.AttributeUtils.createPath(JSG.graph.attr.ItemAttributes.NAME, JSG.graph.attr.ItemAttributes.CLOSED);
					this.getActiveInteraction().close(close);
					this.execute(new JSG.graph.command.ChangeAttributeCommand(item, path, close));
				}
			}]
		});
	} else {
		var selection = this.viewer.getSelection();
		this._mnuContext = new Ext.menu.Menu({
			interactionHandler : this,
			listeners : {
				hide : function(mnuContext) {
					Ext.destroy(mnuContext);
				}
			},
			items : [{
				text : JSGDemo.resourceProvider.getString("Copy"),
				disabled : selection.length == 0,
				icon : 'resources/icons/copysmall.png',
				scope : this,
				handler : function() {
					this.copySelection();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Copy Format"),
				disabled : selection.length == 0,
				icon : 'resources/icons/copyformatsmall.png',
				scope : this,
				handler : function() {
					this.copySelectionFormat();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Cut"),
				disabled : selection.length == 0,
				icon : 'resources/icons/cutsmall.png',
				scope : this,
				handler : function() {
					this.cutSelection();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Paste"),
				disabled : !this.isPasteAvailable(),
				icon : 'resources/icons/pastesmall.png',
				scope : this,
				handler : function() {
					this.paste();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Paste Format"),
				disabled : !this.isPasteFormatAvailable(),
				icon : 'resources/icons/pasteformatsmall.png',
				scope : this,
				handler : function() {
					this.pasteFormat();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Delete"),
				disabled : selection.length == 0,
				icon : 'resources/icons/deletesmall.png',
				scope : this,
				handler : function() {
					this.deleteSelection();
				}
			}, {
				xtype : 'menuseparator'
			}, {
				text : JSGDemo.resourceProvider.getString("Add Label"),
				disabled : selection.length == 0,
				icon : 'resources/icons/textsmall.png',
				scope : this,
				handler : function() {
					var selection = this.viewer.getSelection();
					this.execute(new JSG.graph.command.AddLabelCommand(selection[0].getModel(), "Label"));
					this.repaint();
				}
			}, {
				xtype : 'menuseparator'
			}]
		});
		if (selection && selection.length > 0) {
			if (selection.length == 1) {
				var shape = selection[0].getModel().getShape();
				switch (shape.getType()) {
					case "polygon":
					case "bezier":
						this._mnuContext.add({
							text : JSGDemo.resourceProvider.getString("Edit Points Menu"),
							icon : 'resources/icons/editpointssmall.png',
							scope : this,
							handler : function() {
								this.editSelection();
							}
						}, {
							text : JSGDemo.resourceProvider.getString(selection[0].getModel().isClosed() ? "Open Shape" : "Close Shape"),
							scope : this,
							handler : function() {
								var item = selection[0].getModel();
								var close = item.isClosed() ? false : true;
								var path = JSG.graph.attr.AttributeUtils.createPath(JSG.graph.attr.ItemAttributes.NAME, JSG.graph.attr.ItemAttributes.CLOSED);
								this.execute(new JSG.graph.command.ChangeAttributeCommand(item, path, close));
							}
						}, {
							xtype : 'menuseparator'
						});
						break;
				}
				this._mnuContext.add({
					text : JSGDemo.resourceProvider.getString("Ungroup"),
					icon : 'resources/icons/ungroupsmall.png',
					disabled : selection[0].getModel()._subItems.length == 0,
					scope : this,
					handler : function() {
						this.ungroupSelection();
					}
				});
			} else if (selection.length > 1) {
				this._mnuContext.add({
					text : JSGDemo.resourceProvider.getString("Group"),
					icon : 'resources/icons/groupsmall.png',
					scope : this,
					handler : function() {
						this.groupSelection();
					}
				});
			}
			this._mnuContext.add({
				xtype : 'menuseparator'
			}, {
				text : JSGDemo.resourceProvider.getString("Move to Top"),
				icon : 'resources/icons/ordertopsmall.png',
				scope : this,
				handler : function() {
					this.changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.TOTOP);
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Move up"),
				icon : 'resources/icons/ordertotopsmall.png',
				scope : this,
				handler : function() {
					this.changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.UP);
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Move to Bottom"),
				icon : 'resources/icons/orderbottomsmall.png',
				scope : this,
				handler : function() {
					this.changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.TOBOTTOM);
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Move down"),
				icon : 'resources/icons/ordertobottomsmall.png',
				scope : this,
				handler : function() {
					this.changeDrawingOrderSelection(JSG.graph.command.ChangeItemOrder.DOWN);
				}
			});
		} else {
			this._mnuContext.add({
				text : JSGDemo.resourceProvider.getString("Undo"),
				icon : 'resources/icons/undosmall.png',
				disabled : !this.isUndoAvailable(),
				scope : this,
				handler : function() {
					this.undo();
				}
			}, {
				text : JSGDemo.resourceProvider.getString("Redo"),
				icon : 'resources/icons/redosmall.png',
				disabled : !this.isRedoAvailable(),
				scope : this,
				handler : function() {
					this.redo();
				}
			});
		}
	}

	this._mnuContext.showAt(event.windowLocation);
};

/**
 * Called when a model with a link is selected.</br>
 * See {{#crossLink "JSG.graph.model.GraphItem/getLink:method"}}{{/crossLink}}.
 * 
 * @method executeLink
 * @param {JSG.graph.controller.ModelController} controller The corresponding model controller.
 */
JSGDemo.graph.interaction.InteractionHandler.prototype.executeLink = function(controller) {
    var link = controller.getModel().getLink().getValue();
    if (!link.length)
        return;
    
    var parts = link.split(":");
    if (parts.length < 2)
        return;
    
    switch (parts[0]) {
        case "file":
            JSGDemo.viewport.setActiveEditorById(parts[1]);    
            return;
    }
    
    JSGDemo.graph.interaction.InteractionHandler._super.executeLink.call(this, controller);
};

