<?php
session_start();
/* This file is run whenever the login button is clicked from index.html
 * If voting has been closed exit returns an error string to be displayed
 * for the user on index.html. If voting is open and a user is found
 * print 1. Exit with error code 0, 2 if voting is closed or
 * user does not exist respectively.
*/

  if(isset($_POST["userID"])){
    // Connect to DB
  	require_once 'db_connect.php';

    // Get the users input
    $userID = $_POST["userID"];

    // Check to see if voting is open and if the user id exist
    $result = mysqli_query($con, "SELECT * FROM open");

    while($row = mysqli_fetch_row($result)){
      if($row[0]){
        $user = mysqli_query($con, "SELECT * FROM user WHERE user_id='$userID'");
        if(mysqli_num_rows($user) > 0){
          $_SESSION["user"] = $userID;
          print 1;
        }else{
          print 2;
        }
      }else{
        print 0;
      }
    }
  }
?>
