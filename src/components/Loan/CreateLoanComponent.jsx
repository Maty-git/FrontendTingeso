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
                alert("El cliente ya tiene un préstamo activo de esta herramienta, o el cliente esta reestrigido.")
                return
            }
            setReturnDateExpected('')
            setQuantity(1)
            setStatus('ACTIVE')
            setClientRut('')
            setToolId(0)
            })
            .catch((error) => {
            console.error('Error al crear préstamo:', error)
            })
            navigate('/create-loan')
}



    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3' style={{ marginTop: '10px' }}>
                    <h2 className='text-center'>Registrar Préstamo</h2>
                    <div className='card-body'>
                        <form onSubmit={saveLoan}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Fecha esperada de devolución:</label>
                                <input
                                    type='datetime-local'
                                    value={returnDateExpected}
                                    className='form-control'
                                    onChange={(e) => setReturnDateExpected(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Cantidad:</label>
                                <input
                                    type='number'
                                    value={quantity}
                                    className='form-control'
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Estado:</label>
                                <select
                                    className='form-control'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value='ACTIVE'>Activo</option>
                                    <option value='RETURNED'>Devuelto</option>
                                    <option value='UNPAID_FINE'>Multa impaga</option>
                                    <option value='REPLACEMENT'>Reemplazo</option>
                                </select>
                            </div>
                        
                            <div className='form-group mb-2'>
                                <label className='form-label'>RUT del Cliente:</label>
                                <input
                                    type='text'
                                    value={clientRut}
                                    className='form-control'
                                    onChange={(e) => setClientRut(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>ID de la Herramienta:</label>
                                <input
                                    type='number'
                                    value={toolId}
                                    className='form-control'
                                    onChange={(e) => setToolId(Number(e.target.value))}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Guardar Préstamo</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <input value={search} onChange={searcher} type="text" placeholder='search' className='form-control' />
                <table className='table table-bordered table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(tool => (
                            <tr key={tool.id} onClick={() => setToolId(tool.id)} style={{cursor: 'pointer'}}>
                            <td>{tool.id}</td>
                            <td>{tool.name}</td>
                            <td>{tool.category}</td>
                            <td>{tool.state}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateLoanComponent
