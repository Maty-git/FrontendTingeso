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
    <div className="container mt-4">
      <h2>Listado de Herramientas</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-dark table-bordered table-striped">
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
                <td>{tool.id}</td>
                <td>{tool.name}</td>
                <td>{renderCategory(tool.category)}</td>
                <td>{renderState(tool.state)}</td>
                <td>{tool.rentDailyRate}</td>
                <td>{tool.lateFee}</td>
                <td>{tool.replacementValue}</td>
                <td>{tool.repairCost}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => navigate(`/kardex/${tool.id}`)}
                  >
                    Ver Historial
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No se encontraron herramientas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToolListWithHistoryComponent;
