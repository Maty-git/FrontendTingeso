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
    <div className="container mt-4">
      <h2>Ranking de Herramientas Más Prestadas</h2>

      <div className="d-flex gap-2 mb-3">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
        <button onClick={handleFilter} className="btn btn-primary">Filtrar</button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
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
              <td>{i + 1}</td>
              <td>{t.toolName}</td>
              <td>{t.category}</td>
              <td>{t.totalLoans}</td>
            </tr>
          )) : (
            <tr><td colSpan="4" className="text-center">Sin datos</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToolRankingComponent;
