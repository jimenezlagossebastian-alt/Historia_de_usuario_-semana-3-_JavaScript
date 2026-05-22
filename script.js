/* Seleccionar elementos del DOM */
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNotas = document.getElementById("listaNotas");

// Verificar en consola
console.log(inputNota);
console.log(btnAgregar);
console.log(listaNotas);

/* Arreglo para guardar notas */
let notas = [];

// Cargar notas guardadas
const notasGuardadas = localStorage.getItem("notas");

if(notasGuardadas){
    notas = JSON.parse(notasGuardadas);

    console.log("Notas cargadas:", notas.length);

    notas.forEach(nota => {
        crearNota(nota);
    });
}

// Evento para agregar nota
btnAgregar.addEventListener("click", () => {

    const texto = inputNota.value.trim();

    // Validación
    if(texto === ""){
        alert("El input está vacío");
        return;
    }

    // Guardar en arreglo
    notas.push(texto);

    // Guardar en local storage
    localStorage.setItem("notas", JSON.stringify(notas));

    // Crear nota en pantalla
    crearNota(texto);

    console.log("Nota agregada");

    // Limpiar input
    inputNota.value = "";
    inputNota.focus();
});

// Función para crear notas
function crearNota(texto){

    // Crear elementos
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    // Agregar elementos
    li.appendChild(span);
    li.appendChild(btnEliminar);

    listaNotas.appendChild(li);

    // Evento eliminar
    btnEliminar.addEventListener("click", () => {

        // Eliminar del DOM
        listaNotas.removeChild(li);

        // Eliminar del arreglo
        notas = notas.filter(nota => nota !== texto);

        // Actualizar local storage
        localStorage.setItem("notas", JSON.stringify(notas));

        console.log("Nota eliminada");
    });
}
