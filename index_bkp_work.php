<?php require $_SERVER['DOCUMENT_ROOT'].'/include.php' ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title><?php echo $user ?></title>
    <meta charset="utf-8">
	<link rel="stylesheet" href="/css/bootstrap-responsive.min.css" type="text/css" media="all" charset="utf-8" />
	<link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" media="all" charset="utf-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="apple-touch-icon" href="http://www.lagenetouse.fr/images/icone-gps.png"/>
	<meta name="viewport" content="width=device-width; initial-scale=1.2; user-scalable=0;">
	<link href='http://fonts.googleapis.com/css?family=Aclonica&v1' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/css/master.css" type="text/css" media="all" charset="utf-8" />
</head>
<body>
	<div class="content">
		<?php require $_SERVER['DOCUMENT_ROOT'].'/'.$page.'.php' ?>
	</div>
</body>
</html>