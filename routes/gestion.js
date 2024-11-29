const express = require('express');
const router = express.Router();
const gestionService = require('../services/gestionService');

router.post('/matricular', async (req, res) => {
    const { alumnoId, gradoId, cursoId, asignaturas } = req.body;
  
    if (!alumnoId || !gradoId || !cursoId || !asignaturas || asignaturas.length === 0) {
      return res.status(400).json({ message: 'Faltan datos para realizar la matriculación' });
    }
  
    try {
      
      const asignaturasMatriculadas = await gestionService.matricularAlumno(alumnoId, gradoId, cursoId, asignaturas);
  
     
      res.status(200).json({
        message: `El alumno ha sido matriculado en ${asignaturasMatriculadas} asignaturas.`,
      });
    } catch (error) {
      console.error('Error al realizar la matriculación:', error);
      res.status(500).json({ message: 'Hubo un error al matricular al alumno. Inténtalo de nuevo más tarde.' });
    }
  });
  
  module.exports = router;
