import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../../components/CartItem'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const currentCart = useSelector(state => state.cart.currentCart);
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser.name) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentCart.items?.length > 0 && currentCart.items.map((item, index) => (
                    <CartItem item={item} key={index} />
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8"></div>
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">${currentCart.subTotal}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Tax</h5>
                    <div className="">
                      <p className="mb-0">Flat rate: ${currentCart.tax}</p>
                    </div>
                  </div>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Grand Total</h5>
                  <p className="mb-0 pe-4">${currentCart.grandTotal}</p>
                </div>
                <Link to="/checkout" className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
