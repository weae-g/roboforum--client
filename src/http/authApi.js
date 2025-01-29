import { LoginAPIInstance, DefaultAPIInstance } from ".";

export const AuthAPI = {
    login(email, password) {
        const url = import.meta.env.VITE_APP_AUTH_API_URL + "login"
        const data = { email, password }
        return LoginAPIInstance.post(url, { ...data })
    },

    registration(username, email, password) {
        const url = import.meta.env.VITE_APP_AUTH_API_URL + "register"
        const data = { username, email, password }
        return DefaultAPIInstance.post(url, { ...data })
    },

    logout() {
        const url = import.meta.env.VITE_APP_AUTH_API_URL + "logout"
        return DefaultAPIInstance.get(url)
    }
}