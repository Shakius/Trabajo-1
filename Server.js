const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

let materias = [];  // Array para almacenar las materias

// GET: Obtener todas las materias
app.get('/materias', (req, res) => {
    res.json(materias);
});

// GET/id: Obtener una materia por id
app.get('/materias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const materia = materias[id];
    if (materia) {
        res.json(materia);
    } else {
        res.status(404).send('Materia no encontrada');
    }
});

// POST: Agregar una nueva materia
app.post('/materias', (req, res) => {
    const { materia, alumnos } = req.body;
    materias.push({ materia, alumnos });
    res.status(201).json({ message: 'Materia agregada con éxito' });
});

// DELETE: Eliminar todas las materias
app.delete('/materias', (req, res) => {
    materias = [];
    res.json({ message: 'Todas las materias eliminadas' });
});

// DELETE/id: Eliminar una materia por id
app.delete('/materias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (materias[id]) {
        materias.splice(id, 1);
        res.json({ message: 'Materia eliminada' });
    } else {
        res.status(404).send('Materia no encontrada');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
        });