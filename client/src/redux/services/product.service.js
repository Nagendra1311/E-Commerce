import { getToken } from "./token.service";

export const getProductFromAPI = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/product", {
        headers: {
            "authorization": getToken()
        }
    })
    return await response.json()
}

export const addProductToAPI = async (product) => {
    let formData = new FormData();

    for (const key in product) {
        formData.append(key, product[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/product/store", {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const deleteProductToAPI = async (product) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/product/destroy/" + product._id, {
        method: "DELETE",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const updateProductToAPI = async (product) => {
    let formData = new FormData();

    for (const key in product) {
        formData.append(key, product[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/product/update/" + product._id, {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}