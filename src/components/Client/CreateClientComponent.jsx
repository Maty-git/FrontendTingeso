import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '../../services/ClientService'
import { validateRut, formatRut } from "@fdograph/rut-utilities";


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

        const client = { name, rut, phoneNumber, email, status }
        console.log(client)

        createClient(client).then((response) => {
            console.log(response.data)
            setName('');
            setRut('');
            setPhoneNumber('');
            setEmail('');
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3' style={{ marginTop: '100px' }}>
                    <h2 className='text-center'>Agregar Cliente</h2>
                    <div className='card-body'>
                        <form onSubmit={saveClient}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre:</label>
                                <input
                                    type='text'
                                    placeholder='Nombre del Cliente'
                                    name='name'
                                    value={name}
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>RUT:</label>
                                <input
                                    type="text"
                                    value={rut}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${!isValid ? "is-invalid" : ""}`}
                                    placeholder="Ingrese RUT del Cliente"
                                    name="rut"
                                    required
                                />
                                {!isValid && <div className="invalid-feedback">RUT inválido</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Teléfono:</label>
                                <input
                                    type='text'
                                    placeholder='Teléfono del Cliente'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    className='form-control'
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Email del Cliente'
                                    name='email'
                                    value={email}
                                    className='form-control'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClientComponent