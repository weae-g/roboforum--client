import { FormDataAPIInstance, LoginAPIInstance } from "."

export const UserAPI = {
    getUserProfile(userId) {
        const url = import.meta.env.VITE_APP_USER_PROFILE_API_URL + `${userId}`
        return LoginAPIInstance.get(url)
    },

    updateUser(userId, username) {
        const url = import.meta.env.VITE_APP_USER_API_URL + `${userId}`
        const data = { username }
        return LoginAPIInstance.put(url, { ...data })
    },

    updateUserProfile(userId, name, bio, company, location, image, links) {
        const url = import.meta.env.VITE_APP_USER_PROFILE_API_URL + `${userId}`

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('name', name)
        formData.append('bio', bio)
        formData.append('company', company)
        formData.append('location', location)

        formData.append('image', image)

        for (let i = 0; i < links.length; i++) {
            formData.append('links[]', JSON.stringify(links[i]));
        }

        return FormDataAPIInstance.put(url, formData)
    },

    getUserProjects(userId) {
        const url = import.meta.env.VITE_APP_USER_PROJECTS_API_URL + `${userId}`
        return LoginAPIInstance.get(url)
    },

    postUserProject(userId, title, description, projectTypeId, projectFiles, tags) {
        const url = import.meta.env.VITE_APP_PROJECTS_API_URL

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('projectTypeId', projectTypeId)
        formData.append('userId', userId)
        projectFiles.forEach((file, index) => {
            if (file instanceof File)
                formData.append('projectFiles', file);
        });

        formData.append('tags', tags)

        return FormDataAPIInstance.post(url, formData)
    },

    updateUserProject(projectId, userId, title, description, projectTypeId, projectFiles, tags) {
        const url = import.meta.env.VITE_APP_PROJECTS_API_URL + `${projectId}`

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('projectTypeId', projectTypeId)
        formData.append('userId', userId)
        projectFiles.forEach((file, index) => {
            if (file instanceof File)
                formData.append('projectFiles', file);
        });

        formData.append('tags', tags)

        return FormDataAPIInstance.put(url, formData)
    },

    deleteUserProject(projectId) {
        const url = import.meta.env.VITE_APP_PROJECTS_API_URL + `${projectId}`
        return LoginAPIInstance.delete(url)
    },

    ////////////////

    getUserDiscussions(userId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_API_URL + `${userId}`
        return LoginAPIInstance.get(url)
    },

    postUserDiscussion(userId, title, description, discussionFiles, tags) {
        const url = import.meta.env.VITE_APP_DISCUSSION_API_URL

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('userId', userId)
        discussionFiles.forEach((file, index) => {
            if (file instanceof File)
                formData.append('discussionFiles', file);
        });

        formData.append('tags', tags)

        return FormDataAPIInstance.post(url, formData)
    },

    updateUserDiscussion(discussionId, userId, title, description, discussionFiles, tags) {
        const url = import.meta.env.VITE_APP_DISCUSSION_API_URL + `${discussionId}`

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('userId', userId)
        discussionFiles.forEach((file, index) => {
            if (file instanceof File)
                formData.append('discussionFiles', file);
        });

        formData.append('tags', tags)

        return FormDataAPIInstance.put(url, formData)
    },

    deleteUserDiscussion(discussionId) {
        const url = import.meta.env.VITE_APP_DISCUSSION_API_URL + `${discussionId}`
        return LoginAPIInstance.delete(url)
    },

}