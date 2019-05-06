var token = localStorage.getItem("token");
if (token) {
  token = token.replace(/^"(.*)"$/, "$1"); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");
var input = document.querySelector("input[name=newitem]");
let todoItems = document.getElementById("list-items");
let completedItems = document.getElementById("completed-items");

function updateTodo(id, completed, element) {
  // revisen si completed es booleano o string
  json_to_send = {
    completed: completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
    url: "https://examen-final-web.herokuapp.com/todos/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    method: "PATCH",
    dataType: "json",
    data: json_to_send,
    success: function(data) {
      let span = element.nextSibling;
      span.classList.toggle("done");

      if (data.completed == true) {
        completedItems.appendChild(element.parentElement);
      } else {
        todoItems.appendChild(element.parentElement);
      }
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

function loadTodos() {
  $.ajax({
    url: "https://examen-final-web.herokuapp.com/todos",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      for (let i = 0; i < data.length; i++) {
        addTodo(data[i]._id, data[i].description, data[i].completed);
      }
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

loadTodos();

// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

input.addEventListener("keypress", function(event) {
  if (event.charCode === 13) {
    json_to_send = {
      description: input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: "https://examen-final-web.herokuapp.com/todos",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      method: "POST",
      dataType: "json",
      data: json_to_send,
      success: function(data) {
        addTodo(data._id, data.description, data.completed);
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
    input.value = "";
  }
});

function addTodo(id, todoText, completed) {
  let input = document.getElementById("newitem");
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = id;
  checkbox.name = "todo";
  checkbox.checked = completed;
  let span = document.createElement("span");
  span.textContent = todoText;
  li.appendChild(checkbox);
  li.appendChild(span);
  if (completed == false) {
    todoItems.appendChild(li);
  } else {
    completedItems.appendChild(li);
    span.classList.toggle("done");
  }
  input.value = "";
  addChangeListener(checkbox);
}

todos.forEach(function(element) {
  addChangeListener(element);
});

function addChangeListener(element) {
  element.addEventListener("change", function() {
    updateTodo(element.value, element.checked, element);
  });
}
