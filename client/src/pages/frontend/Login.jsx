import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/useFormData';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStart, loginUserStart } from '../../redux/actions/user.action';

export default function Login() {
    const users = useSelector(state => state.user.users);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [error, setError] = useState('');

    let [formData, , , inputChange] = useFormData({
        email: '',
        password: ''
    })

    let { email, password } = formData;


    const submit = (event) => {
        event.preventDefault();
        // const email = users.filter(user => user.email === formData.email)
        // navigate('/admin/dashboard')

        dispatch(loginUserStart(formData));
        setTimeout(() => {
            if (currentUser) {
                navigate('/admin/dashboard')

            }
        }, 1000);

    }


    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Sign In</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Sign In</li>
                </ol>
            </div>

            <div className="container">
                <div className="wrapper d-flex align-items-center justify-content-center h-100">
                    <div className="card login-form">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login Form</h5>
                            <form onSubmit={submit}>
                                {error && <p className='text-danger text-center fw-bold'>{error}</p>}

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
                                    Don't have an account? <Link to="/">Create One</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
