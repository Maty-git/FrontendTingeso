import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../services/UserService'

const CreateUserComponent = () => {
    const [name, setName] = useState('')
    const [rut, setRut] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('') // Valor por defecto

    const navigate = useNavigate()

    const saveUser = async (e) => {
        e.preventDefault()

        const user = { name, email, rut, password, role }
        console.log(user)

        createUser(user).then((response) => {
            console.log(response.data)
            setName('')
            setEmail('')
            setRut('')
            setPassword('')
            setRole('EMPLOYEE')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3' style={{ marginTop: '100px' }}>
                    <h2 className='text-center'>Creación De Colaborador</h2>
                    <div className='card-body'>
                        <form onSubmit={saveUser}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre:</label>
                                <input
                                    type='text'
                                    placeholder='Nombre del Usuario'
                                    name='name'
                                    value={name}
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>RUT:</label>
                                <input
                                    type='text'
                                    placeholder='RUT del Usuario'
                                    name='rut'
                                    value={rut}
                                    className='form-control'
                                    onChange={(e) => setRut(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Email del Usuario'
                                    name='email'
                                    value={email}
                                    className='form-control'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Contraseña:</label>
                                <input
                                    type='password'
                                    placeholder='Contraseña'
                                    name='password'
                                    value={password}
                                    className='form-control'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Rol:</label>
                                <select
                                    className='form-control'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value='ADMIN'>Administrador</option>
                                    <option value='EMPLOYEE'>Empleado</option>
                                </select>
                            </div>
                            <button type='submit' className='btn btn-primary'>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUserComponent