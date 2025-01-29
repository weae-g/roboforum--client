import { ProjectAPI } from "@/http/projectApi";
const state = {
    publicProjects: null,
    project: null,
    projectsComments: null,
    favoriteProjects: [],

}

const getters = {
    getPublicProjects: (state) => state.publicProjects,
    getProject: (state) => state.project,
    getProjectComments: (state) => state.projectsComments,
    getFavoriteProjects: (state) => state.favoriteProjects,
}

const actions = {
    async GET_PUBLIC_PROJECTS({ commit }) {
        return ProjectAPI.getPublicProjects().then((res) => {
            commit('setPublicProjects', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async GET_ONE_PROJECT({ commit }, { projectId }) {
        return await ProjectAPI.getOneProject(projectId).then((res) => {
            commit('setProject', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async GET_PROJECT_COMMENTS({ commit }, { projectId }) {
        return await ProjectAPI.getProjectComments(projectId).then((res) => {
            commit('setProjectComments', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async POST_PROJECT_COMMENT({ _ }, { projectId, userId, comment }) {
        return await ProjectAPI.postProjectComment(projectId, userId, comment)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async POST_PROJECT_COMMENT_ANSWER({ _ }, { projectId, userId, comment, userCommentId }) {
        return await ProjectAPI.postProjectCommentAnswer(projectId, userId, comment, userCommentId)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_PROJECT_IMAGE({ commit }, { projectId, imageId }) {
        return await ProjectAPI.deleteProjectImage(projectId, imageId).then((res) => {
            commit('setProject', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async SEARCH_PROJECT({ commit }, searchTerm) {
        return await ProjectAPI.searchProject(searchTerm).then((res) => {
            commit('setPublicProjects', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async GET_FAVORITE_PROJECTS({ commit }, { userId }) {
        return await ProjectAPI.getFavoriteProjects(userId)
            .then((res) => {
                commit('setFavoriteProjects', res.data)
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async POST_FAVORITE_PROJECT({ commit }, { userId, projectId }) {
        return await ProjectAPI.postFavoriteProject(userId, projectId)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_FAVORITE_PROJECT({ commit }, { userId, projectId }) {
        return await ProjectAPI.deleteFavoriteProject(userId, projectId)
            .then()
            .catch((error) => {
                console.log(error);
                return error;
            })
    }

}

const mutations = {
    setPublicProjects(state, publicProjects) {
        state.publicProjects = publicProjects;
        localStorage.setItem('publicProjects', JSON.stringify(publicProjects));
    },

    setProject(state, project) {
        state.project = project;
        localStorage.setItem('project', JSON.stringify(project));
    },

    setProjectComments(state, projectComments) {
        state.projectComments = projectComments;
        localStorage.setItem('projectComments', JSON.stringify(projectComments));
    },

    setFavoriteProjects(state, favoriteProjects) {
        state.favoriteProjects = favoriteProjects;
        localStorage.setItem('favoriteProjects', JSON.stringify(favoriteProjects));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
