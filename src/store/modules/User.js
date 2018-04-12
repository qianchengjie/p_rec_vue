import requests from '../requests'

const state = {
  userinfo: localStorage.userinfo ? JSON.parse(localStorage.userinfo) : null
}

const getters = {
  userinfo: state => state.userinfo
}

const actions = {
  login ({ commit, state }, payload) {
    return requests.do('login', commit, payload)
  },
  logOut ({ commit, state }) {
    state.userinfo = null
    localStorage.removeItem('userinfo')
  },
  getCode ({ commit, state }, payload) {
    return requests.do('getCode', commit, payload)
  }
}

const mutations = {
  login (state, { res }) {
    if (res.data.code === 0) {
      state.userinfo = res.data.data
      localStorage.userinfo = JSON.stringify(res.data.data)
    }
    state.drawerVisibility = !state.drawerVisibility
  },
  getCode (state, { res }) {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
