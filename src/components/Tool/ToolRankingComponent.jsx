import React, { useEffect, useState } from "react";
import { listMostLoanedToolsByDateRange, listMostLoanedTools } from "../../services/LoanService";

const ToolRankingComponent = () => {
  const [tools, setTools] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (startDate && endDate) {
      listMostLoanedToolsByDateRange(startDate, endDate)
        .then((res) => setTools(res.data))
        .catch((err) => console.error("Error al filtrar ranking:", err));
    }
  };

  useEffect(() => {
  listMostLoanedTools()
    .then((res) => setTools(res.data))
    .catch((err) => console.error("Error al cargar ranking:", err));
  }, []);


  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-trophy me-2"></i>
            Ranking de Herramientas Más Prestadas
          </h2>
          <p className="text-muted mb-0">Consulta las herramientas más populares y solicitadas</p>
        </div>
        <div className="text-end">
          <span className="badge bg-warning fs-6 px-3 py-2">
            {tools.length} herramienta{tools.length !== 1 ? 's' : ''} en ranking
          </span>
        </div>
      </div>

      {/* Filtros de fecha */}
      <div className="card card-custom mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Fecha Inicio:</label>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="form-control form-control-custom" 
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Fecha Fin:</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="form-control form-control-custom" 
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button onClick={handleFilter} className="btn btn-accent w-100">
                    <i className="fas fa-filter me-1"></i>
                    Filtrar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <small className="text-muted">
                {startDate && endDate ? 'Filtrado por rango de fechas' : 'Mostrando ranking general'}
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
                <th>#</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Total Préstamos</th>
              </tr>
            </thead>
            <tbody>
              {tools.length > 0 ? tools.map((t, i) => (
                <tr key={i}>
                  <td>
                    <span className={`badge ${i === 0 ? 'bg-warning' : i === 1 ? 'bg-secondary' : i === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </span>
                  </td>
                  <td className="fw-semibold">{t.toolName}</td>
                  <td>{t.category}</td>
                  <td>
                    <span className="badge bg-primary fs-6">
                      {t.totalLoans} préstamo{t.totalLoans !== 1 ? 's' : ''}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-chart-bar fa-3x mb-3 d-block"></i>
                      <h5>Sin datos de ranking</h5>
                      <p className="mb-0">No hay información suficiente para generar el ranking</p>
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

export default ToolRankingComponent;
