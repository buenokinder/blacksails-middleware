/**
 * @module JSGDemo.model
 * @namespace JSGDemo.model
 */
JSGDemo.namespace("JSGDemo.model");

/**
 * Class containing library infos. A library info contains the information about the sections of the library visible in the repository, the library
 * objects in the library and the symbols used to visualize the library objects in the repository
 *
 * @class Library
 * @constructor
 * Create Library
 * @param {String} type Type or name of library.
*/
JSGDemo.model.Library = function(type) {
    this.type = type;
    this.typeName = "";
    this.name = "";
    this.sections = [];
    this.shapes = new JSG.commons.Map();
};

/**
 * Class containing library object infos. A library object info contains the information the target a library object can have and
 * the available symbols or visualizations of a library object. A library object can have various alternativ symbols to display the library object.
 *
 * @class LibraryObject
 * @constructor
 * Create Library Object
 * @param {String} type Type or name of library object.
*/
JSGDemo.model.Shape = function(type, section) {
    this.type = type;
    this.section = section;
};

JSGDemo.model.Section = function(label, type) {
    this.label = label;
    this.type = type;
    this.sectionShapes = new JSG.commons.Map();
};

JSGDemo.model.Symbol = function(type, label, icon, iconsmall) {
    this.type = type;
    this.label = label;
    this.icon = icon;
    this.iconsmall = iconsmall;
    this.graphItem;
};

/**
 * The Libraries contains all library definitions, all Model Object definitions and the definition of relations.
 * It reads the informations from the library.xml, where the librarys are persisted.
 *
 * @class Libraries
 * @constructor
 */
JSGDemo.model.Libraries = function() {
    
    this.libraries = new JSG.commons.Map();
    this.symbols = new JSG.commons.Map();
};

/**
 * Get a library by its name.
 * 
 * @library getLibrary
 * @param {String} type Name or type of library to retrieve.
 * @return {JSGDemo.model.Library} Library definition
 */
JSGDemo.model.Libraries.prototype.getLibrary = function(type) {
    return this.libraries.get(type.toLowerCase());
};

/**
 * Read library information from library.xml.
 * 
 * @library load
 * @return {Boolean} true, if successfully loaded, otherwise false.
 */
JSGDemo.model.Libraries.prototype.load = function() {
    var self = this;
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "resources/library.xml", false);
    xhttp.send(); 
    
    var xml = xhttp.responseXML;
    if (!xml || !xml.hasChildNodes())
        return false;

    // root libraries node        
    var root = xml.childNodes[0];
    if (!root || !root.hasChildNodes())
        return false;

    var libraryList = root.getElementsByTagName("library");
        
    // read libraries
    for (var i = 0, n = libraryList.length; i < n; i++) {
        var xmlLibrary = libraryList[i];
        var library = readLibrary(xmlLibrary);
        readSections(xmlLibrary, library);
    }
    
    var moRoot = root.getElementsByTagName("symbols")[0];
    if (!moRoot || !moRoot.hasChildNodes())
        return false;
    var moList = moRoot.getElementsByTagName("symbol");
        
    // read model object definition
    for (var i = 0, n = moList.length; i < n; i++) {
        var xmlSymbol = moList[i];
        var xmlLabels = xmlSymbol.getElementsByTagName("labels");
        var xmlLabel = xmlLabels[0].getElementsByTagName(JSGDemo.lang);

        var type = xmlSymbol.getAttribute("type");
        var icon = xmlSymbol.getAttribute("icon");
        var iconsmall = xmlSymbol.getAttribute("iconsmall");
        
        var modelObject = new JSGDemo.model.Symbol(type, xmlLabel[0].childNodes[0].nodeValue.decode(), icon, iconsmall);
        var xmlNodes = xmlSymbol.getElementsByTagName("graphitem");
        if (xmlNodes) {
            modelObject.nodeXML = xmlNodes[0].cloneNode(true);
        }
        this.symbols.put(type, modelObject);
    }

    function readLibrary(xmlLibrary) {
        var type = xmlLibrary.getAttribute("type");
        var library = new JSGDemo.model.Library(type);
        self.libraries.put(type, library);

        var xmlLabels = xmlLibrary.getElementsByTagName("typename");
        var xmlLabel = xmlLabels[0].getElementsByTagName(JSGDemo.lang);
        library.typeName = xmlLabel[0].childNodes[0].nodeValue.decode();
        
        xmlLabels = xmlLibrary.getElementsByTagName("name");
        xmlLabel = xmlLabels[0].getElementsByTagName(JSGDemo.lang);
        library.name = xmlLabel[0].childNodes[0].nodeValue.decode();

        return library;
    }

    function readSections(xmlLibrary, library) {
        // read section
        var xmlSections = xmlLibrary.getElementsByTagName("sections");
        var sectionList = xmlSections[0].getElementsByTagName("section");

        for (var j = 0, m = sectionList.length; j < m; j++) {
            var xmlSection = sectionList[j];
        
            var xmlLabels = xmlSection.getElementsByTagName("labels");
            var xmlLabel = xmlLabels[0].getElementsByTagName(JSGDemo.lang);
            var section = new JSGDemo.model.Section(xmlLabel[0].childNodes[0].nodeValue.decode(), xmlSection.getAttribute("type"));

            library.sections.push(section);
        }

        // read model objects of library
        readLibraryShapes(xmlLibrary, library);
    }

    function readLibraryShapes(xmlLibrary, library) {
        var xmlLibraryShapes = xmlLibrary.getElementsByTagName("shapes");
        if (!xmlLibraryShapes.length)
            return;
        var moList = xmlLibraryShapes[0].getElementsByTagName("shape");

        for (var j = 0, m = moList.length; j < m; j++) {
            var xmlLibraryShape = moList[j];
            var libraryShape = new JSGDemo.model.Shape(xmlLibraryShape.getAttribute("type"), xmlLibraryShape.getAttribute("section"));
        
            library.shapes.put(libraryShape.type, libraryShape);

        }
    }

    return true;
};
