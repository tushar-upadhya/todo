import "./style.css";

interface ITodo {
    title: string;
    isCompleted: boolean;
    id: string;
}

const todos: ITodo[] = [];

const todoContainer = document.querySelector(
    ".todo_container"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const form = document.getElementById("form") as HTMLFormElement;

form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const todo: ITodo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Math.random() * 1000),
    };

    todos.push(todo);
    todoInput.value = "";
    // console.log("todos:", todos);

    renderTodo(todos);
};

const generateItem = (title: string, isCompleted: boolean, id: String) => {
    const todo = document.createElement("div");
    todo.className = "todo";

    // checkbox

    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "isCompleted";
    checkBox.checked = isCompleted;

    checkBox.onchange = () => {
        // console.log(isCompleted);
        // console.log(checkBox.checked);
        todos.find((item) => {
            if (item.id === id) item.isCompleted = checkBox.checked;
        });
        para.className = checkBox.checked ? "text_cut" : "";
    };

    // p for title

    const para: HTMLParagraphElement = document.createElement("p");
    para.innerText = title;
    para.className = isCompleted ? "text_cut" : "";

    // button

    const button: HTMLButtonElement = document.createElement("button");
    button.innerText = "X";
    button.className = "delete_btn";

    button.onclick = () => {
        deleteTodo(id);
    };

    // append items

    todo.append(checkBox, para, button);

    todoContainer.append(todo);
};

const deleteTodo = (id: String) => {
    const index = todos.findIndex((idx) => idx.id === id);

    todos.splice(index, 1);
};

const renderTodo = (todos: ITodo[]) => {
    todoContainer.innerText = "";

    todos.forEach((item) => {
        generateItem(item.title, item.isCompleted, item.id);
    });
};
