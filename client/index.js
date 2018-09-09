//Check if login or not
$(document).ready(() => {
  if (localStorage.getItem("token") !== null || localStorage.getItem("token") !== undefined) {
    $(".nav-bar").hide();
    $("#logout").show();
    $('.welcome').hide();
    $("#todo").show();

  } if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
    $(".nav-bar").show();
    $("#logout").hide();
    $('.welcome').show();
    $("#todo").hide();
  }
});

//Action when clicking logout
$("#logout").click(() => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  location.reload();
});

//Login Form
$("#login").click(() => {
  $(".login-box").show();
});

//Register Form
$("#register").click(() => {
  $(".register-box").show();
});


//Adding todo form
$("#addTodo").click(() => {
  $(".create-form").show();
});

//login post
$("#post-login").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/login",
    method: "POST",
    data: {
      email: $("#emailValueLogin").val(),
      password: $("#passwordValueLogin").val(),
    }
  })
    .done(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      swal("Welcome!", "You have successfully logged in!", "success");
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .fail(err => {
      console.log(err);
    });
});

//register post
$("#post-register").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/register",
    method: "POST",
    data: {
      email: $("#emailValue").val(),
      password: $("#passwordValue").val(),
      name: $("#nameValue").val(),
    }
  })
    .done(data => {
      swal("Welcome!", "You have been registered!", "success");
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .fail(err => {
      console.log(err);
    });
});

//Hide when touching outside the div
$(document).mouseup(function (e) {
  var container = $(".login-box");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }

  var container2 = $(".register-box");
  if (!container2.is(e.target) && container2.has(e.target).length === 0) {
    container2.hide();
  }

  var container3 = $(".create-form");
  if (!container3.is(e.target) && container3.has(e.target).length === 0) {
    container3.hide();
  }
});

//showing and adding todo
$("#addTodo").click(() => {
  $(".create-form").fadeIn("slow");
});

$("#post-todo").submit((e) => {
  e.preventDefault();

  $.ajax({
    url: "http://localhost:3000/todo",
    method: "POST",
    data: {
      name: $("#todoValue").val(),
      dueDate: $("#dueDate").val(),
      email : localStorage.getItem("email")
    }
  })
    .done(data => {
      swal("Welcome!", "Task Has Been Added!", "success");
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .fail(err => {
      console.log(err);
    });
});