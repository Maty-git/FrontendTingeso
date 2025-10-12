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
    <div className="container mt-3">
      <h2 className="text-center mb-3">Deudas pendientes</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
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
          {debts.map((debt) => (
            <tr key={debt.id}>
              <td>{debt.id}</td>
              <td>${debt.amount}</td>
              <td>{debt.type}</td>
              <td>{debt.clientName}</td>
              <td>{debt.clientRut}</td>
              <td>{debt.toolName}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handlePay(debt)}
                >
                  Pagar deuda
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DebtListComponent;
