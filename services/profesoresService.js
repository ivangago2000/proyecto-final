const db = require('./db');  
const helper = require('../helper');
const config = require('../config');


async function getAllProfesores(page = 1) {
  try {
    const rows = await db.query("SELECT * FROM profesor");
    console.log("Fetched rows:", rows);  // Depuración
    const data = rows || []; // Asegúrate de que data es un array
    const meta = { page };

    return {
      data,
      meta,
    };
  } catch (error) {
    console.error("Error fetching profesores from DB:", error.message);
    throw error;
  }
}




async function searchProfesores(filters) {
  const { nombre, apellido1, sexo, departamento } = filters;
  
  let query = `
    SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.departamento AS nombre_departamento
    FROM profesor p
    JOIN departamento d ON p.id_departamento = d.id
    WHERE 1=1
  `;
  
  const params = [];

  if (nombre) {
    query += ' AND p.nombre LIKE ?';
    params.push(`%${nombre}%`);
  }
  if (apellido1) {
    query += ' AND p.apellido1 LIKE ?';
    params.push(`%${apellido1}%`);
  }
  if (sexo) {
    query += ' AND p.sexo = ?';
    params.push(sexo);
  }
  if (departamento) {
    query += ' AND d.id = ?';
    params.push(departamento);
  }

  const [rows] = await pool.execute(query, params);
  return rows;
}


async function getAllDepartamentos() {
  const [rows] = await pool.execute('SELECT id, nombre FROM departamento');
  return rows;
}

module.exports = {
  getAllProfesores,
  searchProfesores,
  getAllDepartamentos,
};

