import React, { useEffect, useState } from 'react';
import { allLoans } from '../../services/LoanService';

const LoanListComponent = () => {
    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState('');

    // 🔹 Cargar los préstamos al montar el componente
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

    // 🔹 Barra de búsqueda: filtrar por clientRut
    const searcher = (e) => {
        setSearch(e.target.value);
    };

    // 🔹 Aplicar filtro
    const results = !search
        ? loans
        : loans.filter((loan) =>
            loan.clientRut.toLowerCase().includes(search.toLowerCase())
        );

    // 🔹 Formatear fecha
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
        <div className="container mt-3">
        <h2 className="text-center mb-3">Listado de Préstamos</h2>

        {/* 🔹 Barra de búsqueda */}
        <input
            type="text"
            value={search}
            onChange={searcher}
            placeholder="Buscar por RUT de cliente"
            className="form-control mb-3"
        />

        {/* 🔹 Tabla */}
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
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
            {results.map((loan) => (
                <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.clientRut}</td>
                <td>{loan.clientName}</td>
                <td>{loan.toolName}</td>
                <td>{formatDateTime(loan.deliveryDate)}</td>
                <td>{formatDateTime(loan.returnDateExpected)}</td>
                <td>{loan.userRut}</td>
                <td>
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleReturn(loan.id)}
                    >
                    Confirmar devolución
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default LoanListComponent;
