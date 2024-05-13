import {
    put,
    takeLatest
} from "redux-saga/effects"
import { ADD_CART_START, GET_CART_START, UPDATE_CART_START } from "../constants/cart.constant"
import { addCartError, getCartError, getCartStart, getCartSuccess, updateCartError } from "../actions/cart.action"
import { addCartToAPI, getCartFromAPI, updateCartToAPI } from "../services/cart.service"


function* getCart() {
    try {
        let result = yield getCartFromAPI()
        yield put(getCartSuccess(result))
    } catch (error) {
        yield put(getCartError(error.message))
    }
}

function* addCart({
    payload
}) {
    try {
        yield addCartToAPI(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

function* updateCart({
    payload
}) {
    try {
        yield updateCartToAPI(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(updateCartError(error.message))
    }
}


export default function* cart() {
    yield takeLatest(GET_CART_START, getCart)
    yield takeLatest(ADD_CART_START, addCart)
    yield takeLatest(UPDATE_CART_START, updateCart)

}