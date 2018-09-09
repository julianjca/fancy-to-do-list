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
    url: "https://boiling-dawn-83846.herokuapp.com/login",
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
    url: "https://boiling-dawn-83846.herokuapp.com/register",
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

  var container4 = $(".update-form");
  if (!container4.is(e.target) && container4.has(e.target).length === 0) {
    container4.hide();
  }
});

//showing and adding todo
$("#addTodo").click(() => {
  $(".create-form").fadeIn("slow");
});

$("#post-todo").submit((e) => {
  e.preventDefault();

  $.ajax({
    url: "https://boiling-dawn-83846.herokuapp.com/todo",
    method: "POST",
    data: {
      name: $("#todoValue").val(),
      dueDate: $("#dueDate").val(),
      description : $("#todoDesc").val(),
      email : localStorage.getItem("email"),
      token : localStorage.getItem("token")
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

//Todo Page
if (localStorage.getItem("token") !== null) {
  $(document).ready(() => {
    $.ajax({
      url: "https://boiling-dawn-83846.herokuapp.com/findUser",
      method: "POST",
      data: {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token")
      }
    })
      .done(response => {
        console.log(response);
        const lists = response.data.todolist;
        $(".todo-list").html("");
        for (let i = 0; i < lists.length; i++) {
          const date = formatDate(new Date(lists[i].dueDate));
          console.log(lists[i]._id);
          if (lists[i].status === "Finished") {
            $(".todo-list").append(
              `<h3>
                  <strong>${lists[i].name}</strong> <br> Description : ${lists[i].description} <br> <br><strong>Due Date : ${date}</strong>
              <br> TASK FINISHED ✅ 🤘🏻
              </h3> <br>
              `
            );
          } else {
            $(".todo-list").append(
              `<h3>
              <strong>${lists[i].name}</strong> <br> Description :  ${lists[i].description} <br> <br> <strong>Due Date : ${date}</strong>
                  <br> <a href="#" onclick="complete('${lists[i]._id}')">✅</a> <a onclick="erase('${lists[i]._id}')">❌</a> <a onclick="update('${lists[i]._id}')">✏️</a>
              </h3>`
            );
          }
        }
      })
      .fail(err => {
        console.log(err);
      });
  });
}

function complete(id) {
  $.ajax({
    url: `https://boiling-dawn-83846.herokuapp.com/todo/${id}`,
    method: "PATCH",
    data: {
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      location.reload();
    })
    .fail(err => {
      console.log(err);
    });
}

function erase(id) {
  $.ajax({
    url: `https://boiling-dawn-83846.herokuapp.com/todo/${id}`,
    method: "DELETE",
    data: {
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token")
    }
  })
    .done(response => {
      location.reload();
    })
    .fail(err => {
      console.log(err);
    });
}

function update(id) {
  $(".update-form").show();
  $("#updateTodo").submit((e) => {
    e.preventDefault();
    $.ajax({
      url: `https://boiling-dawn-83846.herokuapp.com/todo/${id}`,
      method: "PUT",
      data: {
        name: $("#todoUpdate").val(),
        dueDate: $("#dueUpdate").val(),
        description: $("#descUpdate").val(),
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token")
      }
    })
      .done(data => {
        swal("Congrats!", "Task Has Been Updated!", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .fail(err => {
        console.log(err);
      });
  });

}

//Helper
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}