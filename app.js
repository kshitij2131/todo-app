const input = document.getElementById("task-input");
const form = document.getElementById("task-input-form");
const list = document.getElementById("todo-list");


function startApp(){
    const tasks = localStorage.getItem("todoTasks") ? JSON.parse(localStorage.getItem("todoTasks")) : [];
    tasks.forEach((task) => {
        createTask(task.label, task.status);
    });

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        // console.log("input is ", input.value);
        createTask(input.value, undefined, true);
        input.value="";
    });
}

function syncTasks(){
    const activeTasks = list.querySelectorAll(".todo-task");
    const tasks = [];
    activeTasks.forEach((task) => {
        const label = task.querySelector('.todo-task-label').innerText;
        const status = task.querySelector('.todo-task-status').className.includes("checked");
        tasks.push({label, status});
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function createTask(label, status = false, newTask=false){
    const item = document.createElement("li");
    const taskLabel = document.createElement("span");
    const editTask = document.createElement("img");
    const checkedTask = document.createElement("img");
    const deletedTask = document.createElement("img");


    item.classList.add("todo-task");
    taskLabel.classList.add("todo-task-label");
    editTask.classList.add("todo-list-edit");
    checkedTask.classList.add("todo-task-status");
    deletedTask.classList.add("todo-task-delete");


    taskLabel.innerText = label;
    taskLabel.addEventListener("blur", () => {
        if (taskLabel.isContentEditable){
            taskLabel.classList.remove("editable");
            taskLabel.contentEditable = false;
            // console.log("task labels inner text is", taskLabel.innerText);
            syncTasks();
        }
    });

    taskLabel.addEventListener("keydown", (event) => {
        if (event.key === "Enter"){
            event.preventDefault();
            taskLabel.blur();
        }
    });

    editTask.src = "src/edit-icon.svg";
    editTask.alt = "edit";
    editTask.addEventListener("click",() => {
        taskLabel.classList.add("editable");
        taskLabel.contentEditable = true;
        taskLabel.focus();
    });



    if (status){
        checkedTask.classList.add("checked");
    }
    checkedTask.src = (checkedTask.className.includes("checked")
                        ? "src/check-icon.svg" : "src/uncheck-icon.svg");
    checkedTask.alt = (checkedTask.className.includes("checked")
                        ? "checked" : "unchecked");

    checkedTask.addEventListener("click" ,()=>{
        checkedTask.classList.toggle("checked");
        checkedTask.src = (checkedTask.className.includes("checked") ? "src/check-icon.svg" : "src/uncheck-icon.svg");
        checkedTask.alt = (checkedTask.className.includes("checked") ? "checked" : "unchecked");
        syncTasks();
    });


    deletedTask.src = "src/delete-icon.svg";
    deletedTask.alt = "delete";
    deletedTask.addEventListener("click", ()=>{
        item.remove();
        syncTasks();
    });


    item.append(taskLabel, editTask, checkedTask, deletedTask);
    list.append(item);

    // console.log("task added;)");
    if (newTask){
        syncTasks();
    }
    
}

// syncTasks();
startApp();

