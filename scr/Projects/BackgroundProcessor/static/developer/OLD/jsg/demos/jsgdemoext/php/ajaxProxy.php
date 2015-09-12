<?php
header( 'content-type: text/html; charset=utf-8' ); 
/**
 * @class AjaxProxy
 * 
 */
 
class AjaxProxy {
    public $host;

    public function __construct($url) {
        $this->host = $url;
		// curl auf Server aktiv?
        // $this->host = "http://195.78.40.130:7777/";
    }

    public function call($params) {
		$url = $this->host . $params;
	
		/* gets the data from a URL */
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$data = curl_exec($ch);
		curl_close($ch);
		
		return $data;
    }
}
