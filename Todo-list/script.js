document.addEventListener("DOMContentLoaded", () => {
  const addTaskForm = document.getElementById("add-task-form");
  const newTaskInput = document.getElementById("new-task-input");

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;

    const todoItem = createTodoItem(taskText);

    const backlogList = document.querySelector("#backlog .todo-list");
    backlogList.appendChild(todoItem);

    newTaskInput.value = "";

    updateButtonStates();
  });

  function createTodoItem(taskText) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const leftbtn = document.createElement("button");
    leftbtn.classList.add("nav-btn", "left");
    leftbtn.textContent = "←";

    const rightbtn = document.createElement("button");
    rightbtn.classList.add("nav-btn", "right");
    rightbtn.textContent = "→";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deletebtn = document.createElement("button");
    deletebtn.classList.add("delete-btn");
    deletebtn.textContent = "X";

    todoItem.appendChild(leftbtn);
    todoItem.appendChild(taskSpan);
    todoItem.appendChild(rightbtn);
    todoItem.appendChild(deletebtn);

    leftbtn.addEventListener("click", moveTask);
    rightbtn.addEventListener("click", moveTask);
    deletebtn.addEventListener("click", deleteTask);

    return todoItem;
  }

  function moveTask(event) {
    const todoItem = event.target.closest(".todo-item");
    const currentList = todoItem.parentElement;
    const todoCard = currentList.parentElement;
    const todoCardId = todoCard.id;

    let targetList;

    if (event.target.classList.contains("right")) {
      switch (todoCardId) {
        case "backlog":
          targetList = document.querySelector("#todo .todo-list");
          break;
        case "todo":
          targetList = document.querySelector("#ongoing .todo-list");
          break;
        case "ongoing":
          targetList = document.querySelector("#done .todo-list");
          break;
      }
    } else if (event.target.classList.contains("left")) {
      switch (todoCardId) {
        case "todo":
          targetList = document.querySelector("#backlog .todo-list");
          break;
        case "ongoing":
          targetList = document.querySelector("#todo .todo-list");
          break;
        case "done":
          targetList = document.querySelector("#ongoing .todo-list");
          break;
      }
    }

    if (targetList) {
      todoItem.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      todoItem.style.transform = "translateX(80px)";
      todoItem.style.opacity = "0";

      setTimeout(() => {
        currentList.removeChild(todoItem);
        todoItem.style.transform = "translateX(0)";
        todoItem.style.opacity = "1";
        targetList.appendChild(todoItem);
        updateButtonStates();
      }, 300);
    }
  }

  function deleteTask(event) {
    const todoItem = event.target.closest(".todo-item");

    todoItem.style.transition = "opacity 0.5s ease, height 0.3s ease, padding 0.3s ease";
    todoItem.style.opacity = "0";
    todoItem.style.height = "0";
    todoItem.style.padding = "0";

    setTimeout(() => {
      todoItem.remove();
      updateButtonStates();
    }, 500); 
  }

  function updateButtonStates() {
    document.querySelectorAll("#backlog .todo-item .left").forEach((button) => {
      button.disabled = true;
      button.style.color = "grey";
    });

    document.querySelectorAll("#done .todo-item .right").forEach((button) => {
      button.disabled = true;
      button.style.color = "grey";
    });

    document
      .querySelectorAll("#todo .todo-item .left, #ongoing .todo-item .right")
      .forEach((button) => {
        button.disabled = false;
        button.style.color = "green";
      });
  }

  updateButtonStates();
});
