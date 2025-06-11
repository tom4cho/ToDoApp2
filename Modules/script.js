/*
    document.querySelector('input[name="status-btn"]:checked')
*/
/*
    TO-DO:
        -Crear el ordenamiento por estatus.
        -Agregar estilos iniciales a la pagina.

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
                    <button onclick="editTask(event)" value="t${taskClass}">edit</button>
                    <button onclick="deleteTask(event)" value="t${taskClass}">delete</button>
                    <select name="status" class="task-status">
                        <option value="0">status</option>
                        <option value="1">pending</option>
                        <option value="2">completed</option>
                    </select>
                </div>
            </div>
    `
}

function deleteTask(e) {
    const element = document.getElementById(`${e.target.value}`)
    element.remove()
}

function editTask(e) {
    let element = document.getElementById(`${e.target.value}`)
    let modal = document.getElementById("edit-modal")
    let buttons = [...modal.querySelectorAll("button")]
    buttons.forEach((button) => {
        button.value = e.target.value
    })

    modal.classList.toggle("hidden")
    modal.querySelector("#edit-title").value = element.querySelector("h3").innerText
    modal.querySelector("#edit-description").value = element.querySelector("p").innerText
}

function acceptChanges(e) {
    let element = document.getElementById(`${e.target.value}`)
    let modal = document.getElementById("edit-modal")

    modal.classList.toggle("hidden")
    element.querySelector("h3").innerText = modal.querySelector("#edit-title").value
    element.querySelector("p").innerText = modal.querySelector("#edit-description").value

    console.log(element)
}

function cancelChanges(e) {
    let modal = document.getElementById("edit-modal")
    modal.querySelector("#edit-title").value = ""
    modal.querySelector("#edit-description").value = ""
    modal.classList.toggle("hidden")

}


/*
    Módulo encargado del ordenamiento de las tareas

    TO-DO:

*/