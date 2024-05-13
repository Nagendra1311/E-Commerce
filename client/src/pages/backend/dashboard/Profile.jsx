import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useSelector } from 'react-redux'

export default function Profile() {
  const currentUser = useSelector(state => state.user.currentUser)
  console.log(currentUser);
  console.log('hiii');

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Dashboard</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Dashboard</li>
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
                <h4 className='fw-bold'>Profile</h4>
                <Link to="/admin/profile/edit" className='btn btn-primary text-white button'>Edit Profile</Link>
              </div>
              <div className="card-body">
                <h5>Name: {currentUser.name}</h5>
                <hr />
                <h5>Email: {currentUser.email}</h5>
                <hr />
                <h5>Image: <img src={process.env.REACT_APP_BACKEND_API_URL + currentUser.image} alt="Image" width='100px' /></h5>
                <hr />
                <h5>Contact Number : {currentUser.contact}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
