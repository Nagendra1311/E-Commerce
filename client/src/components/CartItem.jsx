import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCart } from '../hooks/useCart';
import { addCartStart, updateCartStart } from '../redux/actions/cart.action';

export default function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.quantity)
    const currentCart = useSelector(state => state.cart.currentCart);

    const dispatch = useDispatch();

    const incrementQuantity = () => {
        setQuantity(quantity + 1)

        dispatch(updateCartStart({ itemId: item._id, quantity: quantity + 1, cartId: currentCart._id }))
    }

    const decrementQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)

            dispatch(updateCartStart({ itemId: item._id, quantity: quantity - 1, cartId: currentCart._id }))
        }
    }

    const deleteItemFormCart = () => {

    }

    return (
        <tr>
            <th>
                <div className="d-flex align-items-center">
                    <img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} className="img-fluid me-5 rounded-circle" style={{
                        width: "80px", height: "80px"
                    }} alt={item.product.name} />
                </div>
            </th>
            <td>
                <p className="mb-0 mt-4">{item.product.name}</p>
            </td>
            <td>
                <p className="mb-0 mt-4">${item.product.price}</p>
            </td>
            <td>
                <div className="input-group quantity mt-4" style={{
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
                        value={item.quantity}
                        onChange={() => { }}
                        disabled />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                            onClick={incrementQuantity}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-0 mt-4">${+item.product.price * item.quantity}</p>
            </td>
            <td>
                <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={deleteItemFormCart}>
                    <i className="fa fa-times text-danger"></i>
                </button>
            </td>
        </tr>
    )
}
