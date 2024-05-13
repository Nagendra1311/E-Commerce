import { getToken } from "./token.service";

export const getOrderFromAPI = async () => {
    let response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/order", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": getToken()
        }
    })

    let data = await response.json()
    return data.order;
}

export const placeOrderToAPI = async (order) => {
    let response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/cart/place-order/" + order.cartId, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "content-type": "application/json",
            "Authorization": getToken()
        }
    })

    let data = await response.json()
}