import React, { useState, useEffect } from 'react';
import { Trash2, GraduationCap, UserPlus } from 'lucide-react';
import './App.css'; 

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);

  const cargarEstudiantes = async (page = 1) => {
  try {
    const res = await fetch(
      `http://localhost:5000/estudiante/paginado?page=${page}&limit=20`
    );
    const data = await res.json();
    setEstudiantes(Array.isArray(data) ? data : []);
    setPagina(page);
    if(data.length < 20){
      setHayMas(false);
    }else{
      setHayMas(true);
    }
  } catch (error) {
    console.error("Error cargando estudiantes:", error);
  }

};
  const buscarEstudiantes = async (valor) => {
  setBusqueda(valor);
  if(valor === ""){
    cargarEstudiantes();
    return;
  }
  try{
    const res = await fetch(
      `http://localhost:5000/estudiante/filtro?query=${valor}`
    );
    const data = await res.json();
    setEstudiantes(Array.isArray(data) ? data : []);
  }catch(error){
    console.error("Error en la búsqueda:", error);
  }

};
  const siguientePagina = () => {
    cargarEstudiantes(pagina + 1);
  };
  const anteriorPagina = () => {
    if (pagina > 1) {
      cargarEstudiantes(pagina - 1);
    }
  };

  useEffect(() => {
    cargarEstudiantes(1);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1><GraduationCap /> Panel Estudiantes UQ</h1>
        <button className="btn-nuevo">
          <UserPlus size={16} /> Nuevo Estudiante
        </button>
      </header>
      <div className="table-container">
    <div className="buscador">
  <input
    type="text"
    placeholder="Buscar estudiante por nombre, programa, facultad..."
    value={busqueda}
    onChange={(e) => buscarEstudiantes(e.target.value)}
  />
</div>
        <table className="tabla-estudiantes">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Programa</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Vigencia</th>
              <th>Tipo Hecho</th>
              <th>Modalidad</th>
              <th>Metodología</th>
              <th>Jornada</th>
              <th>Facultad</th>          
              <th>Semestre</th>
            </tr>
          </thead>
          <tbody>
             {(estudiantes || []).map(est => (
              <tr key={est.id}>
                <td>{est.identificacion}</td>
                <td>{est.nombre} {est.apellido}</td>
                <td>{est.programa}</td>
                <td>{est.correo}</td>
                <td>{est.telefono}</td>
                <td>{est.vigencia}</td>
                <td>{est.tipo_hecho}</td>
                <td>{est.modalidad}</td>
                <td>{est.metodologia}</td>
                <td>{est.jornada}</td>
                <td>{est.facultad}</td>            
                <td>{est.semestre}</td>              
              </tr>
            ))}
          </tbody>
        </table>
        <div className="paginacion">
          <button
            onClick={anteriorPagina}
            disabled={pagina === 1}
          >
            ⬅ Anterior
        </button>
        <span>Página {pagina}</span>
          <button
            onClick={siguientePagina}
            disabled={!hayMas}
          >
            Siguiente ➡
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
