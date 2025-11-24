import React, { useEffect, useState } from "react";
import { listActiveLoans, listActiveLoansByDateRange } from "../../services/LoanService";

const ActiveLoansComponent = () => {
  const [loans, setLoans] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    listActiveLoans()
      .then((res) => setLoans(res.data))
      .catch((err) => console.error("Error cargando préstamos:", err));
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      listActiveLoansByDateRange(startDate, endDate)
        .then((res) => setLoans(res.data))
        .catch((err) => console.error("Error filtrando:", err));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-clipboard-list me-2"></i>
            Préstamos Activos
          </h2>
          <p className="text-muted mb-0">Monitorea los préstamos activos y su estado de cumplimiento</p>
        </div>
        <div className="text-end">
          <span className="badge bg-primary fs-6 px-3 py-2">
            {loans.length} préstamo{loans.length !== 1 ? 's' : ''} activo{loans.length !== 1 ? 's' : ''}
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
                {startDate && endDate ? 'Filtrado por rango de fechas' : 'Mostrando todos los préstamos activos'}
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
                <th>Cliente</th>
                <th>RUT</th>
                <th>Herramienta</th>
                <th>Entrega</th>
                <th>Devolución Esperada</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? loans.map((loan) => (
                <tr key={loan.id}>
                  <td>
                    <span className="badge bg-secondary">#{loan.id}</span>
                  </td>
                  <td className="fw-semibold">{loan.clientName}</td>
                  <td className="fw-semibold">{loan.clientRut}</td>
                  <td className="fw-semibold">{loan.toolName}</td>
                  <td className="text-muted">{new Date(loan.deliveryDate).toLocaleDateString()}</td>
                  <td className="text-muted">{new Date(loan.returnDateExpected).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-custom ${loan.status === "ATRASADO" ? "bg-danger" : "bg-success"}`}>
                      <i className={`fas ${loan.status === "ATRASADO" ? "fa-exclamation-triangle" : "fa-check-circle"} me-1`}></i>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-clipboard-list fa-3x mb-3 d-block"></i>
                      <h5>No hay préstamos activos</h5>
                      <p className="mb-0">No se encontraron préstamos en el rango de fechas seleccionado</p>
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

export default ActiveLoansComponent;
