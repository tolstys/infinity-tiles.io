<!DOCTYPE HTML>
<html>
    <head>
        <title>tiles</title>
        <meta charset="UTF-8">
		<meta name="viewport" user-scalable="no" content="width=device-width, maximum-scale=1, initial-scale=1">
        <link href="css/style.css?t=<?php echo time(); ?>" rel="stylesheet" />
		<script src="https://kit.fontawesome.com/6ba380f81a.js" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
		<script type="text/javascript" src="js/tile.js?t=<?php echo time(); ?>"></script>
        <script type="text/javascript" src="js/layer.js?t=<?php echo time(); ?>"></script>
		<script type="text/javascript" src="js/game.js?t=<?php echo time(); ?>"></script>
		<script type="text/javascript" src="js/main.js?t=<?php echo time(); ?>"></script>
    </head>
    <body>
        <div class="panel-left">
            <span id="score">0</span>
            <div class="block-tiles-row"></div>
            <button id="moveBack" disabled><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button id="shuffle" disabled><i class="fa-solid fa-shuffle"></i></button>
            <button id="burn" disabled><i class="fa-solid fa-fire"></i></button>
        </div>
        <div class="panel-main">
            <div class="block-tiles"></div>
        </div>
    </body>
</html>