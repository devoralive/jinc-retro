<?php require $_SERVER['DOCUMENT_ROOT'].'/include.php' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>jinc - GPS human finder</title>
    <meta charset="utf-8">
	<link rel="stylesheet" href="/css/bootstrap-responsive.min.css" type="text/css" media="all" charset="utf-8" />
	<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" media="all" charset="utf-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="format-detection" content="telephone=no" />

	<link rel="apple-touch-icon" href="http://www.lagenetouse.fr/images/icone-gps.png"/>
	<meta name="viewport" content="width=device-width; initial-scale=1; user-scalable=0;">

	<link href='http://fonts.googleapis.com/css?family=Aclonica&v1' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/css/master.css" type="text/css" media="all" charset="utf-8" />

	<link href='http://fonts.googleapis.com/css?family=Audiowide' rel='stylesheet' type='text/css'>

	<!-- for Google -->
	<meta name="description" content="GPS Human Finder" />
	<meta name="keywords" content="GPS, Human, Finder, friend" />
	
	<meta name="author" content="@dam3369" />
	<meta name="copyright" content="DevORAlive" />
	<meta name="application-name" content="Where Are You" />
	
	<!-- for Facebook -->          
	<meta property="og:site_name" content="jinc - 12GY" />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST'] ?>" />
	<meta property="og:title" content="GPS Human Finder" />
	<meta property="og:description" content="A festival, a gathering, a date, it will always be easy to locate his/her GPS. Straight on." />
	<meta property="og:image" content="http://<?php echo $_SERVER['HTTP_HOST'] ?>/img/vinyle-arrow.png" />
	<meta property="og:image:width" content="600" />
	<meta property="og:image:height" content="315" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:type" content="article" />
	
	<!-- for Twitter -->          
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Where Are You" />
	<meta name="twitter:description" content="A festival, a gathering, a date, it will always be easy to locate his/her GPS. Straight on." />
	<meta name="twitter:image" content="http://<?php echo $_SERVER['HTTP_HOST'] ?>/img/manFlag.png" />

</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&appId=113928661966762&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
<div class="content">
	<?php require $_SERVER['DOCUMENT_ROOT'].'/'.$page.'.php' ?>
</div>
</body>
</html>