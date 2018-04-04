import requests from '../requests'

const state = {}

const getters = {}

const actions = {
  login ({ commit, state }, payload) {
    return requests.post(
      '/userLoginByTelephone',
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
  },
  getVCodeForRegister ({ commit, state }, payload) {
    // 961315
    return requests.post(
      '/getVCodeForRegister',
      payload,
      commit,
      'getVCodeForRegister'
    )
  }
}

const mutations = {
  login (state, { res }) {
    localStorage.userinfo = JSON.stringify(res.data.data)
    state.drawerVisibility = !state.drawerVisibility
  },
  register (state, { res }) {},
  getVCodeForRegister (state, { res }) {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
