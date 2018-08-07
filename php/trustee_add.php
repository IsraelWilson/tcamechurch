<?php
/* This file is run whenever the add button is clicked from dashboard.html
 * It adds whatever value is typed into the input field to the database.
 * If the name has already been added exit code is 0. Otherwise, exit with
 * code 1. If the insert failed, exit with code 2.
*/

  if(isset($_POST["addName"])){
    // Connect to DB
  	require_once 'db_connect.php';

    // Get the users input
    $addName = mysqli_real_escape_string($con, $_POST["addName"]);

    // Check to see if the name already exist in database
    $result = mysqli_query($con, "SELECT * FROM trustee WHERE name='$addName'");
  	if(mysqli_num_rows($result) > 0){
      print 0;
    }else{
      $result = mysqli_query($con, "INSERT INTO trustee(name) VALUE('$addName')");
      if($result){
        print 1;
      }else{
        print 2;
      }
    }
  }
?>
