$(document).ready(function(){
  $("#btn-signin").click(function(){
    var id = $("#inputID").val();
    if(id == "tccadmin"){
      location.href = "dashboard.html";
    }else{
      if(id){
        $.ajax({
          url: "php/login.php",
          type: "POST",
          data: {
            userID: id
          },
          success: function(data){
            signIn(data);
          },
          dataType: "text"
        });
      }
      else{
        $("#signin-err").show();
      }
    }

  });

  function signIn(data){
    if(data == 1){
      location.href = "ballot.html";
    }else if (data == 0) {
      $("#signin-err").text("voting has been closed");
      $("#signin-err").show();
    }else if (data == 2) {
      $("#signin-err").text("user has already voted");
      $("#signin-err").show();
    }else if (data == 3) {
      $("#signin-err").text("user does not exist");
      $("#signin-err").show();
    }else{
      $("#signin-err").text("something went wrong");
      $("#signin-err").show();
    }
  }

});
