import React, { useEffect, useState } from 'react';
import { listClients } from '../../services/ClientService';
import { useNavigate } from 'react-router-dom';

const AllClientsComponent = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        listClients()
            .then((response) => {
                // Ensure response.data is an array
                setClients(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error('Error al obtener clientes:', error);
                setClients([]); // Fallback to empty array on error
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = Array.isArray(clients) ? clients.filter((c) => {
        const normalizedSearch = searchTerm.toLowerCase().replace(/[\.\-]/g, '');
        const rut = c.rut || '';
        const name = c.name || '';

        const normalizedRut = rut.toLowerCase().replace(/[\.\-]/g, '');
        const normalizedName = name.toLowerCase();

        return normalizedName.includes(searchTerm.toLowerCase()) ||
            normalizedRut.includes(normalizedSearch);
    }) : [];

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card card-custom">
                        <div className="card-header-custom d-flex justify-content-between align-items-center">
                            <h2 className="h4 mb-0">
                                <i className="fas fa-users me-2"></i>
                                Clientes Registrados
                            </h2>
                            <button className="btn btn-light btn-sm" onClick={() => navigate('/')}>
                                <i className="fas fa-home me-1"></i> Volver al Inicio
                            </button>
                        </div>
                        <div className="card-body p-4">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="fas fa-search text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-start-0 ps-0"
                                            placeholder="Buscar por nombre o RUT..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-custom table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th>RUT</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClients.length > 0 ? (
                                            filteredClients.map((client) => (
                                                <tr key={client.id}>
                                                    <td className="fw-semibold">{client.rut}</td>
                                                    <td>{client.name}</td>
                                                    <td>{client.email}</td>
                                                    <td>{client.phoneNumber}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${client.status === 'ACTIVE'
                                                                ? 'bg-success'
                                                                : 'bg-danger'
                                                                }`}
                                                        >
                                                            {client.status === 'ACTIVE' ? 'Activo' : 'Restringido'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-muted">
                                                    <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                                                    No se encontraron clientes.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllClientsComponent;
