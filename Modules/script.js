/*
    document.querySelector('input[name="status-btn"]:checked')
*/
/*
    TO-DO:
        -Corregir error:
            Al momento de eliminar una tarea, su registro no se elimina de las tareas, por lo que al recargar todas las tareas vuelve a aparecer. 

        -Hacer sorteo por titulo.
            Documentar la función de sorteo por titulo.

        -Hacer sorteo alfabetico.

        -Limpiar los campos al momento de cerrar el menu de acciones.

        -Actualizar la forma en la que se registran las tareas y se eliminan de la variable task.
            1.Al momento de crear la tarea se debe ingresar de inmediato el registro en la variable task.
            2.Al momento de eliminar la tarea se debe borrar el registro en la variable task.
*/

// Referencias del DOM
const taskForm = document.getElementById("task-form");
const taskButton = document.getElementById("task-button");
const sortButton = document.getElementById("sort-button");
const alphabetSort = document.getElementById("alphabet-sort");
const titleSort = document.getElementById("title-sort");
const sortSection = document.getElementById("sort-section");
const statusSort = document.getElementById("statusSort-form");
const screen = document.getElementById("screen");
const modal = document.getElementById("edit-modal");

// Variable para almacenar las tareas.
let tasks = [];

// Variable para almacenar la información de la tarea.
let taskData = {
    title: "",
    description: ""
};

// Variable que asigna una id única a cada tarea nueva.
let taskId = 0;

// Función para añadir al html la tarea con los datos del formulario.
taskForm.addEventListener("submit", (event) => {
    // Se evita que el formulario recargue la página.
    event.preventDefault();
    
    // Se asigna a las propiedades del objeto taskData los valores dados por el formulario.
    taskData.title = document.getElementById("task-title").value;
    taskData.description = document.getElementById("task-description").value;
    
    // Se llama la función createTask con taskData como argumento y se añade al html.
    screen.insertAdjacentHTML("beforeend", createTask(taskData));
    tasks.push(document.getElementById("t" + taskId));

    // Se reinician los valores de los campos del formulario.
    document.getElementById("task-description").value = "";
    document.getElementById("task-title").value = "";
});


// Evento para manejar el display del formulario y el texto de los botones para añadir tareas.
taskButton.addEventListener("click", ()=>{
    taskForm.classList.toggle("hidden");
    if(taskButton.innerText === "Add Task"){
        taskButton.innerText = "Exit";
    } else {
        taskButton.innerText = "Add Task";
    }
});



//<---!--->
/*
    Modulo encargado de realizar las acciones de creación, eliminación y edición de
    las tareas.
*/

//  Función para crear tareas
function createTask(task_data) {
    taskId += 1;

    // Con la información de taskData crea una nueva tarea y retorna el html de la tarea.
    // Al crear la tarea se asignan eventos click que llaman a las otras funciones con el objeto evento.
    return `
            <div class="task" id="t${taskId}">
                <h3>${taskData.title}</h3>
                <p>${taskData.description}</p>
                <div class="task-actions">
                    <button onclick="editTask(event)" value="t${taskId}">edit</button>
                    <button onclick="deleteTask(event)" value="t${taskId}">delete</button>
                    <select name="status" class="task-status">
                        <option value="0">status</option>
                        <option value="1">pending</option>
                        <option value="2">completed</option>
                    </select>
                </div>
            </div>
    `;
};

// Función para eliminar una tarea.
function deleteTask(e) {
    // Busca el elemento que su id corresponde al valor del botón delete y lo elimina del HTML.
    const element = document.getElementById(`${e.target.value}`);
    element.remove();
    console.log(e.target.value)
    tasks.splice(e.target.value, 1);
};

// Función para editar una tarea.
function editTask(e) {
    /*
        Se Almacena el elemento del botón que llamó al evento y se asigna a los botones del formulario de edición el valor del botón que llamo al evento.
    */
    let element = document.getElementById(`${e.target.value}`);
    let buttons = [...modal.querySelectorAll("button")];
    buttons.forEach((button) => {
        button.value = e.target.value;
    });

    /*
        Se elimina o añade la clase "hidden" al formulario, se asigna a los campos del formulario el titulo y la descripción del elemento que llamó al evento.
    */
    modal.classList.toggle("hidden");
    modal.querySelector("#edit-title").value = element.querySelector("h3").innerText;
    modal.querySelector("#edit-description").value = element.querySelector("p").innerText;
};

// Funciones del formulario de edición.
// Función que modifica los campos de la tarea donde se llamó el evento editTask. 
function acceptChanges(e) {
    // Se llama y almacena al elemento con la id igual al valor del botón donde fué llamado el evento.
    let element = document.getElementById(`${e.target.value}`);

    modal.classList.toggle("hidden")
    element.querySelector("h3").innerText = modal.querySelector("#edit-title").value;
    element.querySelector("p").innerText = modal.querySelector("#edit-description").value;
};

// Función que esconde el formulario y vacía sus campos.
function cancelChanges(e) {
    modal.querySelector("#edit-title").value = "";
    modal.querySelector("#edit-description").value = "";
    modal.classList.toggle("hidden");
};

//<---!--->
/*
    Módulo encargado del ordenamiento de las tareas por status, titulo y alfabeticamente.
*/

// Evento para manejar el display de la sección sort y el texto del botón.
sortButton.addEventListener("click", ()=>{
    sortSection.classList.toggle("hidden");
    if(sortButton.innerText === "Sort"){
        sortButton.innerText = "Exit";
    } else {
        sortButton.innerText = "Sort";
    };
});

// Función para redirigir los datos del formulario de ordenamiento por status
statusSort.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector('input[name="status-btn"]:checked');

    if (status == null ) {
        alert("Selecciona un estado para continuar");
        return;
    } else if(status.value == 0){
        screen.innerHTML = "";
        tasks.forEach((task)=>{
            screen.appendChild(task);
        });
        return;
    };

    screen.innerHTML = "";

    tasks.forEach((task) => {
        let taskStatus = task.querySelector(".task-actions").querySelector(".task-status");
        if (taskStatus.value === status.value) {
            screen.appendChild(task);
        };
    });
});

// Función para ordenamiento basado en título
/*
    Casos a cubrir:
        Mostrar todas las tareas que coincidan con la búsqueda.

        Si ninguna tarea coincide con la búsqueda, se alerta al usuario de que no hubo coincidencias y no se modifica la pantalla.

*/
titleSort.addEventListener("click", (event) =>{
    const title = document.getElementById("title-input").value.toLowerCase();

    let coincidences = [];

    tasks.forEach((task) => {
        const taskTitle = task.querySelector("h3").innerText.toLowerCase();
        if (title === taskTitle) {
            coincidences.push(task);
        };
    })

    if (coincidences.length <= 0) {
        alert("No hubo ninguna coincidencia");
    } else {
        screen.innerHTML = "";
        coincidences.forEach((coincidence) => {
            screen.appendChild(coincidence);
        });
    };
});