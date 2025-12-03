import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../../services/LoanService'
import { getTools } from '../../services/ToolService'
import { useKeycloak } from '@react-keycloak/web'
import { getAllRuts } from '../../services/ClientService';
import { validateRut, formatRut } from "@fdograph/rut-utilities";
import { getToolStateLabel } from '../../utils/helpers';


const CreateLoanComponent = () => {
    const [returnDateExpected, setReturnDateExpected] = useState('')
    const [quantity, setQuantity] = useState(1)
    // const [status, setStatus] = useState('ACTIVE') // Status is always ACTIVE
    const [clientRut, setClientRut] = useState('')
    const [toolId, setToolId] = useState(0)
    const [price, setPrice] = useState(0)
    const [isValidRut, setIsValidRut] = useState(true)
    const [selectedTool, setSelectedTool] = useState(null)
    const { keycloak } = useKeycloak(); //

    const rutUser = keycloak?.tokenParsed?.rut;


    const [tools, setTools] = useState([])
    const [ruts, setRuts] = useState([])
    const [search, setSearch] = useState('')

    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    let results = []
    if (!search) {
        results = tools
    } else {
        results = tools.filter((dato) =>
            dato.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    // Filter only available tools
    results = results.filter(tool => tool.state === 'AVAILABLE');

    const handleRutChange = (e) => {
        const value = e.target.value;
        setClientRut(value);
        setIsValidRut(validateRut(value));
    };

    const handleRutBlur = () => {
        if (isValidRut) {
            setClientRut(formatRut(clientRut));
        }
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
            // Parse local date from input string YYYY-MM-DD
            const [year, month, day] = date.split('-').map(Number);
            const endDate = new Date(year, month - 1, day); // Local midnight

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Local midnight today

            const diffTime = endDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Ensure at least 1 day if it's strictly positive
            const days = diffDays > 0 ? diffDays : 0; // If 0 or negative, logic elsewhere handles it or price is 0

            const calculatedPrice = tool.rentDailyRate * days * qty;
            setPrice(calculatedPrice > 0 ? calculatedPrice : 0);
        } else {
            setPrice(0);
        }
    };

    useEffect(() => {
        getTools()
            .then((response) => setTools(response.data))
            .catch((error) => console.error('Error al listar herramientas:', error))
        console.log(tools)
        getAllRuts()
            .then((response) => setRuts(response.data))
            .catch((error) => console.error('Error al listar clientes:', error))
    }, [])

    const navigate = useNavigate()

    const saveLoan = async (e) => {
        e.preventDefault()

        if (!validateRut(clientRut)) {
            alert("❌ El RUT ingresado no es válido.");
            return;
        }

        if (!tools.some(tool => tool.id === toolId)) {
            alert("❌ Debe seleccionar una herramienta de la lista.");
            return;
        }

        // Parse local date from input string YYYY-MM-DD
        const [year, month, day] = returnDateExpected.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day); // Local midnight

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Local midnight today

        // Validation: selectedDate must be strictly greater than today
        if (selectedDate <= today) {
            alert("❌ La fecha de devolución debe ser al menos un día después de hoy.");
            return;
        }

        // Fix time to 20:00 local time
        const fixedReturnDate = new Date(year, month - 1, day, 20, 0, 0);

        // Adjusting the string to send to backend
        const y = fixedReturnDate.getFullYear();
        const m = String(fixedReturnDate.getMonth() + 1).padStart(2, '0');
        const d = String(fixedReturnDate.getDate()).padStart(2, '0');
        const h = String(fixedReturnDate.getHours()).padStart(2, '0');
        const min = String(fixedReturnDate.getMinutes()).padStart(2, '0');
        const s = String(fixedReturnDate.getSeconds()).padStart(2, '0');

        const formattedDate = `${y}-${m}-${d}T${h}:${min}:${s}`;

        const loan = {
            returnDateExpected: formattedDate,
            quantity,
            status: 'ACTIVE',
            clientRut,
            userRut: rutUser, // ✅ directo desde keycloak
            toolId,
            price
        }

        console.log(loan)

        createLoan(loan)
            .then((response) => {
                console.log(response.data)
                if (response.data === false) {
                    alert("❌ Error: El cliente ya tiene un préstamo activo de esta herramienta, o el cliente está restringido.")
                    return
                }

                // Mensaje de éxito
                alert("✅ ¡Préstamo registrado exitosamente!")

                // Limpiar formulario
                setReturnDateExpected('')
                setQuantity(1)
                // setStatus('ACTIVE')
                setClientRut('')
                setToolId(0)
                setPrice(0)
                setSelectedTool(null)

                // Recargar la página para actualizar la lista de herramientas
                window.location.reload()
            })
            .catch((error) => {
                console.error('Error al crear préstamo:', error)
                alert("❌ Error al crear el préstamo. Por favor, intente nuevamente.")
            })
    }



    return (
        <div className='container-fluid py-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                    <div className='card card-custom'>
                        <div className='card-header-custom'>
                            <h2 className='h4 mb-0 text-center'>
                                <i className="fas fa-handshake me-2"></i>
                                Registrar Nuevo Préstamo
                            </h2>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={saveLoan}>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Fecha esperada de devolución:</label>
                                        <input
                                            type='date'
                                            value={returnDateExpected}
                                            className='form-control form-control-custom'
                                            onChange={handleDateChange}
                                            required
                                        />
                                        <small className="text-muted">La hora de devolución se fijará a las 20:00</small>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Cantidad:</label>
                                        <input
                                            type='number'
                                            value={quantity}
                                            className='form-control form-control-custom'
                                            onChange={handleQuantityChange}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    {/* Status selection removed */}
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>RUT del Cliente:</label>
                                        <input
                                            type='text'
                                            value={clientRut}
                                            className={`form-control form-control-custom ${!isValidRut ? "is-invalid" : ""}`}
                                            onChange={handleRutChange}
                                            onBlur={handleRutBlur}
                                            placeholder="Ej: 12.345.678-9"
                                            required
                                        />
                                        {!isValidRut && <div className="invalid-feedback">RUT inválido.</div>}
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Precio Estimado:</label>
                                        <div className="form-control form-control-custom bg-light">
                                            ${price.toLocaleString('es-CL')}
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <label className='form-label fw-semibold'>ID de la Herramienta:</label>
                                    <input
                                        type='number'
                                        value={toolId}
                                        className='form-control form-control-custom'
                                        readOnly
                                        placeholder="Selecciona una herramienta de la tabla"
                                        required
                                    />
                                </div>

                                <div className='text-center'>
                                    <button type='submit' className='btn btn-accent btn-lg px-5' disabled={!isValidRut || toolId === 0}>
                                        <i className="fas fa-save me-2"></i>
                                        Guardar Préstamo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="card card-custom">
                    <div className="card-header-custom">
                        <h3 className="h5 mb-0">
                            <i className="fas fa-search me-2"></i>
                            Seleccionar Herramienta
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                value={search}
                                onChange={searcher}
                                type="text"
                                placeholder='Buscar herramienta por nombre...'
                                className='form-control form-control-custom'
                            />
                        </div>
                        <div className="table-responsive">
                            <table className='table table-custom'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map(tool => (
                                        <tr key={tool.id} style={{ cursor: 'pointer' }}>
                                            <td>{tool.id}</td>
                                            <td>{tool.name}</td>
                                            <td>{tool.category}</td>
                                            <td>
                                                <span className={`badge badge-custom ${tool.state === 'AVAILABLE' ? 'bg-success' :
                                                    tool.state === 'LOANED' ? 'bg-primary' :
                                                        tool.state === 'UNDER_REPAIR' ? 'bg-warning' : 'bg-danger'
                                                    }`}>
                                                    {getToolStateLabel(tool.state)}
                                                </span>
                                            </td>
                                            <td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-accent"
                                                        onClick={() => handleToolSelect(tool)}
                                                    >
                                                        Seleccionar
                                                    </button>
                                                </td>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLoanComponent
