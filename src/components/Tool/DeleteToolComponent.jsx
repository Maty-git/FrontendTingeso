import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTools, deleteTool } from '../../services/ToolService'

// Importamos la librería de autocompletado
import Autocomplete from 'bootstrap5-autocomplete'

const DeleteToolComponent = () => {
    const [toolId, setToolId] = useState(0)      // ID de la herramienta seleccionada
    const [tools, setTools] = useState([])       // Lista de herramientas
    const autocompleteRef = useRef(null)         // Referencia al input de autocomplete
    const [search, setSearch] = React.useState('')

    const navigate = useNavigate()

    // 1️⃣ Cargar herramientas desde el backend
    useEffect(() => {
        getTools()
        .then((response) => {
            setTools(response.data)
        })
        .catch((error) => {
            console.error('Error al listar herramientas:', error)
        })
    }, [])

    // 2️⃣ Inicializar Autocomplete cuando tengamos las herramientas
    useEffect(() => {
        if (tools.length > 0 && autocompleteRef.current) {
        // Adaptamos los datos al formato que espera la librería
        const items = tools.map((tool) => ({
            label: `${tool.id}.${tool.name}`, // Lo que se muestra en la lista
            value: tool.id,                     // Lo que usaremos internamente
        }))

        // Inicializamos el autocompletado
        // ✅ Ahora
    new Autocomplete(autocompleteRef.current, {
    items: items,
    valueField: 'value',
    labelField: 'label',
    highlightTyped: true,
    onSelectItem: (item) => {
        console.log('Seleccionado:', item)
        setToolId(Number(item.value)) // guardamos el id
    },
    })
        }
    }, [tools])

    // 3️⃣ Eliminar herramienta
    const deleteToolById = (e) => {
        e.preventDefault()

        if (!toolId || toolId <= 0) {
        alert('Debes seleccionar una herramienta válida')
        return
        }

        deleteTool(toolId)
        .then(() => {
            // Quitamos del listado local sin recargar la página
            setTools(tools.filter((t) => t.id !== toolId))
            setToolId(0)
            autocompleteRef.current.value = '' // Limpia el input
            alert('Herramienta eliminada correctamente ✅')
        })
        .catch((error) => {
            console.error('Error al eliminar herramienta:', error)
            alert('Error al eliminar ❌')
        })
    }

    const searcher = (e) => { setSearch(e.target.value) 
        console.log(e.target.value) } 
        let results = [] 
        if(!search){ results = tools } else { results = tools.filter((dato) => dato.name.toLowerCase().includes(search.toLowerCase()) ) }

    return (
        <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3' style={{ marginTop: '10px' }}>
            <h2 className='text-center'>Eliminar Herramienta</h2>
            <div className='card-body'>
                <form onSubmit={deleteToolById}>
                <div className='form-group mb-2'>
                    <label className='form-label'>Buscar herramienta por nombre o ID:</label>
                    <input
                    type='text'
                    className='form-control autocomplete'
                    ref={autocompleteRef}   // conectamos el input con autocomplete
                    placeholder='Escribe el nombre o ID de la herramienta'
                    />
                </div>
                <button className='btn btn-danger' type='submit'>Eliminar</button>
                </form>
            </div>
            </div>
        </div>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar por Nombre de herramienta' className='form-control' style={{ marginTop: '10px' }} />
        <div style={{ marginTop: '15px' }}>
            <table className='table table-bordered table-striped'>
            <thead className='table-dark'>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                </tr>
            </thead>
                <tbody> {results.map(tool => ( <tr key={tool.id} 
                    onClick={() => { setToolId(tool.id); autocompleteRef.current.value = `${tool.id}.${tool.name}`; }}
                    style={{cursor: 'pointer'}}> 
                    <td>{tool.id}</td> 
                    <td>{tool.name}</td> 
                    <td>{tool.category}</td> 
                    <td>{tool.state}</td> </tr> ))} 
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DeleteToolComponent;