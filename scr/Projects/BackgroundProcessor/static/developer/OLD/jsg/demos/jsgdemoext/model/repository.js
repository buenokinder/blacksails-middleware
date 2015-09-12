
Ext.define('graphitem', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'id',
        type : 'string'
    }, {
        name : 'name',
        type : 'string'
    }, {
        name : 'type',
        type : 'string'
    }, {
        name : 'description',
        type : 'string'
    }]
});

Ext.define('graphitemstore', {
    extend : 'Ext.data.TreeStore',
    folderSort : true,
    sortOnLoad : true,
    model : 'graphitem',
    sorters: [{
        property: 'name',
        direction: 'ASC' // or 'ASC'
    }],  
    proxy : {
        type : 'memory',
        data : {
            name : "Storage",
            expanded : true,
            description : "",
            leaf : false, 
            children : [{
                id : JSGDemo.getNewId(),
                name : "Demo Graph",
                leaf : true
            }, {
                id : JSGDemo.getNewId(),
                name : "Ordner",
                leaf : false,
                expanded : true,
                children : [{
                    id : JSGDemo.getNewId(),
                    name : "Demo 1",
                    leaf : true
                }, {
                    id : JSGDemo.getNewId(),
                    name : "Demo 2",
                    leaf : true
                }]
            }]
        },
    },
    autoLoad : true,
    autoSync : true
});
