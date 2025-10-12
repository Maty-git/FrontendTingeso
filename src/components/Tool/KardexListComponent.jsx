import React, { useEffect, useState } from "react";
import { getMovementsByTool, getMovementsByToolAndDateRange } from "../../services/ToolService";
import { useParams } from "react-router-dom";

const KardexListComponent = () => {
  const { toolId } = useParams();
  const [movements, setMovements] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (toolId) {
      getMovementsByTool(toolId)
        .then((res) => setMovements(res.data))
        .catch((err) => console.error("Error al cargar historial:", err));
    }
    console.log(movements)
  }, [toolId]);

  const handleFilter = () => {
    if (startDate && endDate) {
        getMovementsByToolAndDateRange(toolId, startDate, endDate)
        .then((res) => setMovements(res.data))
        .catch((err) => console.error("Error al filtrar por fecha:", err));
        }
    console.log(movements)
    };


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Historial de Movimientos</h2>

      {/* 🔹 Filtro de fechas */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="datetime-local"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleFilter}>
          Filtrar
        </button>
      </div>

      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo Movimiento</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Herramienta</th>
          </tr>
        </thead>
        <tbody>
          {movements.length > 0 ? (
            movements.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.movementType}</td>
                <td>{m.quantity}</td>
                <td>{new Date(m.date).toLocaleString()}</td>
                <td>{m.userRut}</td>
                <td>{m.toolName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay movimientos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KardexListComponent;
