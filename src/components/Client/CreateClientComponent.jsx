import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '../../services/ClientService'
import { validateRut, formatRut } from "@fdograph/rut-utilities";
import { handleApiError, showSuccessNotification, showErrorNotification } from '../../utils/helpers';


const CreateClientComponent = () => {

    const [name, setName] = useState('')
    const [rut, setRut] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const status = 'ACTIVE'

    const handleChange = (e) => {
        const value = e.target.value;
        setRut(value);

        // Validación inmediata
        setIsValid(validateRut(value));
    };

    const handleBlur = () => {
        // Al salir del input, lo formatea
        if (isValid) {
            setRut(formatRut(rut));
        }
    };

    const navigate = useNavigate();

    const saveClient = async (e) => {
        e.preventDefault()

        // Validar RUT antes de enviar
        if (!validateRut(rut)) {
            showErrorNotification('El RUT ingresado no es válido');
            return;
        }

        const client = { name, rut, phoneNumber, email, status }

        try {
            const response = await createClient(client);

            showSuccessNotification('Cliente registrado exitosamente');

            // Limpiar formulario
            setName('');
            setRut('');
            setPhoneNumber('');
            setEmail('');
            setIsValid(true);
        } catch (error) {
            if (error.response.status === 500) {
                showErrorNotification('El RUT ingresado ya se encuentra registrado');
                return;
            }
            const errorMessage = handleApiError(error, 'crear cliente');
            showErrorNotification(errorMessage);
        }
    }
    return (
        <div className='container-fluid py-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-6'>
                    <div className='card card-custom'>
                        <div className='card-header-custom'>
                            <h2 className='h4 mb-0 text-center'>
                                <i className="fas fa-user-plus me-2"></i>
                                Registrar Nuevo Cliente
                            </h2>
                        </div>
                        <div className='card-body p-4'>
                            <form onSubmit={saveClient}>
                                <div className='mb-3'>
                                    <label className='form-label fw-semibold'>Nombre completo:</label>
                                    <input
                                        type='text'
                                        placeholder='Ingrese el nombre completo del cliente'
                                        name='name'
                                        value={name}
                                        className='form-control form-control-custom'
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label fw-semibold'>RUT:</label>
                                    <input
                                        type="text"
                                        value={rut}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`form-control form-control-custom ${!isValid ? "is-invalid" : ""}`}
                                        placeholder="Ej: 12.345.678-9"
                                        name="rut"
                                        required
                                    />
                                    {!isValid && <div className="invalid-feedback">RUT inválido. Verifique el formato y dígito verificador.</div>}
                                </div>

                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Teléfono:</label>
                                        <input
                                            type='tel'
                                            placeholder='Ej: +56 9 1234 5678'
                                            name='phoneNumber'
                                            value={phoneNumber}
                                            className='form-control form-control-custom'
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-semibold'>Email:</label>
                                        <input
                                            type='email'
                                            placeholder='cliente@ejemplo.com'
                                            name='email'
                                            value={email}
                                            className='form-control form-control-custom'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='text-center'>
                                    <button type='submit' className='btn btn-accent btn-lg px-5' disabled={!isValid}>
                                        <i className="fas fa-save me-2"></i>
                                        Registrar Cliente
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

export default CreateClientComponent