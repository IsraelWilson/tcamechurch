<?php
/* This file is run whenever the getTrustees method is called.
 * Returns a 2 element array where index[0] is an array of the
 * names of trustees and index[1] is their number of votes
*/

// Connect to DB
require_once 'db_connect.php';

// Get list of trustees and send it to the calling function
$result = mysqli_query($con, "SELECT * FROM user");
$uid = array();
$voted = array();
while($row = mysqli_fetch_row($result)){
  $uid[] = $row[0];
  $voted[] = $row[1];
}

$send = array($uid, $voted);
print json_encode($send);
?>
