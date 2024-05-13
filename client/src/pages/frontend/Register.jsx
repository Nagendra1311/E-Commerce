import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from './../../hooks/useFormData';
import { useDispatch } from 'react-redux';
import { addUserStart, registerUserStart } from '../../redux/actions/user.action';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    let [formData, , , inputChange] = useFormData({
        name: '',
        email: '',
        password: '',
        role: '0'
    })

    let { name, email, password } = formData;

    const submit = (event) => {
        event.preventDefault();
        dispatch(registerUserStart(formData))
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Sign Up</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Sign Up</li>
                </ol>
            </div>

            <div className="container">
                <div className="wrapper d-flex align-items-center justify-content-center h-100">
                    <div className="card login-form">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign Up</h5>
                            <form onSubmit={submit}>
                                {error && <p className='text-danger text-center fw-bold'>{error}</p>}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name='name'
                                        value={name}
                                        onChange={inputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name='email'
                                        value={email}
                                        onChange={inputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name='password'
                                        value={password}
                                        onChange={inputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                                <div className="sign-up mt-4">
                                    allready have an account? <Link to="/login" style={{
                                        float: "right",
                                    }}>Sign in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
