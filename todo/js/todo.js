let todos = document.getElementsByName("todo");
let todoItems = document.getElementById("list-items");
let completedItems = document.getElementById("completed-items");

document.getElementById("newitem").addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    let input = document.getElementById("newitem");
    let li = document.createElement("li");
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = todoItems.lastElementChild.value + 1;
    checkbox.name = "todo";
    let span = document.createElement("span");
    span.textContent = input.value;
    li.appendChild(checkbox);
    li.appendChild(span)
    todoItems.appendChild(li);
    input.value = "";
    addChangeListener(checkbox);
  }
});

todos.forEach(function(element) {
  addChangeListener(element);
});

function addChangeListener(element) {
  element.addEventListener('change', function() {
    let span = element.nextSibling;
    span.classList.toggle("done");
    if (element.checked) {
      completedItems.appendChild(element.parentElement);
    } else {
      todoItems.appendChild(element.parentElement);
    }
  });
}