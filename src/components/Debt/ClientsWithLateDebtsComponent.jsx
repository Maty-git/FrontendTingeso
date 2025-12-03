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
    (c) => {
      const normalizedSearch = searchTerm.toLowerCase().replace(/[\.\-]/g, '');
      const normalizedRut = c.rut.toLowerCase().replace(/[\.\-]/g, '');
      const normalizedName = c.name.toLowerCase();

      return normalizedName.includes(searchTerm.toLowerCase()) ||
        normalizedRut.includes(normalizedSearch);
    }
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
            <i className="fas fa-user-times me-2"></i>
            Clientes con Deudas Atrasadas
          </h2>
          <p className="text-muted mb-0">Gestiona los clientes que tienen deudas pendientes de pago</p>
        </div>
        <div className="text-end">
          <span className="badge bg-danger fs-6 px-3 py-2">
            {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''} con atrasos
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="card card-custom mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Buscar Cliente:</label>
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="Buscar por nombre o RUT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Filtrar por Fecha:</label>
              <div className="d-flex gap-2">
                <input
                  type="date"
                  className="form-control form-control-custom"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control form-control-custom"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button className="btn btn-accent" onClick={handleFilterByDate}>
                  <i className="fas fa-filter me-1"></i>
                  Filtrar
                </button>
              </div>
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
                    <td>
                      <span className="badge bg-secondary">#{client.id}</span>
                    </td>
                    <td className="fw-semibold">{client.name}</td>
                    <td className="fw-semibold">{client.rut}</td>
                    <td className="text-muted">{client.email}</td>
                    <td>
                      <span className="badge bg-danger">
                        <i className="fas fa-exclamation-triangle me-1"></i>
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <i className="fas fa-check-circle fa-3x mb-3 d-block"></i>
                      <h5>¡Excelente!</h5>
                      <p className="mb-0">
                        {searchTerm || (startDate && endDate)
                          ? 'No se encontraron clientes con atrasos con los filtros aplicados'
                          : 'No hay clientes con deudas atrasadas en el sistema'
                        }
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

export default ClientsWithLateDebtsComponent;
