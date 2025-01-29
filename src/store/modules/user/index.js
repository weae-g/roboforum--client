import { LoginAPIInstance, DefaultAPIInstance } from "@/http";
import { UserAPI } from "@/http/userApi";

const state = {
    userProfile: null,
    userProjects: [],
    userDiscussions: [],
}

const getters = {
    getUserProfile: (state) => state.userProfile,
    getUserProjects: (state) => state.userProjects,
    getUserDiscussions: (state) => state.userDiscussions,
}

const actions = {
    async GET_USER_PROFILE({ commit }, { userId }) {
        return UserAPI.getUserProfile(userId).then((res) => {
            commit('setUserProfile', res.data)
        })
            .catch((error) => {
                console.log(error);
                if (error.status === 401) {
                    localStorage.clear();
                    location.reload()
                }
                return error;
            })
    },

    async UPDATE_USER({ commit }, { userId, username }) {
        return UserAPI.updateUser(userId, username).then((res) => {
            commit('setUser', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_USER_PROFILE({ commit }, { userId, name, bio, company, location, links, image }) {
        return UserAPI.updateUserProfile(userId, name, bio, company, location, image, links).then((res) => {
            commit('setUserProfile', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    //////////////////////////////////////////////////////////////////////

    async GET_USER_PROJECTS({ commit }, { userId }) {
        return UserAPI.getUserProjects(userId).then((res) => {
            commit('setUserProjects', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async POST_USER_PROJECT({ _ }, { userId, title, description, projectTypeId, projectFiles, tags }) {
        return UserAPI.postUserProject(userId, title, description, projectTypeId, projectFiles, tags).then((res) => {
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_USER_PROJECT({ _ }, { projectId, userId, title, description, projectTypeId, projectFiles, tags }) {
        return UserAPI.updateUserProject(projectId, userId, title, description, projectTypeId, projectFiles, tags).then((res) => {
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_USER_PROJECT({ _ }, { projectId }) {
        return UserAPI.deleteUserProject(projectId)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    //////////////////////////////////////////////////////////////////////

    async GET_USER_DISCUSSIONS({ commit }, { userId }) {
        return UserAPI.getUserDiscussions(userId).then((res) => {
            commit('setUserDiscussions', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async POST_USER_DISCUSSION({ _ }, { userId, title, description, discussionFiles, tags }) {
        return UserAPI.postUserDiscussion(userId, title, description, discussionFiles, tags).then((res) => {
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_USER_DISCUSSION({ _ }, { discussionId, userId, title, description, discussionFiles, tags }) {
        return UserAPI.updateUserDiscussion(discussionId, userId, title, description, discussionFiles, tags).then((res) => {
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_USER_DISCUSSION({ _ }, { discussionId }) {
        return UserAPI.deleteUserDiscussion(discussionId)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
}

const mutations = {
    setUserProfile(state, userProfile) {
        state.userProfile = userProfile;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    },

    setUserProjects(state, userProjects) {
        state.userProjects = userProjects;
        localStorage.setItem('userProjects', JSON.stringify(userProjects));
    },

    setUserDiscussions(state, userDiscussions) {
        state.userDiscussions = userDiscussions;
        localStorage.setItem('userDiscussions', JSON.stringify(userDiscussions));
    },

    setUser(state, user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
