import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormData } from '../../../hooks/useFormData';
import Sidebar from '../../../layouts/Sidebar';
import { addUserStart, updateUserStart } from '../../../redux/actions/user.action';

const initialState = {
  name: '',
  email: '',
  password: '',
  contact: '',
  image: '',
  role: '',
  status: '0',
}

export default function AddOrEditUser() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const users = useSelector(state => state.user.users);

  const [formData, imageLoading, setFormData, inputChange, uploadFiles] = useFormData(initialState, "user")

  let { name, email, password, contact, image, status, role } = formData

  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateUserStart(formData))
    } else {
      dispatch(addUserStart(formData))
    }

    setTimeout(() => {
      navigate("/admin/user")
    }, 1000)
  }

  const getUserById = () => {
    let user = users.find((usr) => usr._id === id)

    if (user) {
      setFormData(user);
    } else {
      navigate("/admin/user")
    }
  }

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} User</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'} User</li>
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
                <h4 className='fw-bold'>{id ? 'Edit' : 'Add'} User</h4>
                <Link to="/admin/user" className='btn btn-primary text-white button'>Back</Link>
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
                      onChange={inputChange} />
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
                  {
                    !id && <div className="mb-3">
                      <label htmlFor="password" className="form-label">User Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="User password"
                        name='password'
                        value={password}
                        onChange={inputChange}
                      />
                    </div>
                  }

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
                    <label htmlFor="role" className="form-label">User Role</label>
                    <select
                      name="role"
                      id="role"
                      className='form-control'
                      value={role}
                      onChange={inputChange}>
                      <option value="" hidden>Select Role</option>
                      <option value="1">Admin</option>
                      <option value="0">Customer</option>
                    </select>
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
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
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
