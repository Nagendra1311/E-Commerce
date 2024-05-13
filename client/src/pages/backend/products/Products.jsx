import React, { useEffect } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductStart, getProductStart } from '../../../redux/actions/product.action';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)

  useEffect(() => {
    dispatch(getProductStart())
  }, [products.length])

  const deleteProduct = (product) => {
    dispatch(deleteProductStart(product))
  }
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Products</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Products</li>
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
                <h4 className='fw-bold'>Products</h4>
                <Link to="/admin/product/create" className='btn btn-primary text-white button'>Add Product</Link>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.length > 0 && products.map((product, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td><img src={process.env.REACT_APP_BACKEND_API_URL +product.image} alt="" style={{
                            height: "50px"
                          }} /></td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.category.name}</td>
                          <td>{product.status ? 'Active' : 'Inactive'}</td>
                          <td>
                            <Link to={`/admin/product/edit/${product._id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                            <button className='btn btn-danger btn-sm me-2' onClick={() => deleteProduct(product)}>Delete</button>
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
