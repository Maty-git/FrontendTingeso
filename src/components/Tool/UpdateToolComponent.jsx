import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateTool, getToolByNameAndCategory } from "../../services/ToolService";
import { useKeycloak } from "@react-keycloak/web";

const UpdateToolComponent = () => {
  const { name, category } = useParams();
  const { keycloak } = useKeycloak();
  const rutUser = keycloak?.tokenParsed?.rut;
  const navigate = useNavigate();

  const [tool, setTool] = useState(); // inicial como null

  // 1. Cargar herramienta
  useEffect(() => {
    getToolByNameAndCategory(name, category)
      .then((res) => {
        setTool(res.data);
      })
      .catch((err) => console.error("Error cargando herramienta:", err));
  }, [name, category]);

  // 2. Guardar cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTool(tool.id, rutUser, tool) // usamos el id real de la tool
      .then(() => {
        alert("Herramientas actualizadas correctamente ✅");
        navigate("/manage-tools");
      })
      .catch((err) => {
        console.error("Error actualizando herramienta:", err);
        alert("Error al actualizar ❌");
      });
  };

  // ⚠️ Mientras no cargue la tool mostramos loading
  if (!tool) {
    return <p className="text-center mt-4">Cargando herramienta...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Actualizar Herramienta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={tool.name}
            onChange={(e) => setTool({ ...tool, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Categoría</label>
          <select
            className="form-control"
            name="category"
            value={tool.category}
            onChange={(e) => setTool({ ...tool, category: e.target.value })}
          >
            <option value="MANUAL">Manual</option>
            <option value="ELECTRICAL">Eléctrica</option>
            <option value="CONSTRUCTION">Construcción</option>
            <option value="CUTTING">Corte</option>
            <option value="CARPENTRY">Carpintería</option>
            <option value="WELDING">Soldadura</option>
            <option value="GARDENING">Jardinería</option>
            <option value="MEASUREMENT">Medición</option>
            <option value="SCAFFOLDING">Andamios</option>
            <option value="MACHINERY">Maquinaria</option>
            <option value="SAFETY">Seguridad</option>
            <option value="ACCESSORIES">Accesorios</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Estado</label>
          <select
            className="form-control"
            name="state"
            value={tool.state}
            onChange={(e) => setTool({ ...tool, state: e.target.value })}
          >
            <option value="AVAILABLE">Disponible</option>
            <option value="LOANED">Arrendada</option>
            <option value="UNDER_REPAIR">En reparación</option>
            <option value="OUT_OF_SERVICE">Fuera de servicio</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Valor Arriendo</label>
          <input
            type="number"
            className="form-control"
            name="rentDailyRate"
            value={tool.rentDailyRate}
            onChange={(e) => setTool({ ...tool, rentDailyRate: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Valor Multa</label>
          <input
            type="number"
            className="form-control"
            name="lateFee"
            value={tool.lateFee}
            onChange={(e) => setTool({ ...tool, lateFee: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Valor Reposición</label>
          <input
            type="number"
            className="form-control"
            name="replacementValue"
            value={tool.replacementValue}
            onChange={(e) => setTool({ ...tool, replacementValue: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Costo Reparación</label>
          <input
            type="number"
            className="form-control"
            name="repairCost"
            value={tool.repairCost}
            onChange={(e) => setTool({ ...tool, repairCost: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateToolComponent;
