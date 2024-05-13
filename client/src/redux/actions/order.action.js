import { GET_ORDER_ERROR, GET_ORDER_START, GET_ORDER_SUCCESS, PLACE_ORDER_ERROR, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from "../constants/order.constant"

// place order
export const placeOrderStart = (order) => ({
    type: PLACE_ORDER_START,
    payload: order
})

export const placeOrderSuccess = (order) => ({
    type: PLACE_ORDER_SUCCESS,
    payload: order
})

export const placeOrderError = (error) => ({
    type: PLACE_ORDER_ERROR,
    payload: error
})

// get
export const getOrderStart = () => ({
    type: GET_ORDER_START
})

export const getOrderSuccess = (cart) => ({
    type: GET_ORDER_SUCCESS,
    payload: cart
})

export const getOrderError = (error) => ({
    type: GET_ORDER_ERROR,
    payload: error
})

