<?php
/* This file is run whenever the open button is clicked from dashboard.html
 * If voting is closed. Change the stored value to true. Exit with code 0
 * on success. Exit code 1 otherwise.
*/

// Connect to DB
require_once 'db_connect.php';

// Set the voted column for all users to 0
mysqli_query($con, "UPDATE user SET voted = 0");
mysqli_query($con, "TRUNCATE TABLE trustee");

print 1;
?>
