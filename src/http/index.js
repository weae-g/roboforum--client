import axios from 'axios'

const defaultConfig = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true

}

export const DefaultAPIInstance = axios.create(defaultConfig)

const loginConfig = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
    },
    withCredentials: true
}

export const LoginAPIInstance = axios.create(loginConfig)

const formDataConfig = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': localStorage.getItem('token')
    },
    withCredentials: true

}


export const FormDataAPIInstance = axios.create(formDataConfig)

