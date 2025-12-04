import React, { useEffect, useState } from "react";
import { getTools, deleteTool } from "../../services/ToolService";
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const ManageToolsComponent = () => {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getTools()
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

  // Obtener RUT del usuario desde Keycloak
  const { keycloak } = useKeycloak();
  const rutUser = keycloak?.tokenParsed?.rut;

  // Handlers de acciones
  const handleUpdate = (tool) => {
    navigate(`/update-tool/${tool.name}/${tool.category}`);
  };

  const handleDelete = (tool) => {
    if (!rutUser) {
      alert("Error: No se pudo identificar al usuario (RUT no encontrado).");
      return;
    }

    if (window.confirm(`¿Seguro que deseas eliminar la herramienta "${tool.name}" (ID: ${tool.id})?`)) {
      deleteTool(tool.id, rutUser)
        .then(() => {
          alert("Herramienta eliminada correctamente.");
          // Actualizar la lista
          setTools(tools.filter((t) => t.id !== tool.id));
        })
        .catch((error) => {
          console.error("Error al eliminar herramienta:", error);
          alert("Ocurrió un error al intentar eliminar la herramienta.");
        });
    }
  };

  // 🔍 Filtrar por nombre
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-cogs me-2"></i>
            Administrar Herramientas
          </h2>
          <p className="text-muted mb-0">Gestiona el inventario y configuración de herramientas</p>
        </div>
        <div className="text-end">
          <span className="badge bg-primary fs-6 px-3 py-2">
            {filteredTools.length} herramienta{filteredTools.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="card card-custom mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="Buscar herramienta por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4 text-end">
              <small className="text-muted">
                {search ? `${filteredTools.length} resultado${filteredTools.length !== 1 ? 's' : ''} encontrado${filteredTools.length !== 1 ? 's' : ''}` : 'Mostrando todas las herramientas'}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-custom">
        <div className="card-body p-0">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Valor Arriendo</th>
                <th>Valor Multa</th>
                <th>Valor Reposición</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => (
                  <tr key={tool.id}>
                    <td><span className="badge bg-secondary">#{tool.id}</span></td>
                    <td className="fw-semibold">{tool.name}</td>
                    <td>{renderCategory(tool.category)}</td>
                    <td>{renderState(tool.state)}</td>
                    <td>${tool.rentDailyRate?.toLocaleString('es-CL') || '0'}</td>
                    <td>${tool.lateFee?.toLocaleString('es-CL') || '0'}</td>
                    <td>${tool.replacementValue?.toLocaleString('es-CL') || '0'}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleUpdate(tool)}
                          title="Actualizar herramienta"
                        >
                          <i className="fas fa-edit me-1"></i>
                          Actualizar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(tool)}
                          title="Eliminar herramienta"
                        >
                          <i className="fas fa-trash me-1"></i>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-search fa-3x mb-3 d-block"></i>
                      <h5>No se encontraron herramientas</h5>
                      <p className="mb-0">
                        {search ? 'Intenta con otros términos de búsqueda' : 'No hay herramientas registradas en el sistema'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageToolsComponent;
