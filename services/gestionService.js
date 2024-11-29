const db = require('./db');  
const helper = require('../helper');
const config = require('../config');

async function matricularAlumno(alumnoId, gradoId, cursoId, asignaturas) {
    try {
      const matriculaciones = [];
  
      
      for (const asignaturaId of asignaturas) {
        const query = `
          INSERT INTO alumno_se_matricula_asignatura (id_alumno, id_asignatura, id_curso_escolar)
          VALUES (?, ?, ?)
        `;
  
        matriculaciones.push(db.query(query, [alumnoId, asignaturaId, cursoId]));
      }
  
      await Promise.all(matriculaciones);
  
      return matriculaciones.length;
    } catch (error) {
      throw new Error('Error al matricular las asignaturas: ' + error.message);
    }
  }
  
  module.exports = {
    matricularAlumno,
  };
