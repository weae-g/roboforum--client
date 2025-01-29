import { TagAPI } from "@/http/tagApi";
const state = {
    tags: [],
}

const getters = {
    getTags: (state) => state.tags,
}

const actions = {
    async GET_ALL_TAGS({ commit }) {
        return TagAPI.getAllTags().then((res) => {
            commit('setTags', res.data)
        })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
}

const mutations = {
    setTags(state, tags) {
        state.tags = tags;
        localStorage.setItem('tags', JSON.stringify(tags));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
