import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../../services/LoanService'
import { getTools } from '../../services/ToolService'
import { useKeycloak } from '@react-keycloak/web'
import { getAllRuts } from '../../services/ClientService';


const CreateLoanComponent = () => {
    const [returnDateExpected, setReturnDateExpected] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [status, setStatus] = useState('ACTIVE')
    const [clientRut, setClientRut] = useState('')
    const [toolId, setToolId] = useState(0)
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
        if(!search){
            results = tools
        } else {
            results = tools.filter((dato) => 
                dato.name.toLowerCase().includes(search.toLowerCase())
            )
    }



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

        // Validación: verificar que el rut ingresado esté en la lista
        if (!ruts.includes(clientRut)) {
            alert("❌ El RUT ingresado no está registrado como cliente.")
            return // detenemos el flujo, no crea el préstamo
        }
        if (!tools.some(tool => tool.id === toolId)) {
            alert("❌ Debe seleccionar una herramienta de la lista.");
            return; // detenemos el flujo
        }

        // Validación: verificar que la fecha de devolución no sea anterior a la fecha actual
        const returnDate = new Date(returnDateExpected);
        const currentDate = new Date();
        
        if (returnDate <= currentDate) {
            alert("❌ La fecha de devolución debe ser posterior a la fecha actual.");
            return;
        }


        const loan = {
            returnDateExpected,
            quantity,
            status,
            clientRut,
            userRut: rutUser, // ✅ directo desde keycloak
            toolId
        }

        console.log(loan)

        createLoan(loan)
            .then((response) => {
                console.log(response.data)
                if(response.data === false) {
                    alert("❌ Error: El cliente ya tiene un préstamo activo de esta herramienta, o el cliente está restringido.")
                    return
                }
                
                // Mensaje de éxito
                alert("✅ ¡Préstamo registrado exitosamente!")
                
                // Limpiar formulario
                setReturnDateExpected('')
                setQuantity(1)
                setStatus('ACTIVE')
                setClientRut('')
                setToolId(0)
                
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
                                            type='datetime-local'
                                            value={returnDateExpected}
                                            className='form-control form-control-custom'
                                            onChange={(e) => setReturnDateExpected(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Cantidad:</label>
                                        <input
                                            type='number'
                                            value={quantity}
                                            className='form-control form-control-custom'
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Estado:</label>
                                        <select
                                            className='form-control form-control-custom'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value='ACTIVE'>Activo</option>
                                            <option value='RETURNED'>Devuelto</option>
                                            <option value='UNPAID_FINE'>Multa impaga</option>
                                            <option value='REPLACEMENT'>Reemplazo</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>RUT del Cliente:</label>
                                        <input
                                            type='text'
                                            value={clientRut}
                                            className='form-control form-control-custom'
                                            onChange={(e) => setClientRut(e.target.value)}
                                            placeholder="Ej: 12.345.678-9"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className='mb-4'>
                                    <label className='form-label fw-semibold'>ID de la Herramienta:</label>
                                    <input
                                        type='number'
                                        value={toolId}
                                        className='form-control form-control-custom'
                                        onChange={(e) => setToolId(Number(e.target.value))}
                                        placeholder="Selecciona una herramienta de la tabla"
                                        required
                                    />
                                </div>
                                
                                <div className='text-center'>
                                    <button type='submit' className='btn btn-accent btn-lg px-5'>
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
                                        <tr key={tool.id} style={{cursor: 'pointer'}}>
                                            <td>{tool.id}</td>
                                            <td>{tool.name}</td>
                                            <td>{tool.category}</td>
                                            <td>
                                                <span className={`badge badge-custom ${
                                                    tool.state === 'AVAILABLE' ? 'bg-success' : 
                                                    tool.state === 'LOANED' ? 'bg-primary' : 
                                                    tool.state === 'UNDER_REPAIR' ? 'bg-warning' : 'bg-danger'
                                                }`}>
                                                    {tool.state}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-accent"
                                                    onClick={() => setToolId(tool.id)}
                                                >
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
        </div>
    )
}

export default CreateLoanComponent
