const db = require('./db');  
const helper = require('../helper');
const config = require('../config');


async function getGrados() {
    try {
      const [rows] = await db.query('SELECT * FROM grado');
      return rows;
    } catch (error) {
      console.error('Error al obtener los grados:', error);
      throw error;
    }
  }
  

  async function getAsignaturasPorGrado(gradoId) {
    try {
      const [rows] = await db.query(`
        SELECT a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre, p.nombre AS profesor 
        FROM asignatura a
        LEFT JOIN profesor p ON a.id_profesor = p.id
        WHERE a.id_grado = ?
        ORDER BY a.curso, a.cuatrimestre, a.id`, [gradoId]);
      
      return rows;
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
      throw error;
    }
  }
  
  module.exports = {
    getGrados,
    getAsignaturasPorGrado
  };