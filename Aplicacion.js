const form = document.getElementById('materiaForm');
const materiasTable = document.getElementById('materiasTable');

// Escuchar el evento submit para agregar una nueva materia
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const materia = document.getElementById('materia').value;
    const alumnos = document.getElementById('alumnos').value;

    // Enviar la materia al servidor (POST)
    const response = await fetch('http://localhost:3000/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ materia, alumnos })
    });

    if (response.ok) {
        // Recargar la tabla de materias
        cargarMaterias();
    } else {
        console.error('Error al crear la materia');
    }
});

// Función para cargar todas las materias (GET)
async function cargarMaterias() {
    const res = await fetch('http://localhost:3000/materias');
    const data = await res.json();

    // Limpiar la tabla
    materiasTable.innerHTML = '';

    // Llenar la tabla con las materias recibidas
    data.forEach(materia => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${materia.materia}</td><td>${materia.alumnos}</td>`;
        materiasTable.appendChild(row);
    });
}

// Cargar materias al inicio
cargarMaterias();