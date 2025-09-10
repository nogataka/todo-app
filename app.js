document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("new-task");
    const todoList = document.getElementById("todo-list");
    const confirmDialog = document.getElementById("confirmDialog");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");
    
    let itemToDelete = null;

    function showConfirmDialog(listItem) {
        itemToDelete = listItem;
        confirmDialog.classList.add("show");
    }

    function hideConfirmDialog() {
        confirmDialog.classList.remove("show");
        itemToDelete = null;
    }

    confirmYes.addEventListener("click", () => {
        if (itemToDelete) {
            itemToDelete.remove();
        }
        hideConfirmDialog();
    });

    confirmNo.addEventListener("click", () => {
        hideConfirmDialog();
    });

    confirmDialog.addEventListener("click", (e) => {
        if (e.target === confirmDialog) {
            hideConfirmDialog();
        }
    });

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
            showConfirmDialog(listItem);
        });

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
});