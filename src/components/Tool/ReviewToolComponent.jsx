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
    <div className="container mt-3">
      <h2 className="text-center mb-3">Herramientas en reparación</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool.id}</td>
              <td>{tool.name}</td>
              <td>{tool.category}</td>
              <td>{tool.state}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAction(tool, "repairWithCost")}
                >
                  Reparar con cobro
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleAction(tool, "repairWithoutCost")}
                >
                  Reparar sin cobro
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleAction(tool, "discard")}
                >
                  Dar de baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewToolComponent;
