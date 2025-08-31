import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTools} from '../../services/ToolService'
import { deleteTool } from '../../services/ToolService'


const DeleteToolComponent = () => {

    const [toolId, setToolId] = React.useState(0)
    const [tools, setTools] = React.useState([])
    const [search, setSearch] = React.useState('')

    const navigate = useNavigate()

    const rechargePage = () => {
        window.location.reload();
    }

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

    const deleteToolById= (e)=>{
        e.preventDefault();
        deleteTool(toolId).then((response) => {
            console.log(response.data);
            setToolId(0);
            rechargePage();
        }).catch((error) => {
            console.error('Error al eliminar herramienta:', error);
        });
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3' style={{ marginTop: '10px' }}>
                    <h2 className='text-center'>Eliminar Herramienta</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>ID de la Herramienta a Eliminar:</label>
                                <input
                                    type='number'
                                    placeholder='ID de la Herramienta'
                                    name='toolId'
                                    value={toolId}
                                    onChange={(e) => setToolId(e.target.value)}
                                    className='form-control'
                                />
                            </div>
                            <button className='btn btn-danger' type='submit' onClick={deleteToolById}>Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <input value={search} onChange={searcher} type="text" placeholder='Buscar por Nombre de herramienta' className='form-control' style={{ marginTop: '10px' }} />
                <table className='table table-bordered table-striped' style={{ marginTop: '10px' }}>
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

export default DeleteToolComponent