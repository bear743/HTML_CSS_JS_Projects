const form = document.querySelector('form')
const todoInput = document.getElementById('todo-input')
const todoUL = document.getElementById('todo-ul')

let todoList = getTodoList()

updateTodoList()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(){
    const todoText = todoInput.value.trim()
    if(todoText !== ''){
        todo = {
            text: todoText,
            completed: false
        }
        todoList.push(todo)
        saveTodoList()
        updateTodoList()
        todoInput.value = ''
    }
}

function updateTodoList(){
    todoUL.innerHTML = ''
    todoList.forEach((todo, todoIndex) => {
        const todoLI = createTodoItem(todo, todoIndex)
        todoUL.append(todoLI)
    })
}

function createTodoItem(todo, todoIndex){
    const todoID = 'todo' + todoIndex
    const todoLI = document.createElement('li')
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label for="${todoID}" class="checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoID}" class="todo-text">${todo.text}</label>
        <button class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
        </button>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `
    const editButton = todoLI.querySelector('.edit-button')
    const todoTextLabel = todoLI.querySelector('.todo-text')

    function finishEditing(){
        todoTextLabel.contentEditable = false
        todoTextLabel.setAttribute('for', todoID)
        editButton.classList.remove('editing')
        todoList[todoIndex].text = todoTextLabel.innerText
        saveTodoList()
    }

    editButton.addEventListener('click', () => {
        const isEditing = todoTextLabel.isContentEditable
        if(!isEditing){
            todoTextLabel.contentEditable = true
            todoTextLabel.removeAttribute('for')
            editButton.classList.add('editing')
            todoTextLabel.focus()
        }
    })

    todoTextLabel.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            finishEditing()
        }
    })

    todoTextLabel.addEventListener('blur', () => {
        if(todoTextLabel.isContentEditable){
            finishEditing()
        }
    })

    const deleteButton = todoLI.querySelector('.delete-button')
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex)
    })

    const checkboxInput = todoLI.querySelector('input')
    checkboxInput.addEventListener('change', () => {
        todoList[todoIndex].completed = checkboxInput.checked
        saveTodoList()
    })
    checkboxInput.checked = todoList[todoIndex].completed

    return todoLI
}

function deleteTodoItem(todoIndex){
    todoList = todoList.filter((_, i) => i !== todoIndex)
    saveTodoList()
    updateTodoList()
}

function saveTodoList(){
    const todoListJson = JSON.stringify(todoList)
    localStorage.setItem('todoList', todoListJson)
}

function getTodoList(){
    const todoListArr = JSON.parse(localStorage.getItem('todoList') || '[]') 
    return todoListArr
}