import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../../services/LoanService'
import { getTools } from '../../services/ToolService'
import { useKeycloak } from '@react-keycloak/web'
import { getAllRuts } from '../../services/ClientService';
import { validateRut, formatRut } from "@fdograph/rut-utilities";
import { getToolStateLabel } from '../../utils/helpers';

const CreateLoanComponent = () => {
    // Estados base del formulario
    const [returnDateExpected, setReturnDateExpected] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [clientRut, setClientRut] = useState('')
    const [toolId, setToolId] = useState(0)
    const [price, setPrice] = useState(0)
    const [isValidRut, setIsValidRut] = useState(true)
    const [selectedTool, setSelectedTool] = useState(null)

    // ✅ 1. Estados Pro para alertas (Selenium friendly)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const { keycloak } = useKeycloak();
    const rutUser = keycloak?.tokenParsed?.rut;

    const [tools, setTools] = useState([])
    const [search, setSearch] = useState('')

    const searcher = (e) => setSearch(e.target.value);

    // Filtrado de herramientas según reglas de negocio (Disponible y con Stock) [cite: 28, 50]
    let results = tools.filter(tool => tool.state === 'AVAILABLE');
    if (search) {
        results = results.filter((dato) =>
            dato.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const handleRutChange = (e) => {
        const value = e.target.value;
        setClientRut(value);
        setIsValidRut(validateRut(value));
    };

    const handleRutBlur = () => {
        if (isValidRut) setClientRut(formatRut(clientRut));
    };

    const handleToolSelect = (tool) => {
        setToolId(tool.id);
        setSelectedTool(tool);
        calculatePrice(tool, returnDateExpected, quantity);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setReturnDateExpected(date);
        calculatePrice(selectedTool, date, quantity);
    };

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value);
        setQuantity(qty);
        calculatePrice(selectedTool, returnDateExpected, qty);
    };

    const calculatePrice = (tool, date, qty) => {
        if (tool && date && qty) {
            const [year, month, day] = date.split('-').map(Number);
            const endDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const diffTime = endDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const days = diffDays > 0 ? diffDays : 0;
            const calculatedPrice = tool.rentDailyRate * days * qty;
            setPrice(calculatedPrice > 0 ? calculatedPrice : 0);
        } else {
            setPrice(0);
        }
    };

    const loadInitialData = () => {
        getTools()
            .then((response) => setTools(response.data))
            .catch((error) => console.error('Error al listar herramientas:', error));
    };

    useEffect(() => {
        loadInitialData();
    }, [])

    const saveLoan = async (e) => {
        e.preventDefault();

        // Validaciones preventivas antes del envío [cite: 52]
        if (!validateRut(clientRut)) {
            setAlertMsg("❌ El RUT ingresado no es válido.");
            setShowAlert(true);
            return;
        }

        const [year, month, day] = returnDateExpected.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            setAlertMsg("❌ La fecha de devolución debe ser al menos un día después de hoy.");
            setShowAlert(true);
            return;
        }

        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T20:00:00`;

        const loan = {
            returnDateExpected: formattedDate,
            quantity,
            status: 'ACTIVE',
            clientRut,
            userRut: rutUser,
            toolId,
            price
        };

        // ✅ 2. Lógica del .then actualizada con estados Pro
        createLoan(loan)
            .then((response) => {
                if (response.data === false) {
                    setAlertMsg("❌ Error: Cliente restringido o préstamo duplicado.");
                    setShowAlert(true);
                    return;
                }

                // Notificación de éxito detectada por Selenium 
                setAlertMsg("✅ ¡Préstamo registrado exitosamente!");
                setShowAlert(true);

                // Limpiar campos y refrescar tabla sin recargar página
                setReturnDateExpected('');
                setQuantity(1);
                setClientRut('');
                setToolId(0);
                setPrice(0);
                setSelectedTool(null);
                loadInitialData();

                // Auto-ocultar alerta después de 5 seg para limpiar la UI
                setTimeout(() => setShowAlert(false), 5000);
            })
            .catch((error) => {
                setAlertMsg("❌ Error crítico en el servidor. Intente más tarde.");
                setShowAlert(true);
            });
    }

    return (
        <div className='container-fluid py-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-8'>

                    {/* ✅ 3. Alerta HTML inyectada al principio de la columna */}
                    {showAlert && (
                        <div className="alert alert-info alert-dismissible fade show shadow-sm" role="alert" id="customAlert">
                            <strong>{alertMsg}</strong>
                            <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                        </div>
                    )}

                    <div className='card card-custom shadow-sm'>
                        <div className='card-header bg-primary text-white text-center'>
                            <h2 className='h4 mb-0'>Registrar Nuevo Préstamo</h2>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={saveLoan}>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>Fecha de Devolución:</label>
                                        <input type='date' value={returnDateExpected} className='form-control' onChange={handleDateChange} required />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>Cantidad:</label>
                                        <input type='number' value={quantity} className='form-control' onChange={handleQuantityChange} min="1" required />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>RUT Cliente:</label>
                                        <input id="clientRut" type='text' value={clientRut} className={`form-control ${!isValidRut ? "is-invalid" : ""}`} onChange={handleRutChange} onBlur={handleRutBlur} required />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>Precio Estimado:</label>
                                        <div className="form-control bg-light">${price.toLocaleString('es-CL')}</div>
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className='form-label fw-bold'>ID Herramienta Seleccionada:</label>
                                    <input type='number' value={toolId} className='form-control' readOnly required />
                                </div>
                                <div className='text-center'>
                                    <button id="submitLoan" type='submit' className='btn btn-success btn-lg px-5' disabled={!isValidRut || toolId === 0}>
                                        <i className="fas fa-save me-2"></i> Guardar Préstamo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tabla de selección de herramientas [cite: 21] */}
            <div className="mt-4 card card-custom shadow-sm">
                <div className="card-body">
                    <input value={search} onChange={searcher} type="text" placeholder='🔍 Filtrar herramientas por nombre...' className='form-control mb-3' />
                    <div className="table-responsive">
                        <table className='table table-hover'>
                            <thead className="table-light">
                                <tr><th>ID</th><th>Nombre</th><th>Tarifa Diaria</th><th>Acción</th></tr>
                            </thead>
                            <tbody>
                                {results.map(tool => (
                                    <tr key={tool.id}>
                                        <td>{tool.id}</td>
                                        <td>{tool.name}</td>
                                        <td>${tool.rentDailyRate.toLocaleString('es-CL')}</td>
                                        <td>
                                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleToolSelect(tool)}>
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLoanComponent;