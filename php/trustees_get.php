<?php
/* This file is run whenever the getTrustees method is called.
 * Returns a 2 element array where index[0] is an array of the
 * names of trustees and index[1] is their number of votes
*/

// Connect to DB
require_once 'db_connect.php';

// Get list of trustees and send it to the calling function
$result = mysqli_query($con, "SELECT * FROM vote ORDER BY vote_num DESC");
$name = array();
$votes = array();
while($row = mysqli_fetch_row($result)){
  $name[] = $row[0];
  $votes[] = $row[1];
}

$send = array($name, $votes);
print json_encode($send);
?>
