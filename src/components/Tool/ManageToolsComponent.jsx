import React, { useEffect, useState } from "react";
import { listTools } from "../../services/ToolService";
import { useNavigate } from 'react-router-dom';

const ManageToolsComponent = () => {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    listTools()
      .then((response) => {
        setTools(response.data);
      })
      .catch((error) => {
        console.error("Error al listar herramientas:", error);
      });
  }, []);

  function renderState(state) {
    switch (state) {
      case "AVAILABLE":
        return <span className="badge bg-success">DISPONIBLE</span>;
      case "LOANED":
        return <span className="badge bg-primary">ARRENDADA</span>;
      case "UNDER_REPAIR":
        return <span className="badge bg-warning text-white">EN MANTENIMIENTO</span>;
      case "OUT_OF_SERVICE":
        return <span className="badge bg-danger">BAJA</span>;
      default:
        return <span>{state}</span>;
    }
  }

  function renderCategory(category) {
    switch (category) {
      case "MANUAL":
        return "Manual";
      case "ELECTRICAL":
        return "Eléctrica";
      case "CONSTRUCTION":
        return "Construcción";
      case "CUTTING":
        return "Corte";
      case "CARPENTRY":
        return "Carpintería";
      case "WELDING":
        return "Soldadura";
      case "GARDENING":
        return "Jardinería";
      case "MEASUREMENT":
        return "Medición";
      case "SCAFFOLDING":
        return "Andamios";
      case "MACHINERY":
        return "Maquinaria";
      case "SAFETY":
        return "Seguridad";
      case "ACCESSORIES":
        return "Accesorios";
      default:
        return category;
    }
  }

  // Handlers de acciones (sin lógica real aún)
  const handleUpdate = (tool) => {
    navigate(`/update-tool/${tool.name}/${tool.category}`);
  };

  const handleDelete = (tool) => {
    if (window.confirm(`¿Seguro que deseas eliminar la herramienta "${tool.name}" (ID: ${tool.id})?`)) {
      alert(`Eliminar herramienta: ${tool.name} (ID: ${tool.id})`);
      // 🔹 Aquí se llamará luego al backend
    }
  };

  // 🔍 Filtrar por nombre
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <h2>Administrar Herramientas</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar herramienta por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-dark table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Valor Arriendo</th>
            <th>Valor Multa</th>
            <th>Valor Reposición</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <tr key={index}>
                <td>{tool.name}</td>
                <td>{renderCategory(tool.category)}</td>
                <td>{renderState(tool.state)}</td>
                <td>{tool.rentDailyRate}</td>
                <td>{tool.lateFee}</td>
                <td>{tool.replacementValue}</td>
                <td>{tool.count}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(tool)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(tool)}
                  >
                    Eliminar
                  </button>
              
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No se encontraron herramientas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageToolsComponent;
