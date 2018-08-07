<?php
session_start();
// include db connect class
require_once 'db_connect.php';

$trustees = $_SESSION["selection"];
$id = $_SESSION["user"];

for($i = 0; $i < count($trustees); $i++){
  $name = $trustees[$i];
  mysqli_query($con, "UPDATE vote SET vote_num = vote_num + 1 WHERE trustee_name = '$name'");
}
 mysqli_query($con, "UPDATE user SET voted = 1 WHERE user_id = '$id'");

print 1;

?>
