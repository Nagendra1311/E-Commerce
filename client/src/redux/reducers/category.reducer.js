import { GET_CATEGORY_SUCCESS } from "../constants/category.constant";

// let previousCategory = localStorage.getItem('categories') &&  localStorage.getItem('categories') !== "undefined" ? 
//         JSON.parse(localStorage.getItem('categories')) : []

const initialState = {
    // categories: previousCategory ?? []
    categories: []
}

export const categoryReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case GET_CATEGORY_SUCCESS:
            localStorage.setItem('categories', JSON.stringify(action.payload))

            return {
                ...state,
                categories: [...action.payload]
            }
    
        default:
            return state;
    }
}