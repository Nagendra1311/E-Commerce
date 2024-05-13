import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderStart } from '../../../redux/actions/order.action'

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser)
  const orderState = useSelector((state) => state.order.orders)
  const dispatch = useDispatch()

  const getOrderByRole = () => {
    let searchOrders = orderState.filter((ord) => ord.customer.id === currentUser.id)

    setOrders(searchOrders);
  }

  useEffect(() => {
    dispatch(getOrderStart())
    if (currentUser.role === "0") {
      getOrderByRole();
    } else {
      setOrders(orderState)
    }
  }, [orderState.length])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Orders</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Orders</li>
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
                <h4 className='fw-bold'>Orders</h4>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Sub total</th>
                      <th>Tax</th>
                      <th>Grand Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.length > 0 && orders.map((order, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{order.customer.name}</td>
                          <td>{order.subTotal}</td>
                          <td>{order.tax}</td>
                          <td>{order.grandTotal}</td>
                          <td>
                            <Link to={`/admin/order/view/${order._id}`} className='btn btn-info btn-sm me-2'>View</Link>
                          </td>
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
    </>
  )
}
