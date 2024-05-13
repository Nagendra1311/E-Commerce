import { getToken } from "./token.service";

export const getCategoryFromAPI = async () => {

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/category", {
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const addCategoryToAPI = async (category) => {

    let formData = new FormData();

    for (const key in category) {
        formData.append(key, category[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/category/store", {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    }
    )

    return await response.json()
}

export const deleteCategoryToAPI = async (category) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/category/destroy/" + category._id, {
        method: "DELETE",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}

export const updateCategoryToAPI = async (category) => {
    let formData = new FormData();

    for (const key in category) {
        formData.append(key, category[key])
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_API_URL + "/api/admin/category/update/" + category._id, {
        body: formData,
        method: "POST",
        headers: {
            "authorization": getToken()
        }
    })

    return await response.json()
}