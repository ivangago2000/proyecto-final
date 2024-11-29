document.addEventListener('DOMContentLoaded', async () => {
    await cargarGrados();
});

async function cargarGrados() {
    try {
        const response = await fetch('/grados');
        const grados = await response.json();
        const selectGrado = document.getElementById('grado');
        grados.forEach(grado => {
            const option = document.createElement('option');
            option.value = grado.id;
            option.textContent = grado.nombre;
            selectGrado.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los grados:', error);
    }
}

async function cargarAsignaturas() {
    const selectGrado = document.getElementById('grado');
    const gradoId = selectGrado.value;
    try {
        const response = await fetch(`/grados/${gradoId}/asignaturas`);
        const asignaturas = await response.json();
        const tbody = document.getElementById('tablaAsignaturas').querySelector('tbody');
        tbody.innerHTML = ''; 
        asignaturas.forEach(asignatura => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${asignatura.id}</td>
                <td>${asignatura.nombre}</td>
                <td>${asignatura.creditos}</td>
                <td>${asignatura.curso}</td>
                <td>${asignatura.cuatrimestre}</td>
                <td>${asignatura.nombreProfesor}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar las asignaturas:', error);
    }
}