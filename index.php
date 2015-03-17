<!DOCTYPE html>
<html>
<head lang="pt-br">
	<meta charset="utf-8"/>
	<title>Mr Feedback</title>
	<meta name="viewport" content="width=device-width">
	<meta name="mobile-web-app-capable" content="yes">
	<script src="js/villa.js"></script>
	<link rel="stylesheet" href="css/villa-foundation.css"/>
	<link rel="stylesheet" href="css/villa-grid.css"/>
	<link rel="stylesheet" href="css/villa.css"/>
	<link rel="stylesheet" href="css/mowe.css"/>
	<link rel="stylesheet" href="css/mowe-ui-helpers.css"/>
	<link rel="stylesheet" href="css/mowe-inputs.css"/>
	<link rel="stylesheet" href="css/mowe-hero.css"/>
	<link rel="stylesheet" href="css/mowe-font.css"/>
	<link rel="stylesheet" href="css/mowe-navbar.css"/>
	<link rel="stylesheet" href="css/mowe-structure.css"/>
	<link rel="stylesheet" href="css/mowe-wow.css"/>
	<link rel="stylesheet" href="css/mowe-pricelist.css"/>
	<link rel="stylesheet" href="css/mowe-timeline.css"/>
	<link rel="stylesheet" href="css/wtal.css"/>
	<script src="js/jquery-2.1.1.min.js"></script>
	<?php
	if (isset($_GET['local'])) {
		echo "<script>";
		if ($_GET['local'] == 'mrrango') {
			echo "var local = 'mr rango'";
		} else {
			echo "var local = '" . $_GET['local'] . "';";
		}
		echo "</script>\n";
	};
	?>
	<!--[if lt IE 9]>
	<link rel="stylesheet" type="text/css" href="css/material-colors.css"/>
	<script src="js/html5shiv.js"></script>
	<script src="js/html5shiv-printshiv.js"></script>
	<![endif]-->
</head>
<body>

<style type="text/css">

	body {
		background-color: #f5f5f5;
		user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		/* To responsive, need to resize the font-size */
	}

	.block.form-sense {
		padding: 0;
	}

	.form-sense .about,
	.form-sense .about > .container {
		display: flex;
		flex-flow: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.form-sense .about {
		background: url("img/misc/mrrango-background.png");
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.26);
		margin: 0;
	}

	.form-sense .about .bulb {
		border-radius: 50%;
		height: 10px;
		margin-left: 1em;
		min-width: 10px;
		width: 10px;
	}

	.online .form-sense .about .bulb {
		background-color: #4caf50;
	}

	.form-sense .about h1 {
		text-align: left;
		font-size: 2em;
		font-weight: 800;
		text-transform: uppercase;
		margin-left: .5em;
	}

	.form-sense .about img {
		width: 6em;
		height: 6em;
		margin: 0.75em 1.5em;
	}

	.sense {
		align-content: center;
		align-items: stretch;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 1.3125em;
	}

	.sense .star {
		align-content: center;
		align-items: center;
		/*border: solid 6px #3f51b5;*/
		color: #444444;
		display: flex;
		flex-wrap: wrap;
		flex-flow: column;
		font-weight: 600;
		justify-content: center;
		margin: 1.75em 0;
	}

	.sense .star img {
		background-color: #ffffff;
		border-radius: 50%;
		box-shadow: -3px 3px 12px rgba(0,0,0,.4);
		padding: 3px;
		width: 90px;
	}

	.sense .star .title {
		font-size: 1.3125em;
		margin-top: 0.75em;
		font-weight: 600;
		letter-spacing: -1px;
		text-transform: uppercase;
	}

	.sense .option {
		border: solid 1px #444444;
		padding: 15px 10px;
	}

	@media (min-width: 30em) {
		.sense .star img {
			padding: 4px;
		}
	}

	@media (min-width: 43.75em) {
		.sense .star img {
			padding: 5px;
			width: 100px;
		}
	}

	@media (min-width: 56.25em) {
		.sense {
			margin-top: 60px;
		}

		.sense .star img {
			padding:6px;
			width: 110px;
		}
	}

	@media (min-width: 70em) {
		.sense {
			margin-top: 60px;
		}

		.sense .star img {
			padding:7px;
			width: 140px;
		}
	}

	.form-sense .question-2,
	.form-sense .thanks {
		display: none;
	}

	[class^="star"] .question-1 {
		display: none;
	}

	.star-1 .form-sense .question-2,
	.star-2 .form-sense .question-2 {
		display: flex;
	}

</style>

<div class="block form-sense">

	<div class="about red-900 font-yellow">
		<div class="container">
			<span class="bulb"></span>
			<span class="question-1"><h1>Como está o restaurante hoje?</h1></span>
			<span class="question-2"><h1>Qual setor te incomoda?</h1></span>
			<span class="thanks"><h1>Muito Obrigado!</h1></span>
			<img src="img/misc/mrrango-logo.png" alt=""/>
		</div>
	</div>

	<div class="sense question-1">
		<div class="star">
			<img src="img/emoji/Emoji%20Smiley-35.png" alt=""/>
			<span class="title">Péssimo</span>
		</div>
		<div class="star">
			<img src="img/emoji/Emoji%20Smiley-53.png" alt=""/>
			<span class="title">Ruim</span>
		</div>
		<div class="star">
			<img src="img/emoji/Emoji%20Smiley-04.png" alt=""/>
			<span class="title">Bom</span>
		</div>
		<div class="star">
			<img src="img/emoji/Emoji%20Smiley-07.png" alt=""/>
			<span class="title">Excelente</span>
		</div>
	</div>

	<div class="sense question-2">
		<div class="option">
			<span class="title">Péssimo</span>
		</div>
		<div class="option">
			<span class="title">Ruim</span>
		</div>
		<div class="option">
			<span class="title">Bom</span>
		</div>
		<div class="option">
			<span class="title">Excelente</span>
		</div>
	</div>

</div>

<script src="js/distinct.js"></script>
<script src="js/app-mrfb.js"></script>
<!--<script src="js/mowe-distinct.js"></script>-->

</body>
</html>