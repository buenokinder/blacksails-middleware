<?php 
header( 'content-type: text/html; charset=utf-8' ); 

	require_once 'connections.php';

    // curl auf Server aktiv?
	
	$params = $_POST['url'];
	$url = $olaphost . $params;

	/* gets the data from a URL */
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	
	echo $data;
?>
