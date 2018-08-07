<?php
session_start();

if(isset($_POST["selection"])){
  $_SESSION["selection"] = $_POST["selection"];
}
print json_encode($_POST["selection"]);
 ?>
