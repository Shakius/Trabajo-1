const http = require('http');
const { parse } = require('url');

let materias = []; // Array para almacenar las materias

const server = http.createServer((req, res) => {
    const url = parse(req.url, true);
    
    // Obtener todas las materias (GET)
    if (req.method === 'GET' && url.pathname === '/materias') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(materias));
        return;
    }

    // Agregar una nueva materia (POST)
    if (req.method === 'POST' && url.pathname === '/materias') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convertir los datos a string
        });

        req.on('end', () => {
            const { materia, alumnos } = JSON.parse(body); // Parsear el JSON
            materias.push({ materia, alumnos });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Materia agregada con éxito' }));
        });
        return;
    }

    // Eliminar todas las materias (DELETE)
    if (req.method === 'DELETE' && url.pathname === '/materias') {
        materias = [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todas las materias eliminadas' }));
        return;
    }

    // Eliminar una materia por ID (DELETE/id)
    if (req.method === 'DELETE' && url.pathname.startsWith('/materias/')) {
        const id = parseInt(url.pathname.split('/')[2]);
        if (materias[id]) {
            materias.splice(id, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Materia eliminada' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Materia no encontrada' }));
        }
        return;
    }

    // Ruta por defecto
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada. Por favor, visita la ruta /materias para interactuar con la API.');
});


// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});