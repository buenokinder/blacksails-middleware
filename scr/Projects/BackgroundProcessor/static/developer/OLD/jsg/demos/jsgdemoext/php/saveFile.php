<?php
header( 'content-type: text/html; charset=utf-8' ); 

// Get SVG Filename and SVG Data
$filename = $_POST['name'];
$data = $_POST['data'];

// Save to temporary file
$file = fopen($filename, 'w');
fwrite($file, $data);
fclose($file);

echo $filename . " saved";
?>
