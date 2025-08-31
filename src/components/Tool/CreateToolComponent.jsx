import React, { useState } from 'react'
import { createTool } from '../../services/ToolService'
import { useNavigate } from 'react-router-dom';

const CreateToolComponent = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [state, setState] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [rentDailyRate, setRentDailyRate] = useState(0)
    const [lateFee, setLateFee] = useState(0)
    const [replacementValue, setReplacementValue] = useState(0)

    function saveTool(e){
        e.preventDefault();
        const tool = {name, category, state, quantity, rentDailyRate, lateFee, replacementValue}
        console.log(tool);
        
        createTool(tool).then((response) => {   
            console.log(response.data)
            setName('');
            setCategory('');
            setState('');
            setQuantity(0);
            setRentDailyRate(0);
            setLateFee(0);
            setReplacementValue(0);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    function goBack(){
        navigate('/tools');
    }

    return (
        <div>
            <div className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: '100px' }}>
                <button type="button" className="btn btn-outline-primary" onClick={goBack}>VOLVER A LISTADO DE HERRAMIENTAS</button>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3' style={{ marginTop: '10px' }}>
                        <h2 className='text-center'>Agregar Herramienta</h2>
                        <div className='card-body'>
                            <form onSubmit={saveTool}>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre:</label>
                                    <input
                                        type='text'
                                        placeholder='Nombre de la Herramienta'
                                        name='name'
                                        value={name}
                                        className='form-control'
                                        onChange={(e) => {
                                        const value = e.target.value;
                                        setName(value.toUpperCase());
                                    }}
                                    />
                                </div>
                                <div className='form-group mb-2'>
    <label className='form-label'>Categoría:</label>
    <select
        name='category'
        value={category}
        className='form-control'
        onChange={(e) => { setCategory(e.target.value); }}
    >
        <option value="">Seleccione una categoría</option>
        <option value="MANUAL">Manual</option>
        <option value="ELECTRICAL">Eléctrica</option>
        <option value="CONSTRUCTION">Construcción</option>
        <option value="CUTTING">Corte</option>
        <option value="CARPENTRY">Carpintería</option>
        <option value="WELDING">Soldadura</option>
        <option value="GARDENING">Jardinería</option>
        <option value="MEASUREMENT">Medición</option>
        <option value="SCAFFOLDING">Andamios</option>
        <option value="MACHINERY">Maquinaria</option>
        <option value="SAFETY">Seguridad</option>
        <option value="ACCESSORIES">Accesorios</option>
    </select>
</div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Estado:</label>
                                    <select
                                        name='state'
                                        value={state}
                                        className='form-control'
                                        onChange={ (e) =>{setState(e.target.value);}}
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="AVAILABLE">Disponible</option>
                                        <option value="LOANED">Arrendada</option>
                                        <option value="UNDER_REPAIR">En mantenimiento</option>
                                        <option value="OUT_OF_SERVICE">Baja</option>
                                    </select>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Cantidad:</label>
                                    <input
    type='text'
    placeholder='Cantidad de Herramienta'
    name='quantity'
    value={quantity}
    className='form-control'
    onFocus={() => quantity === 0 && setQuantity('')}
    onChange={(e) => {
        const value = e.target.value;
        // Solo permite números enteros positivos
        if (/^\d*$/.test(value)) {
            setQuantity(value === '' ? 0 : Number(value));
        }
    }}
/>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Tarifa Diaria:</label>
                                    <input
    type='text'
    placeholder='Tarifa Diaria de Renta'
    name='rentDailyRate'
    value={rentDailyRate}
    className='form-control'
    onFocus={() => rentDailyRate === 0 && setRentDailyRate('')}
    onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setRentDailyRate(value === '' ? 0 : Number(value));
        }
    }}
/>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Tarifa Retraso:</label>
                                    <input
    type='text'
    placeholder='Cargo por Retraso'
    name='lateFee'
    value={lateFee}
    className='form-control'
    onFocus={() => lateFee === 0 && setLateFee('')}
    onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setLateFee(value === '' ? 0 : Number(value));
        }
    }}
/>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Tarifa Reemplazo:</label>
                                    <input
    type='text'
    placeholder='Valor de Reemplazo'
    name='replacementValue'
    value={replacementValue}
    className='form-control'
    onFocus={() => replacementValue === 0 && setReplacementValue('')}
    onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setReplacementValue(value === '' ? 0 : Number(value));
        }
    }}
/>
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default CreateToolComponent