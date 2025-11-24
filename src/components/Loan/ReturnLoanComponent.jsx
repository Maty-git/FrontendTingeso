import React, { useEffect, useState } from 'react';
import { allLoans } from '../../services/LoanService';
import { useNavigate } from 'react-router-dom'; // 🔹 IMPORTA useNavigate

const LoanListComponent = () => {
    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // 🔹 DEFINIR navigate

    useEffect(() => {
        allLoans()
            .then((response) => {
                setLoans(response.data);
                console.log("Préstamos:", response.data);
            })
            .catch((error) => {
                console.error('Error al listar préstamos:', error);
            });
    }, []);

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    const results = !search
        ? loans
        : loans.filter((loan) =>
            loan.clientRut.toLowerCase().includes(search.toLowerCase())
        );

    const formatDateTime = (isoString) => {
        if (!isoString) return '—';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>
                        <i className="fas fa-undo me-2"></i>
                        Devolución de Préstamos
                    </h2>
                    <p className="text-muted mb-0">Gestiona la devolución de herramientas prestadas</p>
                </div>
                <div className="text-end">
                    <span className="badge bg-primary fs-6 px-3 py-2">
                        {results.length} préstamo{results.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="card card-custom mb-4">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <input
                                type="text"
                                value={search}
                                onChange={searcher}
                                placeholder="Buscar por RUT de cliente..."
                                className="form-control form-control-custom"
                            />
                        </div>
                        <div className="col-md-4 text-end">
                            <small className="text-muted">
                                {search ? `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}` : 'Mostrando todos los préstamos'}
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
                            <th>RUT Cliente</th>
                            <th>Nombre Cliente</th>
                            <th>Herramienta</th>
                            <th>Fecha de Préstamo</th>
                            <th>Fecha de Retorno Pactada</th>
                            <th>RUT del Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? results.map((loan) => (
                            <tr key={loan.id}>
                                <td>
                                    <span className="badge bg-secondary">#{loan.id}</span>
                                </td>
                                <td className="fw-semibold">{loan.clientRut}</td>
                                <td className="fw-semibold">{loan.clientName}</td>
                                <td className="fw-semibold">{loan.toolName}</td>
                                <td className="text-muted">{formatDateTime(loan.deliveryDate)}</td>
                                <td className="text-muted">{formatDateTime(loan.returnDateExpected)}</td>
                                <td className="text-muted">{loan.userRut}</td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => navigate(`/return-loan/${loan.id}`)}
                                        title="Procesar devolución de herramienta"
                                    >
                                        <i className="fas fa-check me-1"></i>
                                        Confirmar Devolución
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center py-5">
                                    <div className="text-muted">
                                        <i className="fas fa-search fa-3x mb-3 d-block"></i>
                                        <h5>No se encontraron préstamos</h5>
                                        <p className="mb-0">
                                            {search ? 'Intenta con otros términos de búsqueda' : 'No hay préstamos registrados en el sistema'}
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

export default LoanListComponent;
