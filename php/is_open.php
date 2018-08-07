<?php
/* This file is run whenever the open button is clicked from dashboard.html
 * If voting is closed. Change the stored value to true. Exit with code 0
 * on success. Exit code 1 otherwise.
*/

// Connect to DB
require_once 'db_connect.php';

// Check to see if voting is open and if not open it
$result = mysqli_query($con, "SELECT * FROM open");
while($row = mysqli_fetch_row($result)){
	if($row[0]){
		print 1;
	}else{
		print 0;
	}
}
?>
