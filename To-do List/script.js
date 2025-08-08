const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filters button");
const toggleThemeBtn = document.getElementById("toggle-theme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => toggleComplete(index));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeTask(index);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    if (taskInput.value.trim() === "") return;
    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderTasks();
    });
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

renderTasks();
