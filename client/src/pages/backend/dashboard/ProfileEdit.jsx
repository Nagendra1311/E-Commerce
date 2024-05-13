import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormData } from '../../../hooks/useFormData';
import Sidebar from '../../../layouts/Sidebar';
import { editProfileUserStart } from '../../../redux/actions/user.action';

export default function ProfileEdit() {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [formData, imageLoading, ,  inputChange, uploadFiles] = useFormData(user, "user")

  let { name, email, contact, image, status } = formData

  const submit = (event) => {
    event.preventDefault()

    dispatch(editProfileUserStart(formData))

    setTimeout(() => {
      navigate("/admin/dashboard")
    }, 1000)
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Edit Profile </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Edit Profile </li>
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
                <h4 className='fw-bold'>Edit Profile</h4>
                <Link to="/admin/dashboard" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="User Name"
                      name='name'
                      value={name}
                      onChange={(event) => inputChange(event)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">User email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="User email"
                      name='email'
                      value={email}
                      onChange={inputChange} />
                  </div>
              
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">User Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      placeholder="User contact"
                      name='contact'
                      value={contact}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">User Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={uploadFiles} />
                    {
                      image && <div className='mt-4'>
                        <img src={image} alt="" style={{
                          height: "50px"
                        }} />
                      </div>
                    }
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">User Status</label>
                    <select
                      name="status"
                      id="status"
                      className='form-control'
                      value={status}
                      onChange={inputChange}>
                      <option value="" hidden>Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 d-grid">
                      <button type='submit' className='btn btn-primary text-white' disabled={imageLoading}>Submit</button>
                    </div>
                    <div className="col-sm-6 d-grid">
                      <button type='reset' className='btn btn-warning text-white'>Reset</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
