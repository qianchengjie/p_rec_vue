import requests from '../requests'

const state = {}

const getters = {}

const actions = {
  login ({ commit, state }, payload) {
    return requests.post(
      '/userLogin',
      payload,
      commit,
      'login'
    )
  },
  register ({ commit, state }, payload) {
    return requests.post(
      '/userRegister',
      payload,
      commit,
      'register'
    )
  }
}

const mutations = {
  login (state, { res }) {
    state.drawerVisibility = !state.drawerVisibility
  },
  register (state, { res }) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
