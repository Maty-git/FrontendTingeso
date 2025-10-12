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
    <div className="container mt-4">
      <h2>Préstamos Activos</h2>

      <div className="d-flex gap-2 mb-3">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
        <button onClick={handleFilter} className="btn btn-primary">Filtrar</button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
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
              <td>{loan.id}</td>
              <td>{loan.clientName}</td>
              <td>{loan.clientRut}</td>
              <td>{loan.toolName}</td>
              <td>{new Date(loan.deliveryDate).toLocaleDateString()}</td>
              <td>{new Date(loan.returnDateExpected).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${loan.status === "ATRASADO" ? "bg-danger" : "bg-success"}`}>
                  {loan.status}
                </span>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="7" className="text-center">No hay préstamos</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveLoansComponent;
