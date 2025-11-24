import React, {useEffect, useState} from 'react'
import { listTools } from '../../services/ToolService'
import { useNavigate } from 'react-router-dom';
import { getToolStateLabel, getToolCategoryLabel, getStateBadgeColor } from '../../utils/helpers';

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
        navigate('/manage-tool');
    }

    const renderState = (state) => (
        <span className={`badge badge-custom ${getStateBadgeColor(state)}`}>
            {getToolStateLabel(state)}
        </span>
    );

    const renderCategory = (category) => getToolCategoryLabel(category);
    return (
<div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 className="h3 mb-1" style={{ color: 'var(--bs-primary)' }}>Inventario de Herramientas</h2>
                <p className="text-muted mb-0">Gestiona el inventario de herramientas disponibles</p>
            </div>
            <div>
                <button className="btn btn-accent me-2" onClick={navigateToCreateTool}>
                    <i className="fas fa-plus me-2"></i>Agregar Herramienta
                </button>
                <button className="btn btn-outline-primary" onClick={navigateToManageWarehouse}>
                    <i className="fas fa-cogs me-2"></i>Administrar
                </button>
            </div>
        </div>
        <div className="card card-custom">
            <div className="card-body p-0">
                <table className="table table-custom mb-0">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Valor Arriendo</th>
                    <th>Valor Multa</th>
                    <th>Valor Reposición</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {tools.map((tool, index) => (
                    <tr key={index}>
                        <td>{tool.name}</td>
                        <td>{renderCategory(tool.category)}</td>
                        <td>{renderState(tool.state)}</td>
                        <td>${tool.rentDailyRate?.toLocaleString('es-CL') || '0'}</td>
                        <td>${tool.lateFee?.toLocaleString('es-CL') || '0'}</td>
                        <td>${tool.replacementValue?.toLocaleString('es-CL') || '0'}</td>
                        <td>{tool.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </div>
    </div>
    )
}

export default ListToolsComponent