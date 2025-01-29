import { createStore } from 'vuex';

import auth from './modules/auth';
import user from './modules/user'
import project from './modules/projects'
import discussion from './modules/discussions'
import tag from './modules/tag'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    project,
    discussion,
    tag
  }
})
