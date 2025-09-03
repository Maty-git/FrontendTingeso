import React, { useEffect, useState } from 'react'
import { allLoans } from '../../services/LoanService'
import { all } from 'axios';

const ReturnLoanComponent = () => {

    const [loans, setLoans] = React.useState([]);
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        allLoans().then((response) => {
            setLoans(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.error('Error al listar préstamos:', error);
        });
    }, []);

    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    let results = []
    if(!search){
        results = loans
    } else {
        results = loans.filter((dato) =>
            dato.client.rut.toLowerCase().includes(search.toLowerCase())
        )
    }

    const formatDateTime = (isoString) => {
        if (!isoString) return "—"; // si viene null
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center mb-3">Devolución de Préstamos</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Busqueda por Rut' className='form-control' />
            <table className="table table-bordered" style={{ marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>Rut del Cliente</th>
                        <th>Herramienta</th>
                        <th>Fecha de Préstamo</th>
                        <th>Fecha de Retorno Pactada</th>
                        <th>Estado</th>
                        <th>Costo por Retraso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {results.map((loan) => (
                    <tr key={loan.id}>
                    <td>{loan.client.name}</td> 
                    <td>{loan.client.rut}</td> 
                    <td>{loan.tool.name}</td>  
                    <td>{formatDateTime(loan.deliveryDate)}</td> 
                    <td>{formatDateTime(loan.returnDateExpected)}</td>   
                    <td>{loan.status}</td>      
                    <td>{loan.repairCost}</td>  
                    <td>
                        <button className="btn btn-primary btn-sm">Devolver</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReturnLoanComponent