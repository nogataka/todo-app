document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const searchBox = document.getElementById("search-box");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");
        
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.classList.add("task-text");
        
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", () => {
            if (confirm("このタスクを削除してもよろしいですか？")) {
                listItem.remove();
            }
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });

    searchBox.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tasks = todoList.getElementsByTagName("li");

        Array.from(tasks).forEach(task => {
            const taskText = task.querySelector(".task-text").textContent.toLowerCase();
            if (taskText.includes(searchTerm)) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
    });
});