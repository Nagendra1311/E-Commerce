import {
    GET_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS
} from "../constants/user.constant";

// let previousUsers = localStorage.getItem('users') &&  localStorage.getItem('users') !== "undefined" ?
//     JSON.parse(localStorage.getItem('users')) : []


let currentUser = localStorage.getItem('currentUser') && localStorage.getItem('currentUser') !== "undefined" ?
    JSON.parse(localStorage.getItem('currentUser')) : {
        name: '',
        email: '',
        contact: ''
    }

const initialState = {
    // users: previousUsers ?? [],


    users: [],
    currentUser: currentUser ?? {
        name: '',
        email: '',
        contact: ''
    },
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            localStorage.setItem('users', JSON.stringify(action.payload))

            return {
                ...state,
                users: [...action.payload]
            };

        case LOGIN_USER_SUCCESS:
            localStorage.setItem('currentUser', JSON.stringify(action.payload))

            return {
                ...state,
                currentUser: {
                    ...action.payload
                }
            };

        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('currentUser')

            return {
                ...state,
                currentUser: {
                    name: '',
                    email: '',
                    contact: ''
                }
            };

        default:
            return state;
    }
}