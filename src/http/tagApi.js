import { LoginAPIInstance } from "."

export const TagAPI = {
    getAllTags() {
        const url = import.meta.env.VITE_APP_TAG_API_URL
        return LoginAPIInstance.get(url)
    },
}