//Seleção de elementos
const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_input");
const todoList = document.querySelector("#todo_list");
const editForm = document.querySelector("#edit_form");
const editInput = document.querySelector("#edit_input");
const canceldelitBTN = document.querySelector("#cancel_edit_btn");
const searchInput = document.querySelector("#search_input");
const eraseBtn = document.querySelector("#erase_button");
const filterBtn = document.querySelector("#filter_select");

let oldInputValue;
//funçoes
const saveTodo = (text, done = 0, save = 1) => {

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

    // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

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
    todoForm.classList.toggle("hide");
    //mostra ou esconder lista de tarefa
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        //comparando se o titulo que foi selecionado e o mesmo que ta na memoria
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

           // Utilizando dados da localStorage
            updateTodoLocalStorage(oldInputValue, text); 
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
  
    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
  
      todo.style.display = "flex";
  
      console.log(todoTitle);
  
      if (!todoTitle.includes(search)) {
        todo.style.display = "none";
      }
    });
};
  
const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
  
    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));
  
        break;
  
      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      default:
        break;
    }
};





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
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    //finalizar tarefa
    if(targetEl.classList.contains("finish_todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    //remover tarefa
    if(targetEl.classList.contains("remove_todo")){
        parentEl.remove();

        // Utilizando dados da localStorage
        removeTodoLocalStorage(todoTitle);
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
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
  
    getSearchedTodos(search);
  });
  
  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    searchInput.value = "";
  
    searchInput.dispatchEvent(new Event("keyup"));
  });
  
  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
  
    filterTodos(filterValue);
});

 // Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    return todos;
};
  
const loadTodos = () => {
    const todos = getTodosLocalStorage();
  
    todos.forEach((todo) => {
      saveTodo(todo.text, todo.done, 0);
    });
};
  
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
  
    todos.push(todo);
  
    localStorage.setItem("todos", JSON.stringify(todos));
};
  
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    const filteredTodos = todos.filter((todo) => todo.text != todoText);
  
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};
  
const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoText ? (todo.done = !todo.done) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
};
  
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();
  
    todos.map((todo) =>
      todo.text === todoOldText ? (todo.text = todoNewText) : null
    );
  
    localStorage.setItem("todos", JSON.stringify(todos));
};
  
  loadTodos();