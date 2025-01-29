import { DefaultAPIInstance, LoginAPIInstance } from "."

export const DiscussionAPI = {
    getPublicDiscussions() {
        const url = import.meta.env.VITE_APP_DISCUSSION_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneDiscussion(discussionId) {
        const url = import.meta.env.VITE_APP_DISCUSSION_API_URL + 'one' + `/${discussionId}`
        return DefaultAPIInstance.get(url)
    },

    getDiscussionComments(discussionId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_COMMENT_API_URL + `/${discussionId}`
        return DefaultAPIInstance.get(url)
    },

    deleteDiscussionImage(discussionId, imageId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_API_URL + `${discussionId}` + `/${imageId}`
        return LoginAPIInstance.delete(url)
    },

    postDiscussionComment(discussionId, userId, comment) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_COMMENT_API_URL + `/${discussionId}`
        const data = { userId, comment }
        return LoginAPIInstance.post(url, { ...data })
    },

    postDiscussionCommentAnswer(discussionId, userId, comment, userCommentId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_COMMENT_ANSWER_API_URL + `/${discussionId}`
        const data = { userId, comment, userCommentId }
        return LoginAPIInstance.post(url, { ...data })
    },

    searchDiscussion(searchTerm) {
        const url = import.meta.env.VITE_APP_DISCUSSION_SEARCH_API_URL + searchTerm
        return DefaultAPIInstance.get(url)
    },

    getFavoriteDiscussions(userId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_FAVORITE_API_URL + `/${userId}`
        return LoginAPIInstance.get(url)
    },

    postFavoriteDiscussion(userId, discussionId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_FAVORITE_API_URL + `/${userId}` + `/${discussionId}`
        return LoginAPIInstance.post(url)
    },

    deleteFavoriteDiscussion(userId, discussionId) {
        const url = import.meta.env.VITE_APP_USER_DISCUSSION_FAVORITE_API_URL + `/${userId}` + `/${discussionId}`
        return LoginAPIInstance.delete(url)
    },
}