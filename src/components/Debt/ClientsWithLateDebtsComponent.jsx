import React, { useEffect, useState } from "react";
import { listClientsWithLateDebts, listClientsWithLateDebtsByDateRange } from "../../services/DebtService";

const ClientsWithLateDebtsComponent = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    listClientsWithLateDebts()
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Error al cargar clientes con atrasos:", err));
  }, []);

  const handleFilterByDate = () => {
    if (startDate && endDate) {
      listClientsWithLateDebtsByDateRange(startDate, endDate)
        .then((res) => setClients(res.data))
        .catch((err) => console.error("Error al filtrar por fecha:", err));
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Clientes con Deudas Atrasadas</h2>

      {/* 🔍 Búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o RUT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📅 Filtro por rango de fechas */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleFilterByDate}>
          Filtrar por fecha
        </button>
      </div>

      {/* 🧾 Tabla de clientes */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.rut}</td>
                <td>{client.email}</td>
                <td>{client.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay clientes con atrasos en ese rango de fechas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsWithLateDebtsComponent;
