$(document).ready(function(){
  // Populate the page with the user selection from previous page
  getSelection();

  function getSelection(){
    $.ajax({
      url: "php/confirmation.php",
      method: "GET",
      success: function(data){
        if(data){
          setSelection(data);
        }else{
          setSelection(0);
        }
      },
      dataType: "json"
    });
  }

  function setSelection(data){
    var strTable = "";
    var section = Math.floor(data[0].length / 4);

    for(var i = 0; i < data[0].length; i++){
      if(i % section == 0){
        strTable += "<div class='col-3'><div class='list-group'><button type='button' class='list-group-item list-group-item-action'>" + data[0][i] + "</button>";
      }else{
        strTable += "<button type='button' class='list-group-item list-group-item-action'>" + data[0][i] + "</button>";
      }

      if(i % section == section - 1){
        strTable += "</div></div>";
      }
      else if(i % section != section - 1 && i == data[0].length - 1){
        strTable += "</div></div>";
      }
    }
    $("#selection-table").append(strTable);
  }

  $("#btn-continue").click(function(){
    // Submit the data and update the vote count
    $.ajax({
      url: "php/submit.php",
      method: "POST",
      success: function(data){
        if(data){
          successMsg();
        }else{

        }
      },
      dataType: "json"
    });
  });

  function successMsg(){
    $("#selection-table").html("<p>You're vote was successfully received. You will be redirected to the homepage.</p>");
    setTimeout(function(){location.href = "index.html";}, 5000);
  }

  $("#btn-change").click(function(){
    location.href = "ballot.html";
  });

});
