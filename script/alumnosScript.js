async function buscarAlumnos() {
    const idOrNif = document.getElementById('idOrNif').value;
    const nombre = document.getElementById('nombre').value;
  
    
    if ((idOrNif && nombre) || (!idOrNif && !nombre)) {
      alert("Por favor, solo ingrese un campo de búsqueda (ID/NIF o Nombre)");
      return;
    }
  
    const queryParams = new URLSearchParams();
    if (idOrNif) {
      queryParams.append('id', idOrNif);
      queryParams.append('nif', idOrNif);
    } else if (nombre) {
      queryParams.append('nombre', nombre);
    }
  
    try {
      const response = await fetch(`/alumnos/buscar?${queryParams.toString()}`);
      const alumnos = await response.json();
      const tableBody = document.getElementById('alumnosTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = ''; 
  
      if (alumnos.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        document.getElementById('asignaturasContainer').style.display = 'none';  
      } else {
        document.getElementById('noResults').style.display = 'none';  
        alumnos.forEach(alumno => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${alumno.id}</td>
            <td>${alumno.nif}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido1}</td>
            <td>${alumno.apellido2}</td>
            <td>${alumno.ciudad}</td>
            <td>${alumno.sexo}</td>
            <td><button onclick="verAsignaturas(${alumno.id})">Ver Asignaturas</button></td>
          `;
        });
      }
    } catch (error) {
      console.error('Error al buscar los alumnos:', error);
    }
  }
  
  
  async function verAsignaturas(alumnoId) {
    try {
      const response = await fetch(`/alumnos/${alumnoId}/asignaturas`);
      const asignaturas = await response.json();
  
      const tableBody = document.getElementById('asignaturasTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = ''; 
      document.getElementById('asignaturasContainer').style.display = 'block'; 
  
      if (asignaturas.length === 0) {
        document.getElementById('noAsignaturas').style.display = 'block';  
      } else {
        document.getElementById('noAsignaturas').style.display = 'none'; 
        asignaturas.forEach(asignatura => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${asignatura.id}</td>
            <td>${asignatura.nombre}</td>
            <td>${asignatura.creditos}</td>
            <td>${asignatura.curso}</td>
            <td>${asignatura.cuatrimestre}</td>
          `;
        });
      }
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
    }
  }