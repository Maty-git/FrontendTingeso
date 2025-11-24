import React, { useEffect, useState } from "react";
import { listUnpaidDebts, payDebt } from "../../services/DebtService";

function DebtListComponent() {
  const [debts, setDebts] = useState([]);

  const fetchDebts = () => {
    listUnpaidDebts()
      .then((res) => setDebts(res.data))
      .catch((err) => console.error("Error al cargar deudas:", err));
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  const handlePay = (debt) => {
    if (window.confirm(`¿Está seguro de pagar la deuda ID ${debt.id} por $${debt.amount}?`)) {
      payDebt(debt.id)
        .then(() => {
          alert("✅ Deuda pagada correctamente");
          fetchDebts();
        })
        .catch((err) => {
          console.error("❌ Error al pagar deuda:", err);
          alert("Ocurrió un error al pagar la deuda");
        });
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Deudas Pendientes
          </h2>
          <p className="text-muted mb-0">Gestiona las deudas pendientes de pago</p>
        </div>
        <div className="text-end">
          <span className="badge bg-danger fs-6 px-3 py-2">
            {debts.length} deuda{debts.length !== 1 ? 's' : ''} pendiente{debts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="card card-custom">
        <div className="card-body p-0">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Monto</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>RUT Cliente</th>
                <th>Herramienta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {debts.length > 0 ? debts.map((debt) => (
                <tr key={debt.id}>
                  <td>
                    <span className="badge bg-secondary">#{debt.id}</span>
                  </td>
                  <td>
                    <span className="fw-bold text-danger fs-5">
                      ${debt.amount.toLocaleString('es-CL')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-custom ${
                      debt.type === 'LATE_FEE' ? 'bg-warning' : 
                      debt.type === 'REPLACEMENT' ? 'bg-danger' : 'bg-info'
                    }`}>
                      {debt.type === 'LATE_FEE' ? 'Multa por Atraso' : 
                      debt.type === 'REPLACEMENT' ? 'Reposición' : debt.type}
                    </span>
                  </td>
                  <td className="fw-semibold">{debt.clientName}</td>
                  <td className="fw-semibold">{debt.clientRut}</td>
                  <td className="fw-semibold">{debt.toolName}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handlePay(debt)}
                    >
                      <i className="fas fa-credit-card me-1"></i>
                      Pagar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-check-circle fa-3x mb-3 d-block"></i>
                      <h5>¡Excelente!</h5>
                      <p className="mb-0">No hay deudas pendientes en el sistema</p>
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

export default DebtListComponent;
