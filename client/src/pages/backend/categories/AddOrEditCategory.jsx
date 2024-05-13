import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryStart, getCategoryStart, updateCategoryStart } from '../../../redux/actions/category.action'
import { useFormData } from '../../../hooks/useFormData'
import { getCartStart } from '../../../redux/actions/cart.action'

let initialState = {
  name: '',
  image: '',
  status: 0,
}

export default function AddOrEditCategory() {
  let { id } = useParams();

  const categories = useSelector(state => state.category.categories)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, imageLoading, setFormData, inputChange, uploadFiles] = useFormData(initialState, "category");

  let { name, status, image } = formData;

  const submit = (event) => {
    event.preventDefault();
    console.log(formData);

    if (id) {
      dispatch(updateCategoryStart(formData))
    } else {
      dispatch(addCategoryStart(formData))
    }

    setTimeout(() => {
      navigate('/admin/category')
    }, 1000)
  }

  const getCategoryById = () => {
    let category = categories.find((category) => category._id === id);

    console.log(categories);
    if (category) {
      setFormData(category)
    } else {
      navigate('/admin/category')
    }
  }

  useEffect(() => {
    if (id) {
      getCategoryById();

      dispatch(getCategoryStart())
    }
  }, [id, categories.length])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} Category</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'} Category</li>
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
                <h4 className='fw-bold'>{id ? 'Edit' : 'Add'} Category</h4>
                <Link to="/admin/category" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Category Name"
                      name='name'
                      value={name}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Category Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={uploadFiles} />

                    {
                      image && <div className='mt-4'>
                        <img src={process.env.REACT_APP_BACKEND_API_URL + image} alt="" style={{
                          height: "50px"
                        }} />
                      </div>
                    }

                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Category Status</label>
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
