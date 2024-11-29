const express = require('express');
const router = express.Router();
const cursosService = require('../services/cursosService');


router.get('/grados', async (req, res) => {
  try {
    const grados = await cursosService.getGrados();
    res.json(grados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los grados' });
  }
});


router.get('/asignaturas/:gradoId', async (req, res) => {
  try {
    const gradoId = req.params.gradoId;
    const asignaturas = await cursosService.getAsignaturasPorGrado(gradoId);
    res.json(asignaturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las asignaturas' });
  }
});

module.exports = router;