import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTools } from "../../services/ToolService";

const ToolListWithHistoryComponent = () => {
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

  // 🔍 Filtrar herramientas por nombre o categoría
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase())
  );

  // 🏷️ Render de estado y categoría (como ya hiciste en otros componentes)
  const renderState = (state) => {
    switch (state) {
      case "AVAILABLE":
        return <span className="badge bg-success">DISPONIBLE</span>;
      case "LOANED":
        return <span className="badge bg-primary">ARRENDADA</span>;
      case "UNDER_REPAIR":
        return <span className="badge bg-warning text-white">EN MANTENIMIENTO</span>;
      case "OUT_OF_SERVICE":
        return <span className="badge bg-danger">FUERA DE SERVICIO</span>;
      default:
        return state;
    }
  };

  const renderCategory = (category) => {
    const map = {
      MANUAL: "Manual",
      ELECTRICAL: "Eléctrica",
      CONSTRUCTION: "Construcción",
      CUTTING: "Corte",
      CARPENTRY: "Carpintería",
      WELDING: "Soldadura",
      GARDENING: "Jardinería",
      MEASUREMENT: "Medición",
      SCAFFOLDING: "Andamios",
      MACHINERY: "Maquinaria",
      SAFETY: "Seguridad",
      ACCESSORIES: "Accesorios",
    };
    return map[category] || category;
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-history me-2"></i>
            Historial de Herramientas
          </h2>
          <p className="text-muted mb-0">Consulta el historial de movimientos de todas las herramientas</p>
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
                placeholder="Buscar por nombre o categoría..."
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
                <th>Costo Reparación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <tr key={tool.id}>
                    <td>
                      <span className="badge bg-secondary">#{tool.id}</span>
                    </td>
                    <td className="fw-semibold">{tool.name}</td>
                    <td>{renderCategory(tool.category)}</td>
                    <td>{renderState(tool.state)}</td>
                    <td>${tool.rentDailyRate?.toLocaleString('es-CL') || '0'}</td>
                    <td>${tool.lateFee?.toLocaleString('es-CL') || '0'}</td>
                    <td>${tool.replacementValue?.toLocaleString('es-CL') || '0'}</td>
                    <td>${tool.repairCost?.toLocaleString('es-CL') || '0'}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => navigate(`/kardex/${tool.id}`)}
                        title="Ver historial de movimientos"
                      >
                        <i className="fas fa-history me-1"></i>
                        Ver Historial
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
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

export default ToolListWithHistoryComponent;
