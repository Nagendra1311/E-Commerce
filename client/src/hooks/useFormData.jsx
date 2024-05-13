import { useState } from "react";;


export const useFormData = (initialState, flag) => {
    const [formData, setFormData] = useState(initialState);
    const [imageLoading, setImageLoading] = useState(false);

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const uploadFiles = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            image: event.target.files[0]
        }))
    }

    return [formData, imageLoading, setFormData, inputChange, uploadFiles]
}