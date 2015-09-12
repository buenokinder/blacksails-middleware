<?php

$type = $_GET['type'];

if ( isset($type) && 
      in_array($type, array( 'bar','barstacked','area','line','pie','spline' ))) {
  
  $filename = "chart-data-" . $type . '.php';
  
  if(file_exists($filename)) {
    include $filename;
    echo json_encode($data);
  }
}

?>