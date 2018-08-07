<?php
session_start();

$selectionArr = $_SESSION["selection"];

$send = array($selectionArr);
print json_encode($send);
 ?>
