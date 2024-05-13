import {
    put,
    takeLatest
} from "redux-saga/effects"

import {
    ADD_PRODUCT_START,
    DELETE_PRODUCT_START,
    GET_PRODUCT_START,
    UPDATE_PRODUCT_START
} from "../constants/product.constant";
import { addProductError, deleteProductError, getProductError, getProductStart, getProductSuccess, updateProductError } from "../actions/product.action";
import { addProductToAPI, deleteProductToAPI, getProductFromAPI, updateProductToAPI } from "../services/product.service";

function* getProduct() {
    try {
        let result = yield getProductFromAPI()
        yield put(getProductSuccess(result))
    } catch (error) {
        yield put(getProductError(error.message))
    }
}

function* addProduct({
    payload
}) {
    try {
        yield addProductToAPI(payload)
        yield put(getProductStart())
    } catch (error) {
        yield put(addProductError(error.message))
    }
}

function* updateProduct({
    payload
}) {
    try {
        yield updateProductToAPI(payload)
        yield put(getProductStart())
    } catch (error) {
        yield put(updateProductError(error.message))
    }
}

function* deleteProduct({
    payload
}) {
    try {
        yield deleteProductToAPI(payload)
        yield put(getProductStart())
    } catch (error) {
        yield put(deleteProductError(error.message))
    }
}

export default function* product() {
    yield takeLatest(GET_PRODUCT_START, getProduct)
    yield takeLatest(ADD_PRODUCT_START, addProduct)
    yield takeLatest(DELETE_PRODUCT_START, deleteProduct)
    yield takeLatest(UPDATE_PRODUCT_START, updateProduct)
}