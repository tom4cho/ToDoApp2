/*
    document.querySelector('input[name="status-btn"]:checked')
*/
/*
    TO-DO:
        -Agregar la funcionalidad edit de las tareas.
        -Modificar los campos para hacer tareas para marcar la descripción 
            opcional.
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
        -Crear la función para editar táreas.
*/
let taskClass = 0
function createTask(task_data) {
    taskClass += 1
    return `
            <div class="task" id="t${taskClass}">
                <h3>${taskData.title}</h3>
                <p>${taskData.description}</p>
                <div class="task-actions">
                    <button onclick="editTask(event) value="t${taskClass}"">edit</button>
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

/*
    OBJETIVO:
        Modificar la tarea donde se presionó el botón, dados los datos del usuario.
    CONSIDERACIONES:
        -Se debe dar un formulario de edición al usuario.
        -El usuario podrá escoger entre conservar o no los cambios.
    ALGORITMO:
        1-Recuperar el objeto evento.
        2-Mostrar un formulario de edición basado en los datos del objetivo del evento.
        3-Verificar
            Si x o cancel han sido presionados.
                Descartar los cambios hechos por el usuario.
            Si se presiona accept
                Se modifica la tarea objetivo del evento con los datos proporcionados.

*/
`
    <div id="edit-modal" class="">
        <form action="post">
            <h2>Edit Task Form</h2>
            <label for="edit-title">Title for the task</label>
            <input type="text" id="edit-title" required>
            <label for="edit-description">Description for the task</label>
            <input type="text" id="edit-description" required>
            <button id="accept-edit">Edit</button>
            <button id="cancel-edit">Cancel</button>
        </form>
    </div>
`
function editTask(e) {
    let target = e.target
    console.log(target)
    document.getElementById("edit-modal").classList.toggle("hidden")
}



/*
    Módulo encargado del ordenamiento de las tareas

    TO-DO:

*/