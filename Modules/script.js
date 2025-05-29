/*
    document.querySelector('input[name="status-btn"]:checked')
    Objetivo:
        Manejar todos los eventos que ocurren dentro del 
        proyecto.
*/
/*
    TO-DO:
*/

// Referencias del DOM
const taskForm = document.getElementById("task-form")
const taskButton = document.getElementById("task-button")
const sortButton = document.getElementById("sort-button")
const alphabetSort = document.getElementById("alphabet-sort")
const titleSort = document.getElementById("title-sort")
const statusSort = document.getElementById("status-sort")
const sortSection = document.getElementById("sort-section")
const screen = document.getElementById("screen")
let tasks = []

// Variables
let taskData = {
    title: "",
    description: ""
}

// Función para redirigir los datos del formulario para crear una tarea
taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    

    taskData.title = document.getElementById("task-title").value
    taskData.description = document.getElementById("task-description").value
    
    screen.innerHTML += createTask(taskData)
})

// Función para redirigir los datos del formulario de ordenamiento por status
sortSection.addEventListener("submit", (event) => {
    event.preventDefault()
})


// EVENTOS
taskButton.addEventListener("click", ()=>{
    taskForm.classList.toggle("hidden")
    if(taskButton.innerText === "Add Task"){
        taskButton.innerText = "Exit"
    } else {
        taskButton.innerText = "Add Task"
    }
})
sortButton.addEventListener("click", ()=>{
    sortSection.classList.toggle("hidden")
    if(sortButton.innerText === "Sort"){
        sortButton.innerText = "Exit"
    } else {
        sortButton.innerText = "Sort"
    }
})



/*
    Modulo encargado de administrar las tareas
*/

/*
    TO-DO:
*/
let taskClass = 0
function createTask(task_data) {
    taskClass += 1
    return `
            <div class="task" id="t${taskClass}">
                <h3>${taskData.title}</h3>
                <p>${taskData.description}</p>
                <div class="task-actions">
                    <button>edit</button>
                    <button onclick="deleteTask(event)" value="t${taskClass}">delete</button>
                    <select name="status" class="task-status">
                        <option value="status">status</option>
                        <option value="">pending</option>
                        <option value="">completed</option>
                    </select>
                </div>
            </div>
    `
}

function deleteTask(e) {
    const element = document.getElementById(`${e.target.value}`)
    element.remove()
}


function editTask() {
    
}
