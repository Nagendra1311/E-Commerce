import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../../hooks/useCart';
import { addCartStart } from '../../redux/actions/cart.action';

export default function Details() {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate()
  const products = useSelector(state => state.product.products)
  const currentCart = useSelector(state => state.cart.currentCart);
  const currentUser = useSelector(state => state.user.currentUser);


  let [addCart] = useCart();
  const dispatch = useDispatch()

  const addToCart = () => {
    if (!currentUser.name) {
      navigate('/login')
    }

    let response = addCart({ ...currentCart }, product, currentUser, quantity)
    dispatch(addCartStart(response))
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1)
    }
  }

  const getProductById = () => {
    let product = products.find((product) => product.id === id);

    if (product) {
      setProduct(product)

      let item = currentCart.items.find(item => item.id === product.id);

      if (item) {
        setQuantity(item.purchaseQuantity)
      }

    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{product?.name}</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{product?.name}</li>
        </ol>
      </div>

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-12 col-xl-12">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      <img src={product?.image} className="img-fluid rounded" alt={product?.name} style={{
                        height: "100%",
                        width: "100%",
                      }} />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product?.name}</h4>
                  <p className="mb-3">Category: {product?.category}</p>
                  <h5 className="fw-bold mb-3">${product?.price}</h5>

                  <p className="mb-4">{product?.shortDescription}</p>
                  <div className="input-group quantity mb-5" style={{
                    width: "100px"
                  }}>
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus rounded-circle bg-light border"
                        onClick={decrementQuantity} >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      value={quantity}
                      disabled
                      onChange={() => { }} />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-plus rounded-circle bg-light border"
                        onClick={incrementQuantity}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={addToCart}
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                    <i className="fa fa-shopping-bag me-2 text-primary"></i>
                    Add to cart
                  </button>
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                        id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                        aria-controls="nav-about" aria-selected="true">Description</button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                      {product?.description}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
