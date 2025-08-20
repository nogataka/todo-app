document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", () => {
            listItem.remove();
        });

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
});