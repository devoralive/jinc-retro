<?php
	require $_SERVER['DOCUMENT_ROOT'].'/objects/bdd.php';
	$bdd = new bdd();
	
	$id = $_POST['id'];
	$user = $_POST['user'];
	$user = ucfirst($user);
	$lat = $_POST['lat'];
	$lng = $_POST['lng'];
	$speed = $_POST['myspeed'];
	
	date_default_timezone_set('Europe/Paris');
	$time = time();
	
	$method = "update".$user."Position";
	$bdd->$method($id, $lat, $lng, $speed, $time);
	
	$method = "get".$user."FollowerPosition";
	$bdd->$method($id);
	
	$values = $bdd->getSqlReturn();
?>
{
	"lat": "<?php echo $values['lat']?>",
	"lng": "<?php echo $values['lng']?>",
	"speed": "<?php echo $values['speed']?>",
	"updated_at": "<?php echo $values['updated_at']?>"
} 