import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useFormData } from '../../../hooks/useFormData'
import { useDispatch, useSelector } from 'react-redux'
import { addProductStart, updateProductStart } from '../../../redux/actions/product.action'
import { getCategoryStart } from './../../../redux/actions/category.action';

let initialState = {
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  price: 0,
  image: '',
  quantity: 1,
  category: '',
  status: '',
}
export default function AddOrEditProduct() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const products = useSelector(state => state.product.products)
  const categories = useSelector(state => state.category.categories)

  const [formData, imageLoading, setFormData, inputChange, uploadFiles] = useFormData(initialState, "product")

  let {
    name, slug, shortDescription, description, price, quantity, category, image, status,
  } = formData


  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateProductStart(formData))
    } else {
      dispatch(addProductStart(formData))
    }

    setTimeout(() => {
      navigate("/admin/product")
    }, 1000)
  }

  const getProductById = () => {
    let product = products.find((product) => product._id === id);

    if (product) {
      setFormData({...product, category: product.category._id})
    } else {
      navigate('/admin/product')
    }
  }

  useEffect(() => {
    if (id) {
      getProductById();
    }

    dispatch(getCategoryStart())
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} Product</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'} Product</li>
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
                <h4 className='fw-bold'>{id ? 'Edit' : 'Add'} Product</h4>
                <Link to="/admin/product" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Product Name"
                      name='name'
                      value={name}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Product Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      id="slug"
                      placeholder="Product Slug"
                      name='slug'
                      value={slug}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={uploadFiles} />
                    {
                      image && <div className='mt-4'>
                        <img src={process.env.REACT_APP_BACKEND_API_URL +image} alt="" style={{
                          height: "50px"
                        }} />
                      </div>
                    }
                  </div>

                  <div className="mb-3">
                    <label htmlFor="shortDescription" className="form-label">Product Short Description</label>
                    <textarea
                      className="form-control"
                      id="slug"
                      name='shortDescription'
                      value={shortDescription}
                      onChange={inputChange} rows={5} ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name='description'
                      value={description}
                      onChange={inputChange} rows={10}></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Product price</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      id="price"
                      placeholder="Product price"
                      name='price'
                      value={price}
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Product quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      placeholder="Product quantity"
                      name='quantity'
                      value={quantity}
                      onChange={inputChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Product Category</label>
                    <select
                      name="category"
                      id="category"
                      className='form-control'
                      value={category}
                      onChange={inputChange}>
                      <option value="" hidden>Select Category</option>
                      {
                        categories.length > 0 && categories.map((cat, index) => {
                          if(cat.status === true) {
                            return <option value={cat._id} key={index}>{cat.name}</option>
                          }
                        })
                      }
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Product Status</label>
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
