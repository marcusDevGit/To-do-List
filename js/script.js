//Seleção de elementos
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const editInput = document.querySelector("#edit_input");
const canceldelitBTN = document.querySelector("#cancel_edit_btn");


//funçoes
const saveTodo = (text) => {

    //criando div
    const todo = document.createElement("div");
    todo.classList.add("todo");

    //criando h3
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //criando butoes
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish_todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit_todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove_todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can""></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    //limpa o campo depois de adicionar a tarefa
    todoInput.value = '';
    //depois de adicionar a tarefa o cursor fica no campo
    todoInput.focus();
    
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    
    if(inputValue) {
        //salvar todo
        saveTodo(inputValue);
    }


})
