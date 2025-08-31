import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createLoan } from '../../services/LoanService'
import { getTools } from '../../services/ToolService'

const CreateLoanComponent = () => {
    const [returnDateExpected, setReturnDateExpected] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [status, setStatus] = useState('ACTIVE')
    const [clientRut, setClientRut] = useState('')
    const [userRut, setUserRut] = useState('')
    const [toolId, setToolId] = useState(0)



    const [tools, setTools] = useState([])
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
        getTools().then((response) => {
            setTools(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.error('Error al listar herramientas:', error)
        })
    }, [])

    

    const navigate = useNavigate()

    const saveLoan = async (e) => {
        e.preventDefault()

        const loan = {
        returnDateExpected,
        quantity,
        status,
        clientRut,
        userRut,
        toolId
        }


        console.log(loan)

        createLoan(loan).then((response) => {
            console.log(response.data)
            setReturnDateExpected('')
            setQuantity(1)
            setStatus('ACTIVE')
            setClientRut('')
            setUserRut('')
            setToolId(0)

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
                                <label className='form-label'>RUT del Cliente:</label>
                                <input
                                    type='text'
                                    value={clientRut}
                                    className='form-control'
                                    onChange={(e) => setClientRut(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>RUT del Usuario:</label>
                                <input
                                    type='text'
                                    value={userRut}
                                    className='form-control'
                                    onChange={(e) => setUserRut(e.target.value)}
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
