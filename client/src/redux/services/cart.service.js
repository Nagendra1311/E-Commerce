import { defaultValue } from "../reducers/cart.reducer";
import { getToken } from './token.service';

export const getCartFromAPI = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/cart", {
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    }
    )

    const data = await response.json()
    if (!data.currentCart) {
        return defaultValue
    }
    return data.currentCart
}

export const addCartToAPI = async (product) => {
    console.log(product);
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/cart/add/" + product._id, {
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    }
    )
}


export const updateCartToAPI = async (product) => {
    let response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/cart/update/" + product.itemId, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "content-type": "application/json",
            "Authorization": getToken()
        }
    })

    let data = await response.json()
}