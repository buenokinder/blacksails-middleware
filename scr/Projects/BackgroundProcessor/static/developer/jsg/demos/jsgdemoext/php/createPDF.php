<?php
header( 'content-type: text/html; charset=utf-8' ); 
// Get Directory with SVG Files
$directory = $_POST['directory'];

// Convert SVG to PDF
// !!! some java versions do create an error while creating the PDF with FOP, if the stdDeviation is > 2 !!!     
//$result = exec("\"C:/Program Files (x86)/Java/jdk1.6.0_20/bin/java\" -jar PrintSVG.jar $directory"); 
$result = exec("java -jar PrintSVG.jar $directory"); 

$idx = strpos($result, "Result:");
if ($idx === false) {
//	echo ">>RESULT MSG<<\n";
//	echo "$result\n\n";
	$idx = strpos($result, "Error:");
	if ($idx === false) {
		echo "ERROR: An unknown error has occured.";
	} else {
		$errorString = substr($result, $idx);
		echo "ERROR: The following error has occured: $errorString";
	}
} else {
	$resultString = trim(substr($result, $idx + 7));
	echo "$directory/$resultString";
}
?>
