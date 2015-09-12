<?php
header('content-type: text/html; charset=utf-8');

require_once ('clean.php');


// create temporary directory name
// $dir = "print";
$dir = $_POST['name'];
$prefix = $dir . "/TMP";
$name = $prefix . md5(time() . rand());

if (is_dir($dir) == false) {
	if (!mkdir($dir)) {
		die("Directory could not be created");
	}
} else {
	// remove old stuff
	unlinkRecursive($dir, false);	
}

// create temporary directory, if not already existing
if (is_dir("$name") == false) {
	if (!mkdir("$name")) {
		die("Directory could not be created");
	}
}

echo "$name";
?>
