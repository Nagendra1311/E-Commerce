import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartStart } from '../redux/actions/cart.action'

export default function Header() {
    const currentUser = useSelector(state => state.user.currentUser)
    const currentCart = useSelector(state => state.cart.currentCart)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartStart())
    }, [currentUser.name])

    return (
        <div className="container-fluid fixed-top">
            <div className="container px-0">
                <nav className="navbar navbar-light bg-white navbar-expand-xl">
                    <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">Ecommerce</h1></Link>
                    <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars text-primary"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                        <div className="navbar-nav mx-auto">
                            {
                                !currentUser.name && <>
                                    <Link to="/register" className="nav-item nav-link active">Register</Link>
                                    <Link to="/login" className="nav-item nav-link active">Login</Link>
                                </>
                            }
                        </div>
                        <div className="d-flex m-3 me-0">
                            {
                                currentUser.name && <>
                                    {
                                        currentCart.items?.length > 0 && <Link to="/cart" className="position-relative me-4 my-auto">
                                            <i className="fa fa-shopping-bag fa-2x"></i>
                                            <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{
                                                top: "-5px", left: "15px", height: "20px", minWidth: "20px"
                                            }}>{currentCart.items?.length}</span>
                                        </Link>
                                    }
                                    <Link to="/admin/dashboard" className="my-auto">
                                        <i className="fas fa-user fa-2x"></i>
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
