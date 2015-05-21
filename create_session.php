<?php
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$token = sha1($lat + $lng + time());
$token = str_split($token, 5);
$token = $token[0];

$bdd->createSession($lat, $lng, $token);

$bitly_api_key = 'R_bcae6656093c72030868597d1527ec09';
$bitly_login = 'o_7hi8bnvtbt';  
 
function bitly($url,$login,$appkey,$format='txt') {
  $connectURL = 'http://api.bit.ly/v3/shorten?login='.$login.'&apiKey='.$appkey.'&uri='.urlencode($url).'&format='.$format;
  return curl_get_result($connectURL);
}
function curl_get_result($url) {
  $ch = curl_init();
  $timeout = 5;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

$url_raccourcieguest = bitly('http://'.$_SERVER['HTTP_HOST'].'/index.php?page=session&user=guest&token='.$token,$bitly_login,$bitly_api_key);
$url_raccourciehost = bitly('http://'.$_SERVER['HTTP_HOST'].'/index.php?page=session&user=host&token='.$token,$bitly_login,$bitly_api_key);


?>
<center>
<h3>
<p>
	Copy that block
</p>
<div class="block url" id="sms">
	I'll find you now.<br />
	You click <?php echo $url_raccourcieguest ?><br /><br />
	And I click <br />
	<?php echo $url_raccourciehost ?>
</div>
	<p>
		Send it to target<br />
	</p>
	<p>
	<!--<a href="sms:">Select Target</a>-->
		<a href="sms:;body=I'll find you! <?php echo $url_raccourcie ?>" rel="nofollow" >Select Target</a>
	</p>
	<p>
		Then come back, and<br />
	</p>
	<a href="http://<?php echo $_SERVER['HTTP_HOST'] ?>/index.php?page=session&user=host&token=<?php echo $token ?>" rel="nofollow" >
		HERE WE GO
	</a>
</h3>
</center>
