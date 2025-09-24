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
            // カスタム確認ダイアログを表示して削除を制御
            showConfirm("このタスクを削除してもよろしいですか？").then((confirmed) => {
                if (confirmed) {
                    listItem.remove();
                }
            });
        });

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        taskInput.value = "";
    });
});

// カスタム確認ダイアログの実装
function showConfirm(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById("confirm-modal");
        const overlay = modal.querySelector(".confirm-overlay");
        const dialog = modal.querySelector(".confirm-dialog");
        const msg = document.getElementById("confirm-message");
        const yesBtn = document.getElementById("confirm-yes");
        const noBtn = document.getElementById("confirm-no");

        msg.textContent = message;
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");

        const cleanUp = () => {
            yesBtn.removeEventListener("click", onYes);
            noBtn.removeEventListener("click", onNo);
            overlay.removeEventListener("click", onNo);
            modal.classList.add("hidden");
            modal.setAttribute("aria-hidden", "true");
        };

        const onYes = () => { cleanUp(); resolve(true); };
        const onNo = () => { cleanUp(); resolve(false); };

        yesBtn.addEventListener("click", onYes);
        noBtn.addEventListener("click", onNo);
        overlay.addEventListener("click", onNo);

        // キーボード操作対応
        const onKey = (e) => {
            if (e.key === "Escape") { onNo(); }
            if (e.key === "Enter") { onYes(); }
        };
        document.addEventListener("keydown", onKey, { once: true });
    });
}
