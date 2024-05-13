import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function OrderView() {
  let [order, setOrder] = useState({})
  const { id } = useParams();
  const orders = useSelector((state) => state.order.orders)
  const navigate = useNavigate()
  console.log(id);

  const getOrderById = () => {
    let order = orders.find((order) => order._id === id)


    if (order) {
      setOrder(order)
    } else {
      navigate("/admin/order")

    }
  }

  useEffect(() => {
    if (!id) {
      navigate("/admin/order")
    }

    getOrderById(id)
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">#{order._id} </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">#{order._id} </li>
        </ol>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card" >
              <div className="card-header d-flex justify-content-between">
                <h4 className='fw-bold'>#{order._id} </h4>
                <Link to="/admin/order" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <div>
                  <h5>Order Summary</h5>
                  <hr />
                  <p>Sub Total : ${order.subTotal}</p>
                  <hr />
                  <p>Sub Total : ${order.tax}</p>
                  <hr />
                  <p>Sub Total : ${order.grandTotal}</p>
                  <hr />
                </div>
                <div>
                  <h5>Payment Type</h5>
                  <hr />
                  <p>{order.billingAddress?.payment === "stripe" ? "Stripe" : "Cash on Delivery"}</p>
                </div>

                <div>
                  <h5>Billing Address</h5>
                  <hr />
                  <p>Name : {order.billingAddress?.name}</p>
                  <hr />
                  <p>Email : {order.billingAddress?.email}</p>
                  <hr />
                  <p>Contact : {order.billingAddress?.contact}</p>
                  <hr />
                  <p>Address : {order.billingAddress?.address}</p>
                  <hr />
                  <p>City : {order.billingAddress?.city}</p>
                  <hr />
                  <p>State : {order.billingAddress?.state}</p>
                  <hr />
                  <p>Country : {order.billingAddress?.country}</p>
                  <hr />
                  <p>Zip Code : {order.billingAddress?.zipCode}</p>
                  <hr />
                </div>


                <div>
                  <h5>Products</h5>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.items?.length > 0 && order.items.map((item, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td><img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} alt="" style={{
                              height: "50px"
                            }} /></td>
                            <td>{item.product.name}</td>
                            <td>${item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{+item.product.price * item.quantity}</td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
