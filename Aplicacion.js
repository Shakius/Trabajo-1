const form = document.getElementById('materiaForm');
const materiasTable = document.getElementById('materiasTable');

// Escuchar el evento submit para agregar una nueva materia
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const materia = document.getElementById('materia').value;
    const alumnos = document.getElementById('alumnos').value;

    const response = await fetch('http://localhost:3000/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ materia, alumnos })
    });

    if (response.ok) {
        cargarMaterias();
    } else {
        console.error('Error al crear la materia');
    }

    form.reset();
});

// Función para cargar todas las materias (GET)
async function cargarMaterias() {
    const res = await fetch('http://localhost:3000/materias');
    const data = await res.json();

    // Limpiar la tabla antes de agregar nuevas filas
    materiasTable.querySelector('tbody').innerHTML = '';

    data.forEach((materia, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${materia.materia}</td>
            <td>${materia.alumnos}</td>
            <td>
                <button onclick="eliminarMateria(${index})">Eliminar</button>
            </td>
        `;
        materiasTable.querySelector('tbody').appendChild(row);
    });
}

// Función para eliminar una materia (DELETE)
async function eliminarMateria(id) {
    const response = await fetch(`http://localhost:3000/materias/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        cargarMaterias(); // Recargar la lista de materias
    } else {
        console.error('Error al eliminar la materia');
    }
}

// Cargar materias al iniciar la página
cargarMaterias();