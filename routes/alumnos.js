const express = require('express');
const router = express.Router();
const alumnosService = require('../services/alumnosService');

router.get('/buscar', async (req, res) => {
    try {
        const { id, nif, nombre } = req.query;

        
        if ((id || nif) && nombre) {
            return res.status(400).json({ message: 'Solo ponga el Id o nif' });
        }

        let resultados;
        
        if (id || nif) {
            
            resultados = await alumnosService.buscarPorIdONif(id, nif);
        } else if (nombre) {
            
            resultados = await alumnosService.buscarPorNombre(nombre);
        } else {
            return res.status(400).json({ message: 'Debe especificar al menos uno de los campos de búsqueda' });
        }

        
        if (resultados.length === 0) {
            return res.status(404).json({ message: 'No se encontraron alumnos' });
        }

        res.json(resultados);
    } catch (error) {
        console.error('Error al buscar alumnos:', error);
        res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
});


router.get('/:id/asignaturas', async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const asignaturas = await alumnosService.obtenerAsignaturas(alumnoId);

        console.log(asignaturas); 

        if (!asignaturas || asignaturas.length === 0) {
            return res.status(404).json({ message: 'El alumno no está matriculado en ninguna asignatura' });
        }

        res.json(asignaturas);
    } catch (error) {
        console.error('Error al obtener asignaturas:', error);
        res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
});

module.exports = router;