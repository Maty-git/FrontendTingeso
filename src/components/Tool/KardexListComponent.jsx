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
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-file-alt me-2"></i>
            Kardex de Movimientos
          </h2>
          <p className="text-muted mb-0">Historial detallado de movimientos de la herramienta</p>
        </div>
        <div className="text-end">
          <span className="badge bg-info fs-6 px-3 py-2">
            {movements.length} movimiento{movements.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filtro de fechas */}
      <div className="card card-custom mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Fecha y Hora Inicio:</label>
                  <input
                    type="datetime-local"
                    className="form-control form-control-custom"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Fecha y Hora Fin:</label>
                  <input
                    type="datetime-local"
                    className="form-control form-control-custom"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button className="btn btn-accent w-100" onClick={handleFilter}>
                    <i className="fas fa-filter me-1"></i>
                    Filtrar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <small className="text-muted">
                {startDate && endDate ? 'Filtrado por rango de fechas' : 'Mostrando todos los movimientos'}
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
                <th>Tipo Movimiento</th>
                <th>Cantidad</th>
                <th>Fecha y Hora</th>
                <th>Usuario</th>
                <th>Herramienta</th>
              </tr>
            </thead>
            <tbody>
              {movements.length > 0 ? (
                movements.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <span className="badge bg-secondary">#{m.id}</span>
                    </td>
                    <td>
                      <span className={`badge badge-custom ${
                        m.movementType === 'ENTRY' ? 'bg-success' : 
                        m.movementType === 'EXIT' ? 'bg-danger' : 
                        m.movementType === 'RETURN' ? 'bg-info' : 'bg-warning'
                      }`}>
                        <i className={`fas ${
                          m.movementType === 'ENTRY' ? 'fa-arrow-down' : 
                          m.movementType === 'EXIT' ? 'fa-arrow-up' : 
                          m.movementType === 'RETURN' ? 'fa-undo' : 'fa-exchange-alt'
                        } me-1`}></i>
                        {m.movementType === 'ENTRY' ? 'Entrada' : 
                         m.movementType === 'EXIT' ? 'Salida' : 
                         m.movementType === 'RETURN' ? 'Devolución' : m.movementType}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-primary">{m.quantity}</span>
                    </td>
                    <td className="text-muted">{new Date(m.date).toLocaleString('es-CL')}</td>
                    <td className="fw-semibold">{m.userRut}</td>
                    <td className="fw-semibold">{m.toolName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-clipboard-list fa-3x mb-3 d-block"></i>
                      <h5>No hay movimientos registrados</h5>
                      <p className="mb-0">
                        {startDate && endDate 
                          ? 'No se encontraron movimientos en el rango de fechas seleccionado' 
                          : 'Esta herramienta aún no tiene movimientos registrados'}
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

export default KardexListComponent;
