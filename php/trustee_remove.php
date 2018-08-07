<?php
/* This file is run whenever the remove button is clicked from dashboard.html
 * If the name has been removed from the database exit with code 0. Otherwise
 * exit with code 1.
*/

  if(isset($_POST["removeName"])){
    // Connect to DB
  	require_once 'db_connect.php';

    // Get the users input
    $removeName = mysqli_real_escape_string($con, $_POST["removeName"]);

    // Attempts to remove the entered name
    $result = mysqli_query($con, "DELETE FROM trustee WHERE name='$removeName'");
  	if($result){
      print 0;
    }else{
      print 1;
    }
  }
?>
