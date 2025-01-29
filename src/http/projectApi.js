import { DefaultAPIInstance, LoginAPIInstance } from "."

export const ProjectAPI = {
    getPublicProjects() {
        const url = import.meta.env.VITE_APP_PROJECTS_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneProject(projectId) {
        const url = import.meta.env.VITE_APP_PROJECTS_API_URL + 'one' + `/${projectId}`
        return DefaultAPIInstance.get(url)
    },

    getProjectComments(projectId) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_COMMENT_API_URL + `/${projectId}`
        return DefaultAPIInstance.get(url)
    },

    deleteProjectImage(projectId, imageId) {
        const url = import.meta.env.VITE_APP_USER_PROJECTS_API_URL + `${projectId}` + `/${imageId}`
        return LoginAPIInstance.delete(url)
    },

    postProjectComment(projectId, userId, comment) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_COMMENT_API_URL + `/${projectId}`
        const data = { userId, comment }
        return LoginAPIInstance.post(url, { ...data })
    },

    postProjectCommentAnswer(projectId, userId, comment, userCommentId) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_COMMENT_ANSWER_API_URL + `/${projectId}`
        const data = { userId, comment, userCommentId }
        return LoginAPIInstance.post(url, { ...data })
    },

    searchProject(searchTerm) {
        const url = import.meta.env.VITE_APP_PROJECTS_SEARCH_API_URL + searchTerm
        return DefaultAPIInstance.get(url)
    },

    getFavoriteProjects(userId) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_FAVORITE_API_URL + `/${userId}`
        return LoginAPIInstance.get(url)
    },

    postFavoriteProject(userId, projectId) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_FAVORITE_API_URL + `/${userId}` + `/${projectId}`
        return LoginAPIInstance.post(url)
    },

    deleteFavoriteProject(userId, projectId) {
        const url = import.meta.env.VITE_APP_USER_PROJECT_FAVORITE_API_URL + `/${userId}` + `/${projectId}`
        return LoginAPIInstance.delete(url)
    },
}