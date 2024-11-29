const express = require('express');
const router = express.Router();
const profesoresService = require('../services/profesoresService');


router.get('/profesores', async (req, res) => {
  try {
    const profesor = await profesoresService.getAllProfesores(); 
    res.status(200).json({profesor});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los profesores' });
  }
});




router.get('/profesores/buscar', async (req, res) => {
  const { nombre, apellido1, sexo, departamento } = req.query;

  const filters = {
    nombre,
    apellido1,
    sexo,
    departamento
  };

  try {
    const profesor = await profesoresService.searchProfesores(filters);
    if (profesor.length === 0) {
      res.status(404).json({ message: 'No se encontraron resultados' });
    } else {
      res.json(profesor); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar los profesores' });
  }
});


router.get('/departamentos', async (req, res) => {
  try {
    const departamento = await profesoresService.getAllDepartamentos();
    res.json(departamento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los departamentos' });
  }
});

module.exports = router;



