import { GET_ORDER_SUCCESS } from "../constants/order.constant";

// let previousOrders = localStorage.getItem('orders') &&  localStorage.getItem('orders') !== "undefined" ?
//     JSON.parse(localStorage.getItem('orders')) : []

const initialState = {
    // orders: previousOrders ?? [],
    orders: []
}
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_SUCCESS:
            localStorage.setItem('orders', JSON.stringify(action.payload))

            return {
                ...state,
                orders: [...action.payload]
            };

        default:
            return state;
    }
}