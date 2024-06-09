const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#tasks-list");

const tasks = [];

const app = {
    tasks,
    taskList,
    newTaskInput
};

function createTask(title, isCompleted = false) {
    return {
        id: Date.now(),
        title,
        isCompleted
    };
}

function addTask(app) {
    const newTaskTitle = app.newTaskInput.value;
    const newTask = createTask(newTaskTitle);
    app.tasks.push(newTask);
} 
