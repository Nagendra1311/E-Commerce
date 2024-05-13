import { combineReducers } from "@reduxjs/toolkit";
import { categoryReducer } from './category.reducer';
import { productReducer } from "./products.reducer";
import { userReducer } from './user.reducer';
import { cartReducer } from "./cart.reducer";
import { orderReducer } from "./order.reducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
})