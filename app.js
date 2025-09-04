document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");
        
        // Create task container with checkbox
        const taskContainer = document.createElement("span");
        
        // Create checkbox
        const checkbox = document.createElement("div");
        checkbox.classList.add("task-checkbox");
        
        // Create task text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskSpan);
        
        // Checkbox toggle functionality
        checkbox.addEventListener("click", () => {
            checkbox.classList.toggle("checked");
            listItem.classList.toggle("completed");
        });

        // Create delete button
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", () => {
            // Add fade out animation before removing
            listItem.style.animation = "fadeInUp 0.4s ease-out reverse";
            setTimeout(() => {
                listItem.remove();
            }, 400);
        });

        listItem.appendChild(taskContainer);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
});