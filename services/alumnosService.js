const db = require('./db');  
const helper = require('../helper');
const config = require('../config');

async function buscarPorIdONif(id, nif) {
    try {
        let query = 'SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE';
        const params = [];

        if (id) {
            query += ' id = ?';
            params.push(id);
        }

        if (nif) {
            query += ' nif = ?';
            params.push(nif);
        }

        const [resultados] = await db.query(query, params);
        return resultados;
    } catch (error) {
        throw new Error('Error al buscar por ID o NIF: ' + error.message);
    }
}


async function buscarPorNombre(nombre) {
    try {
        const query = 'SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE nombre LIKE ?';
        const [resultados] = await db.query(query, [`%${nombre}%`]);
        return resultados;
    } catch (error) {
        throw new Error('Error al buscar por nombre: ' + error.message);
    }
}


async function obtenerAsignaturas(alumnoId) {
    try {
        const query = `
            SELECT a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre 
            FROM asignatura a
            JOIN alumno_se_matricula_asignatura am ON a.id = am.id_asignatura
            WHERE am.id_alumno = ?
        `;
        const [asignaturas] = await db.query(query, [alumnoId]);
        return asignaturas;
    } catch (error) {
        throw new Error('Error al obtener asignaturas: ' + error.message);
    }
}

module.exports = {
    buscarPorIdONif,
    buscarPorNombre,
    obtenerAsignaturas
};