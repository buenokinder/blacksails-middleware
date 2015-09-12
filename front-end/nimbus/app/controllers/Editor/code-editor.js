/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

app.controller('CodeEditorController', ['$scope', '$http', '$ocLazyLoad', function ($scope, $http, $ocLazyLoad) {
  
  $scope.editorThemes = ['3024-day','3024-night','ambiance-mobile','ambiance','base16-dark','base16-light','blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark','mbo','mdn-like','midnight','monokai','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark','rubyblue','solarized','the-matrix','tomorrow-night-eighties','twilight','vibrant-ink','xq-dark','xq-light'];

  $scope.editorOpts = {
    mode: 'javascript',
    lineNumbers: true,
    matchBrackets: true,
    theme: 'mbo',
    viewportMargin: Infinity
  };

  $scope.refreshEditor = 0;

  // Load dinamically the stylesheet for the selected theme
  // You can use ozLazyLoad to load also the mode js based 
  // on the file extension that is loaded (see handle_filetree)
  $scope.loadTheme = function() {
    var BASE = '/vendor/codemirror/theme/';
    $ocLazyLoad.load(BASE + $scope.editorOpts.theme + '.css');
    $scope.refreshEditor = !$scope.refreshEditor;
  };
  // load default theme
  $scope.loadTheme($scope.editorOpts.theme);
  // Add some initial text
  $scope.code = "// Selecione um arquivo no menu \n";


  // Tree

  var selectedBranch;
  $scope.handle_filetree = function(branch) {
    
    selectedBranch = branch;

    var basePath = 'server/editor/';
    var isFolder = !!branch.children.length;

    console.log("You selected: " + branch.label + ' - isFolder? ' + isFolder);

    if ( ! isFolder ) {

      $http
        .get( basePath + branch.path )
        .success(function(response){
          
          console.log('Loaded.. ' + branch.path);
          // set the new code into the editor
          $scope.code = response;
          
          $scope.editorOpts.mode = detectMode(branch.path);
          console.log( 'Mode is: ' + $scope.editorOpts.mode);

        });
    }
  };

  function detectMode(file) {
    var ext = file.split('.');
    ext = ext ? ext[ext.length - 1] : '';
    switch (ext) {
      case 'html':  return 'htmlmixed';
      case 'css':   return 'css';
      default:      return 'javascript';
    }
  }

  var tree;
  tree = $scope.filetree = {};

  // Adds a new branch to the tree
  $scope.new_filetree = function() {
    var b;
    b = tree.get_selected_branch();

    // if we select a leaf -> select the parent folder
    if ( b && b.children.length === 0 ) {
      b = tree.get_parent_branch(b);
    }
    
    return tree.add_branch(b, {
      "label": "another.html",
      "path": "source/another.html"
    });
  };

}]).service('LoadTreeService', function($resource) {
   return $resource('server/editor/filetree.json');
});
