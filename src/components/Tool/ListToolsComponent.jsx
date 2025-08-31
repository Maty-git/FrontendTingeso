import React, {useEffect, useState} from 'react'
import { listTools } from '../../services/ToolService'
import { useNavigate } from 'react-router-dom';

const ListToolsComponent = () => {

    const [tools, setTools] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        listTools().then((response) => {    
            setTools(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    function navigateToCreateTool() {
        navigate('/create-tool');
    }

    function navigateToManageWarehouse() {
        navigate('/delete-tool');
    }

    function renderState(state) {
    switch (state) {
        case 'AVAILABLE':
            return <span className="badge bg-success">DISPONIBLE</span>;
        case 'LOANED':
            return <span className="badge bg-primary">ARRENDADA</span>;
        case 'UNDER_REPAIR':
            return <span className="badge bg-warning text-white">EN MANTENIMIENTO</span>;
        case 'OUT_OF_SERVICE':
            return <span className="badge bg-danger">BAJA</span>;
        default:
            return <span>{state}</span>;
        }
                    }

    function renderCategory(category) {
    switch (category) {
        case 'MANUAL':
            return 'Manual';
        case 'ELECTRICAL':
            return 'Eléctrica';
        case 'CONSTRUCTION':
            return 'Construcción';
        case 'CUTTING':
            return 'Corte';
        case 'CARPENTRY':
            return 'Carpintería';
        case 'WELDING':
            return 'Soldadura';
        case 'GARDENING':
            return 'Jardinería';
        case 'MEASUREMENT':
            return 'Medición';
        case 'SCAFFOLDING':
            return 'Andamios';
        case 'MACHINERY':
            return 'Maquinaria';
        case 'SAFETY':
            return 'Seguridad';
        case 'ACCESSORIES':
            return 'Accesorios';
        default:
            return category;
        }
    }
    return (
<div className="container" style={{ marginTop: '60px' }}>
        <h2>Lista de Herramientas</h2>
        <button className="btn btn-primary mb-2" onClick={navigateToCreateTool}>Agregar Herramienta</button>
        <button className="btn btn-primary mb-2" onClick={navigateToManageWarehouse} style={{ marginLeft: '10px'}}>Administrar Bodega</button>
        <table className="table table-dark table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Estado</th>
                    <th>Valor De Arriendo</th>
                    <th>Valor Multa</th>
                    <th>Valor Reposicion</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {tools.map((tool, index) => (
                    <tr key={index}>
                        <td>{tool.name}</td>
                        <td>{renderCategory(tool.category)}</td>
                        <td>{renderState(tool.state)}</td>
                        <td>{tool.rentDailyRate}</td>
                        <td>{tool.lateFee}</td>
                        <td>{tool.replacementValue}</td>
                        <td>{tool.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )
}

export default ListToolsComponent