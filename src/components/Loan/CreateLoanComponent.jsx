import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../../services/LoanService'
import { listClients } from '../../services/ClientService'

const CreateLoanComponent = () => {
    const [returnDateExpected, setReturnDateExpected] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [status, setStatus] = useState('ACTIVE')
    const [repairCost, setRepairCost] = useState(0)
    const [clients, setClients] = useState('')
    const [userId, setUserId] = useState('')
    const [toolId, setToolId] = useState('')

    useEffect(() => {
        listClients().then((response) => {
            setClients(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.error('Error al listar clientes:', error)
        })
    }, [])

    const setFilteredClient = (e) => {
        const selectedRut = e.target.value
        setClients(clients.filter(client => client.rut === selectedRut))
    }

    const navigate = useNavigate()

    const saveLoan = async (e) => {
        e.preventDefault()

        const loan = {
            returnDateExpected,
            quantity,
            status,
            repairCost,
            client: { rut: client },
            user: { id: userId },
            tool: { id: toolId }
        }

        console.log(loan)

        createLoan(loan).then((response) => {
            console.log(response.data)
            setReturnDateExpected('')
            setQuantity(1)
            setStatus('ACTIVE')
            setRepairCost(0)
            setClient('')
            setUserId('')
            setToolId('')

        }).catch((error) => {
            console.error('Error al crear préstamo:', error)
        })
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
                                <label className='form-label'>Costo de reparación:</label>
                                <input
                                    type='number'
                                    value={repairCost}
                                    className='form-control'
                                    onChange={(e) => setRepairCost(parseInt(e.target.value))}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>ID del Cliente:</label>
                                <input
                                    type='text'
                                    value={clientId}
                                    className='form-control'
                                    onChange={(e) => setClientId(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>ID del Usuario:</label>
                                <input
                                    type='text'
                                    value={userId}
                                    className='form-control'
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>ID de la Herramienta:</label>
                                <input
                                    type='text'
                                    value={toolId}
                                    className='form-control'
                                    onChange={(e) => setToolId(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Guardar Préstamo</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLoanComponent
