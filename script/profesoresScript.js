document.addEventListener('DOMContentLoaded', async () => {
    try {
      const departamentosResponse = await fetch('/profesores/departamentos');
      const departamentos = await departamentosResponse.json();
      const departamentoSelect = document.getElementById('departamento');
  
      departamentos.forEach(departamento => {
        const option = document.createElement('option');
        option.value = departamento.id;
        option.textContent = departamento.nombre;
        departamentoSelect.appendChild(option);
      });
  
      
      buscarProfesores();
    } catch (error) {
      console.error('Error al cargar los departamentos:', error);
    }
  });
  
  
  async function buscarProfesores() {
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const sexo = document.getElementById('sexo').value;
    const departamento = document.getElementById('departamento').value;
  
    const queryParams = new URLSearchParams({
      nombre,
      apellido1,
      sexo,
      departamento
    }).toString();
  
    try {
      const response = await fetch(`/profesores/buscar?${queryParams}`);
      const profesores = await response.json();
  
      const tableBody = document.getElementById('profesoresTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';  
  
      if (profesores.length === 0) {
        document.getElementById('noResults').style.display = 'block';  
      } else {
        document.getElementById('noResults').style.display = 'none';  
        profesores.forEach(profesor => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${profesor.nif}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.apellido1}</td>
            <td>${profesor.apellido2}</td>
            <td>${profesor.ciudad}</td>
            <td>${profesor.sexo}</td>
            <td>${profesor.nombre_departamento}</td>
          `;
        });
      }
    } catch (error) {
      console.error('Error al buscar los profesores:', error);
    }
  }