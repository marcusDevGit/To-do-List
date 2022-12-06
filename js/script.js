//Seleção de elementos
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const editInput = document.querySelector("#edit_input");
const canceldelitBTN = document.querySelector("#cancel_edit_btn");

let oldInputValue;
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
    
};

const toggleForms = () => {
    //mostra ou esconder formulario de ediçao
    editForm.classList.toggle("hide");
    //mostra ou esconder formulario
    todoForm.classList.toggle("hide")
    //mostra ou esconder lista de tarefa
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        //comparando se o titulo que foi selecionado e o mesmo que ta na memoria
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}
// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    
    if(inputValue) {
        //salvar todo
        saveTodo(inputValue);
    }


});

document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    //finalizar tarefa
    if(targetEl.classList.contains("finish_todo")) {
        parentEl.classList.toggle("done");
    }

    //remover tarefa
    if(targetEl.classList.contains("remove_todo")){
        parentEl.remove();
    }

    //edita tarefa
    if(targetEl.classList.contains("edit_todo")){
        toggleForms();

            //mapeando o titulo
        editInput.value = todoTitle;
        //mapeando novo titulo
        oldInputValue = todoTitle;
    }
});

canceldelitBTN.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //pegar o valor do input
    const editInputValue = editInput.value

    if(editInputValue) {
        //atualizar
        updateTodo(editInputValue)
    }

    toggleForms();
})