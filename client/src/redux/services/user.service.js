
import { getToken } from './token.service';
export const getUserFromAPI = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/user", {
        headers: {
            "authorization": getToken()
        }
    })
    return await response.json()
}

export const addUserToAPI = async (user) => {
    let formData = new FormData();

    for (const key in user) {
        formData.append(key, user[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/user/store", {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const deleteUserToAPI = async (user) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/user/destroy/" + user._id, {
        method: "DELETE",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const updateUserToAPI = async (user) => {
    let formData = new FormData();

    for (const key in user) {
        formData.append(key, user[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/user/update/" + user._id, {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const addRegisterToAPI = async (user) => {
    console.log(user);


    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/register", {
        body: JSON.stringify(user),
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
    })

    return await response.json()
}


export const loginUserToAPI = async (user) => {

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/login", {
        body: JSON.stringify(user),
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
    })
    const data = await response.json();
    localStorage.setItem('jwt_token', data.token)



    return data;
}