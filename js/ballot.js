$(document).ready(function(){
  getTrustees();

  // Get all trustee information
  function getTrustees(){
    $.ajax({
      url: "php/trustees_get.php",
      method: "GET",
      success: function(data){
        if(data){
          setTrustees(data);
        }else{
          setTrustees(0);
        }
      },
      dataType: "json"
    });
  }

  // Get number of names selected based on class active
  function getActive(){
    return $(".list-group .active").length;
  }

  // Listen for dynamically added names being clicked
  $("body").on("click", ".list-group-item", function() {
    if(getActive() < 19){
      $(this).toggleClass("active");
    }
    else if(getActive() == 19 && $(this).hasClass("active")){
      $(this).toggleClass("active");
      $(".list-group-item").not(".active").prop("disabled", false);
    }else{
      $(".list-group-item").not(".active").prop("disabled", true);
    }

    // Update counter next to button
    $("label").text(getActive());
  });

  $("#btn-continue").click(function(){
    var selection = $(".list-group .active");
    var selectionArr = [];
    selection.each(function(){
      selectionArr.push($(this).text());
    });

    if(getActive() == 19){

      $.ajax({
        url: "php/ballot.php",
        method: "POST",
        data: {
          selection: selectionArr
        },
        success: function(data){
          location.href = "confirmation.html";
        },
        dataType: "json"
      });
    }else{
      // Error Message
    }

  });

  function setTrustees(trustees){
    var strForm = "";
    if(trustees){
      for(var i = 0; i < trustees[0].length; i++){
        if(i % 10 == 0){
          // If at the start of a new set of trustees, separated in groups of 10
          // Else if in a set of 10
          strForm += "<div class='col-4'>";
          strForm += "<div class='list-group'>";
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button>";
        }else if (i % 10 != 0) {
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button>";
        }

        // If at the 10 element
        // Else if at the last element and not a 10th element
        if(i % 10 == 9){
          strForm += "</div>";
          strForm += "</div>";
        }else if(i % 10 != 9 && i == trustees[0].length - 1){
          strForm += "</div>";
          strForm += "</div>";
        }
      }
    }
    $("#select-vote").append(strForm);
  }

  function initialize(){

    if(trustees){
      for(var i = 0; i < trustees[0].length; i++){
        if(i % 10 == 0){
          // If at the start of a new set of trustees, separated in groups of 10
          // Else if in a set of 10
          $("#select-vote").append("<div class='col-4'>");
          $("#select-vote").append("<div class='list-group'>");
          $("#select-vote").append("<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button>");
        }else if (i % 10 != 0) {
          $("#select-vote").append("<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button>");
        }

        // If at the 10 element
        // Else if at the last element and not a 10th element
        if(i % 10 == 9){
          $("#select-vote").append("</div>");
          $("#select-vote").append("</div>");
        }else if(i % 10 != 9 && i == trustees[0].length - 1){
          $("#select-vote").append("</div>");
          $("#select-vote").append("</div>");
        }
      }
    }
  }


});
