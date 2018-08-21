$(document).ready(function(){
  initialize();
  // BUTTON ADD
  // 0 == Name already in database
  // 1 == Successful INSERT
  // 2 == Failed INSERT
  $("#btn-add").click(function(){
    var trustee = $("#trustee-name").val();

    if(trustee == ""){
      $("#dashboard-err").text("Please enter the name you want to add");
    }else{
      $.ajax({
        url: "php/trustee_add.php",
        method: "POST",
        data: {
          addName: trustee
        },
        success: function(data){

          if(data == 0){
            $("#dashboard-err").text("name has already been added");
          }else if (data == 1) {
            // Add name to the user interface then the database
            addName(trustee);
            $("#dashboard-err").text("name has been added");
          }else if (data == 2) {
            $("#dashboard-err").text("trouble adding trustee");
          }else{
            $("#signin-err").text("something went wrong");
          }
        },
        dataType: "text"
      });
    }

  });

  function addName(name){
    var total = $("#trustee-table .list-group-item").length;
    var row = total % 10;
    var cols = Math.floor(total / 10);

    // Add the name to the end of the last column
    if(row > 0){
      $("<div class='list-group-item-container'><button type='button' class='list-group-item list-group-item-action'>" + name + "</button><button type='button' class='btn-remove'><i class='fas fa-times-circle'></i></button></div>").insertAfter($("#trustee-table .btn-remove").last().parent());
    }else{
      $("<div class='col-4'><div class='list-group'><div class='list-group-item-container'><button type='button'class='list-group-item list-group-item-action'>" + name + "</button><button type='button' class='btn-remove'><i class='fas fa-times-circle'></i></button></div></div></div>").insertAfter($("#trustee-table .col-4").last());
    }

    // If there are no names create first column and hide empty div
    if($("#trustee-table .col-4").length == 0){
      $("#trustee-table").append("<div class='col-4'><div class='list-group'><div class='list-group-item-container'><button type='button'class='list-group-item list-group-item-action'>" + name + "</button><button type='button' class='btn-remove'><i class='fas fa-times-circle'></i></button></div></div></div>");
      $("#trustee-table .empty").css("display", "none");
    }
  }

  // BUTTON REMOVE
  // 0 == Name was successfully removed
  // 1 == An error occurred trying to remove the name
  $("body").on("click", ".btn-remove", function(){
    // Get list of divs containing names and buttons
    // Get index of div whose button was clicked
    var col = $(this).parent().parent().parent();
    var group = $(this).parent().parent();

    var trustee = $(this).prev().text();

    // Remove list-item and get number of names left
    $(this).parent().remove();

    // Remove this column if no more name remain in it
    if(col.children().first().children().length == 0){
      col.remove();
    }

    // If there are no more colums/names show empty message
    if(!$("#trustee-table .col-4").length){
      $("#trustee-table .empty").css("display", "block");
    }

    $.ajax({
      url: "php/trustee_remove.php",
      method: "POST",
      data: {
        removeName: trustee
      },
      success: function(data){
        // 0 if removed successfully
        // 1 if there was an error
        if(data == 0){
          $("#dashboard-err").text("name has been removed");
        }else if (data == 1) {
          $("#dashboard-err").text("trouble removing trustee");
        }else{
          $("#dashboard-err").text("something went wrong");
        }
      },
      dataType: "text"
    });

    // Move elements from sequential columns down one
    collapse(col, group);
  });

  function collapse(col, group){
    // If there is a column after the column we are removing an element from
    // Get the first div with a name in the next column and place it at the end
    // of this column.
    if(col.next().length){
      var move = col.next().children().first().children().first();
      group.append(move);

      // Remove the next column if no more names remain in it
      if(col.next().children().first().children().length == 0){
        col.next().remove();
      }
    }
    // If there is following column that we took an element from
    // pull the first element from its following column
    if(col.next().length){
      collapse(col.next(), col.next().children().first());
    }
  }

  // BUTTON OPEN
  $("body").on("click", "#btn-open", function(){
    $(this).replaceWith("<button id='btn-close' class='btn btn-lg btn-warning btn-width-full mt mb pl pr' type='button'>CLOSE</button>");
    $.ajax({
      url: "php/open.php",
      method: "GET",
      success: function(data){
        if(data){
          $(".status-err").text("Voting is OPEN");
        }else{
          $(".status-err").text("An error occurred trying to open for voting");
        }
      },
      dataType: "text"
    });
  });

  // BUTTON CLOSE
  $("body").on("click", "#btn-close", function(){
    $(this).replaceWith("<button id='btn-open' class='btn btn-lg btn-success btn-width-full mt mb pl pr' type='button'>OPEN</button>");
    $.ajax({
      url: "php/close.php",
      method: "GET",
      success: function(data){
        if(data){
          $(".status-err").text("Voting is CLOSED");
        }else{
          $(".status-err").text("An error occurred trying to close voting");
        }
      },
      dataType: "text"
    });
  });

  function toggleOpen(toggle){
    if(toggle == "open"){
      $("#status-err").text("Voting is OPEN");
    }else{
      $("#status-err").text("Voting is CLOSED");
    }
  }

  $("#btn-modal-continue").click(function(){
    $.ajax({
      url: "php/reset.php",
      method: "POST",
      success: function(data){
        if(data){

        }else{

        }
      },
      dataType: "text"
    });
    $("#modal-reset").modal("hide");
  });


  // Add selected class to a trustee div that has been clicked
  // Add class active to divs with class selected
  // If another name was selected, remove both classes from it
  $("body").on("click", "#trustee-table div", function(){
    $("#trustee-table div").removeClass("selected active");
    $(this).addClass("selected active");
  });

  // Get all trustee information
  function getTrustees(){
    $.ajax({
      url: "php/trustees_get.php",
      method: "GET",
      success: function(data){
        if(data){
          setTrustees(data);
        }else{
          return 0;
        }
      },
      dataType: "json"
    });
  }

  // Set trustees
  function setTrustees(trustees){
    var strForm = "";
    var strRvmForm = "";
    if(trustees){
      for(var i = 0; i < trustees[0].length; i++){
        if(i % 10 == 0){
          // If at the start of a new set of trustees, separated in groups of 10
          // Else if in a set of 10
          strForm += "<div class='col-4'>";
          strForm += "<div class='list-group'>";
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + ": " + "<label class='fas'>" + trustees[1][i] + "</label></button>";

          strRvmForm += "<div class='col-4'>";
          strRvmForm += "<div class='list-group'>";
          strRvmForm += "<div class='list-group-item-container'><button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button><button type='button' class='btn-remove'><i class='fas fa-times-circle'></i></button></div>";
        }else if (i % 10 != 0) {
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + ": " + "<label class='fas'>" + trustees[1][i] + "</label></button>";

          strRvmForm += "<div class='list-group-item-container'><button type='button' class='list-group-item list-group-item-action'>" + trustees[0][i] + "</button><button type='button' class='btn-remove'><i class='fas fa-times-circle'></i></button></div>";
        }

        // If at the 10 element
        // Else if at the last element and not a 10th element
        if(i % 10 == 9){
          strForm += "</div></div>";

          strRvmForm += "</div></div>";
        }else if(i % 10 != 9 && i == trustees[0].length - 1){
          strForm += "</div></div>";

          strRvmForm += "</div></div>";
        }
      }
    }
    $("#result-table").append(strForm);
    $("#trustee-table").append(strRvmForm);
  }

  // Get all user information
  function getUsers(){
    $.ajax({
      url: "php/users_get.php",
      method: "GET",
      success: function(data){
        if(data){
          setUsers(data);
        }else{
          return 0;
        }
      },
      dataType: "json"
    });
  }

  // Set users
  function setUsers(users){
    var strForm = "";
    if(users){
      for(var i = 0; i < users[0].length; i++){
        if(i % 10 == 0){
          // If at the start of a new set of trustees, separated in groups of 10
          // Else if in a set of 10
          strForm += "<div class='col-4 collapse multi-collapse'>";
          strForm += "<div class='list-group'>";
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + users[0][i] + "</button>";
        }else if (i % 10 != 0) {
          strForm += "<button type='button' class='list-group-item list-group-item-action'>" + users[0][i] + "</button>";
        }

        // If at the 10 element
        // Else if at the last element and not a 10th element
        if(i % 10 == 9){
          strForm += "</div>";
          strForm += "</div>";
        }else if(i % 10 != 9 && i == users[0].length - 1){
          strForm += "</div>";
          strForm += "</div>";
        }
      }
    }
    $("#voted-table").append(strForm);
  }

  // Check if voting is open
  function isOpen(){
    $.ajax({
      url: "php/is_open.php",
      method: "GET",
      success: function(data){
        if(data == 1){
          setOpen(1);
        }else{
          setOpen(0);
        }
      },
      dataType: "text"
    });
  }

  function setOpen(open){
    if(open){
      // $("#status-table").append("<div class='col-8 status-err'>Voting is OPEN</div>");
      // $("#status-table").append("<div class='col-4'><button id='btn-close' class='btn btn-lg btn-warning half-fill' type='button'>Close</button><button id='btn-reset' class='btn btn-lg btn-danger half-fill' data-toggle='modal' data-target='#modal-reset'>RESET</button></div>");
      $("#status-table").append("<button id='btn-close' class='btn btn-lg btn-warning btn-width-full mt mb pl pr' type='button'>Close</button><button id='btn-reset' class='btn btn-lg btn-danger btn-width-full mt mb pl pr' data-toggle='modal' data-target='#modal-reset'>RESET</button>");
    }else{
      // $("#status-table").append("<div class='col-8 status-err'>Voting is CLOSED</div>");
      // $("#status-table").append("<div class='col-4'><button id='btn-open' class='btn btn-lg btn-primary half-fill' type='button'>Open</button><button id='btn-reset' class='btn btn-lg btn-danger half-fill' data-toggle='modal' data-target='#modal-reset'>RESET</button></div>");
      $("#status-table").append("<button id='btn-open' class='btn btn-lg btn-primary btn-width-full mt mb pl pr' type='button'>Open</button><button id='btn-reset' class='btn btn-lg btn-danger btn-width-full mt mb pl pr' data-toggle='modal' data-target='#modal-reset'>RESET</button>");

    }
  }

  $(".pointer").click(function(){
    $("i").toggleClass("fa-chevron-down");
    $("i").toggleClass("fa-chevron-up");
  });

  // Initialize the dashboard
  function initialize(){
    getTrustees();
    getUsers();
    isOpen();
  }

});
