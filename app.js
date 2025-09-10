document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const deleteDialog = document.getElementById("delete-dialog");
    const confirmDeleteBtn = document.getElementById("confirm-delete");
    const cancelDeleteBtn = document.getElementById("cancel-delete");
    
    let itemToDelete = null;

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
            itemToDelete = listItem;
            deleteDialog.classList.add("show");
        });

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
    
    confirmDeleteBtn.addEventListener("click", () => {
        if (itemToDelete) {
            itemToDelete.remove();
            itemToDelete = null;
        }
        deleteDialog.classList.remove("show");
    });
    
    cancelDeleteBtn.addEventListener("click", () => {
        itemToDelete = null;
        deleteDialog.classList.remove("show");
    });
    
    deleteDialog.addEventListener("click", (e) => {
        if (e.target === deleteDialog) {
            itemToDelete = null;
            deleteDialog.classList.remove("show");
        }
    });
});