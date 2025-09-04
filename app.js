document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");
        const taskId = `task-${Date.now()}`;
        
        // Create task container with checkbox
        const taskContainer = document.createElement("span");
        
        // Create proper checkbox input
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = taskId;
        checkbox.classList.add("task-checkbox");
        checkbox.setAttribute("aria-label", `Mark "${taskText}" as complete`);
        
        // Create label for checkbox
        const label = document.createElement("label");
        label.htmlFor = taskId;
        label.textContent = taskText;
        label.classList.add("task-label");
        
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(label);
        
        // Checkbox toggle functionality
        checkbox.addEventListener("change", () => {
            listItem.classList.toggle("completed", checkbox.checked);
            checkbox.setAttribute("aria-checked", checkbox.checked);
        });

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("delete");
        deleteBtn.setAttribute("aria-label", `Delete task: ${taskText}`);
        deleteBtn.setAttribute("type", "button");

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