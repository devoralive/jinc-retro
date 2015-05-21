<?php
require $_SERVER['DOCUMENT_ROOT'].'/objects/bdd.php';
$debug = false;
$debugForm = false;

date_default_timezone_set('Europe/Paris');
$input = "hidden";
$formInput= "hidden";
if($debug){
	$input = "text";
	ini_set('display_error', 1);
	if($debugForm){
		$formInput = "text";
	}
}
$user = $_GET['user'];

if(array_key_exists('page', $_GET)) $page = strtolower($_GET['page']);
else{
	$page = 'new_session';
	$user = "Where Are You - GPS human finder";
}

if($page == 'create_session' || $page == 'session' || $page == 'refresh')
	$bdd = new bdd();
?>