function showDeleteConfirmDialog(taskText, onConfirm) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    
    const dialog = document.createElement("div");
    dialog.classList.add("confirm-dialog");
    
    dialog.innerHTML = `
        <h3>タスクを削除</h3>
        <p>「${taskText}」を削除してもよろしいですか？</p>
        <div class="confirm-dialog-buttons">
            <button class="cancel-btn">キャンセル</button>
            <button class="delete-btn">削除</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(dialog);
    
    const cancelBtn = dialog.querySelector(".cancel-btn");
    const deleteBtn = dialog.querySelector(".delete-btn");
    
    const closeDialog = () => {
        overlay.remove();
        dialog.remove();
    };
    
    cancelBtn.addEventListener("click", closeDialog);
    overlay.addEventListener("click", closeDialog);
    
    deleteBtn.addEventListener("click", () => {
        onConfirm();
        closeDialog();
    });
}

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
            showDeleteConfirmDialog(taskText, () => {
                listItem.remove();
            });
        });

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
});