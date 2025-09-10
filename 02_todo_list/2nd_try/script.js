const todoForm = document.querySelector("form")
const todoInput = document.getElementById("todo-input")
const todoListUL = document.getElementById("todo-list")

let allTodos = getTodos()
updateTodoList()

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputText = todoInput.value.trim()
    const todo = {
        text: inputText,
        completed: false
    }
    allTodos.push(todo)
    saveTodos()
    updateTodoList()
    todoInput.value = ''
})

function updateTodoList(){
    todoListUL.innerHTML = ''
    allTodos.forEach((todo, todoIndex) => {
        const todoLI = createTodoItem(todo, todoIndex)
        todoListUL.append(todoLI)
    })
}

function createTodoItem(todo, todoIndex){
    const todoID = 'todo-' + todoIndex
    const todoLI = document.createElement("li")
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label for="${todoID}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoID}" class="todo-text">${todo.text}</label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `
    const deleteButton = todoLI.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex)
    })

    const input = todoLI.querySelector('input')
    input.addEventListener('change', () => {
        todo.completed = input.checked
        saveTodos()
    })
    input.checked = todo.completed
    return todoLI
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, index) => {
        return index !== todoIndex
    })
    saveTodos()
    updateTodoList()
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem('todos', todosJson)
}

function getTodos(){
    const todos = localStorage.getItem('todos') || '[]'
    return JSON.parse(todos)
}