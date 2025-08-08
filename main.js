const tasksList = document.querySelector("#tasks-list");
const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const alertApp = document.querySelector("#alert-app");

const tasks = [];

const app = {
  tasks,
  tasksList,
  newTaskInput,
  alertApp,
};

window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  app.tasks = savedTasks.map((task) => {
    return createTask(task.title, task.isCompleted);
  });
  app.tasks.forEach((task) => {
    return addTaskToList(task, app.tasksList);
  });
};

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(title, isCompleted = false) {
  let uuid = self.crypto.randomUUID();
  return {
    id: uuid,
    title,
    isCompleted,
  };
}

function addTaskToList(task, taskList) {
  const taskElement = createTaskElement(task);
  taskList.appendChild(taskElement);
}

function addTask(app) {
  const newTaskTitle = app.newTaskInput.value;
  const newTask = createTask(newTaskTitle);
  app.tasks.push(newTask);

  addTaskToList(newTask, app.tasksList);
  saveTasksToLocalStorage(app.tasks);
  app.newTaskInput.value = "";
}

function createTaskElement(task) {
  const taskElement = document.createElement("li");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = taskCheckbox.checked;
    taskText.classList.toggle("completed", task.isCompleted);
    saveTasksToLocalStorage(app.tasks);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toggle("completed", task.isCompleted);

  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.className = "delete-button";
  taskDeleteButton.addEventListener("click", () => {
    taskElement.remove();

    const taskIndex = app.tasks.indexOf(task);
    if (taskIndex > -1) {
      app.tasks.splice(taskIndex, 1);
    }
    saveTasksToLocalStorage(app.tasks);
  });

  // Replace text with icon
  taskDeleteButton.innerHTML = '<i class="material-icons">delete</i>';
  taskDeleteButton.style.fontSize = "16px";
  taskDeleteButton.style.padding = "4px 8px";

  taskElement.appendChild(taskCheckbox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(taskDeleteButton);

  return taskElement;
}

function showAlert(app, message, type = "info") {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `alert-${type}`);
  alertContainer.textContent = message;

  const alertApp = app.alertApp;
  alertApp.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}

addTaskButton.addEventListener("click", () => {
  if (app.newTaskInput.value === "") {
    showAlert(app, "Por favor, ingresa una tarea.", "warning");
    return;
  }

  addTask(app);
});

newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (app.newTaskInput.value === "") {
      showAlert(app, "Por favor, ingresa una tarea.", "warning");
      return;
    }

    addTask(app);
  }
});
