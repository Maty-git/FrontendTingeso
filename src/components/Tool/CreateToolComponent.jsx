import React, { useState } from 'react'
import { createTool } from '../../services/ToolService'
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const CreateToolComponent = () => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [state, setState] = useState('AVAILABLE')
    const [quantity, setQuantity] = useState(0)
    const [rentDailyRate, setRentDailyRate] = useState(0)
    const [lateFee, setLateFee] = useState(0)
    const [replacementValue, setReplacementValue] = useState(0)
    const [repairCost, setRepairCost] = useState(0)

    const rutUser = keycloak?.tokenParsed?.rut;

    function saveTool(e) {
        e.preventDefault();

        const tool = {
            name,
            category,
            state,
            quantity,
            rentDailyRate,
            lateFee,
            replacementValue,
            repairCost
        };

        console.log("Tool a guardar:", tool);
        console.log("RUT del creador:", rutUser);

        createTool(tool, rutUser).then((response) => {
            console.log(response.data)
            alert("✅ ¡Herramienta creada exitosamente!");
            setName('');
            setCategory('');
            setState('AVAILABLE');
            setQuantity(0);
            setRentDailyRate(0);
            setLateFee(0);
            setReplacementValue(0);
            setRepairCost(0);
        })
            .catch((error) => {
                console.log(error)
                alert("❌ Error al crear la herramienta. Por favor, intente nuevamente.");
            });
    }

    function goBack() {
        navigate('/tools');
    }
    return (
        <div className='container-fluid py-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                    <div className='card card-custom'>
                        <div className='card-header-custom'>
                            <h2 className='h4 mb-0 text-center'>
                                <i className="fas fa-plus me-2"></i>
                                Agregar Nueva Herramienta
                            </h2>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={saveTool}>
                                <div className='mb-3'>
                                    <label className='form-label fw-semibold'>Nombre de la Herramienta:</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el nombre de la herramienta'
                                        name='name'
                                        value={name}
                                        className='form-control form-control-custom'
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setName(value.toUpperCase());
                                        }}
                                        required
                                    />
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label fw-semibold'>Categoría:</label>
                                    <select
                                        name='category'
                                        value={category}
                                        className='form-control form-control-custom'
                                        onChange={(e) => { setCategory(e.target.value); }}
                                        required
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
                                <div className='row'>
                                    {/* State selection removed, defaults to AVAILABLE */}
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Cantidad:</label>
                                        <input
                                            type='number'
                                            placeholder='Cantidad de herramientas'
                                            name='quantity'
                                            value={quantity}
                                            className='form-control form-control-custom'
                                            onFocus={() => quantity === 0 && setQuantity('')}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setQuantity(value === '' ? 0 : Number(value));
                                                }
                                            }}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Valor de Reemplazo:</label>
                                        <input
                                            type='number'
                                            placeholder='Valor de reemplazo en pesos'
                                            name='replacementValue'
                                            value={replacementValue}
                                            className='form-control form-control-custom'
                                            onFocus={() => replacementValue === 0 && setReplacementValue('')}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setReplacementValue(value === '' ? 0 : Number(value));
                                                }
                                            }}
                                            min="0"
                                        />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Tarifa Diaria:</label>
                                        <input
                                            type='number'
                                            placeholder='Tarifa diaria de arriendo'
                                            name='rentDailyRate'
                                            value={rentDailyRate}
                                            className='form-control form-control-custom'
                                            onFocus={() => rentDailyRate === 0 && setRentDailyRate('')}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setRentDailyRate(value === '' ? 0 : Number(value));
                                                }
                                            }}
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Tarifa por Retraso:</label>
                                        <input
                                            type='number'
                                            placeholder='Cargo por retraso en pesos'
                                            name='lateFee'
                                            value={lateFee}
                                            className='form-control form-control-custom'
                                            onFocus={() => lateFee === 0 && setLateFee('')}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setLateFee(value === '' ? 0 : Number(value));
                                                }
                                            }}
                                            min="0"
                                        />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Costo de Reparación:</label>
                                        <input
                                            type='number'
                                            placeholder='Costo de reparación en pesos'
                                            name='repairCost'
                                            value={repairCost}
                                            className='form-control form-control-custom'
                                            onFocus={() => repairCost === 0 && setRepairCost('')}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                    setRepairCost(value === '' ? 0 : Number(value));
                                                }
                                            }}
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className='text-center mt-4'>
                                    <button type="button" className="btn btn-outline-secondary me-3" onClick={goBack}>
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Volver al Listado
                                    </button>
                                    <button type="submit" className="btn btn-accent btn-lg px-5">
                                        <i className="fas fa-save me-2"></i>
                                        Guardar Herramienta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateToolComponent