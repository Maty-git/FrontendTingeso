import React, { useEffect, useState } from "react";
import {
  listToolsForRepair,
  deleteTool,
  repairTool,
  repairToolNoDebt,
} from "../../services/ToolService";
import { useKeycloak } from "@react-keycloak/web"; // 🔹 si usas Keycloak

function ReviewToolComponent() {
  const [tools, setTools] = useState([]);
  const { keycloak } = useKeycloak(); // 🔹 para sacar rut del usuario
  const rutUser = keycloak?.tokenParsed?.rut || "admin"; // fallback si no hay sesión

  const fetchTools = () => {
    listToolsForRepair()
      .then((res) => {
        setTools(res.data);
      })
      .catch((err) => console.error("Error al cargar herramientas:", err));
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleAction = (tool, action) => {
    let message = "";
    let serviceCall;

    switch (action) {
      case "repairWithCost":
        message = `¿Está seguro de marcar la herramienta "${tool.name}" (ID: ${tool.id}) como reparada con cobro?`;
        serviceCall = () => repairTool(tool.id, rutUser);
        break;
      case "repairWithoutCost":
        message = `¿Está seguro de marcar la herramienta "${tool.name}" (ID: ${tool.id}) como reparada sin cobro?`;
        serviceCall = () => repairToolNoDebt(tool.id, rutUser);
        break;
      case "discard":
        message = `¿Está seguro de dar de baja la herramienta "${tool.name}" (ID: ${tool.id})?`;
        serviceCall = () => deleteTool(tool.id, rutUser);
        break;
      default:
        return;
    }

    if (window.confirm(message)) {
      serviceCall()
        .then(() => {
          alert("✅ Acción realizada correctamente");
          fetchTools(); // 🔹 refrescar lista
        })
        .catch((err) => {
          console.error("❌ Error en la acción:", err);
          alert("⚠️ Ocurrió un error, revise la consola.");
        });
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-wrench me-2"></i>
            Herramientas en Reparación
          </h2>
          <p className="text-muted mb-0">Gestiona las herramientas que requieren revisión y reparación</p>
        </div>
        <div className="text-end">
          <span className="badge bg-warning fs-6 px-3 py-2">
            {tools.length} herramienta{tools.length !== 1 ? 's' : ''} en reparación
          </span>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tools.length > 0 ? tools.map((tool) => (
                <tr key={tool.id}>
                  <td>
                    <span className="badge bg-secondary">#{tool.id}</span>
                  </td>
                  <td className="fw-semibold">{tool.name}</td>
                  <td>{tool.category}</td>
                  <td>
                    <span className="badge bg-warning">EN REPARACIÓN</span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAction(tool, "repairWithCost")}
                        title="Reparar con cobro al cliente"
                      >
                        <i className="fas fa-tools me-1"></i>
                        Con Cobro
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleAction(tool, "repairWithoutCost")}
                        title="Reparar sin cobro al cliente"
                      >
                        <i className="fas fa-wrench me-1"></i>
                        Sin Cobro
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleAction(tool, "discard")}
                        title="Dar de baja la herramienta"
                      >
                        <i className="fas fa-trash me-1"></i>
                        Dar de Baja
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-check-circle fa-3x mb-3 d-block"></i>
                      <h5>¡Excelente!</h5>
                      <p className="mb-0">No hay herramientas en reparación en este momento</p>
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
}

export default ReviewToolComponent;
