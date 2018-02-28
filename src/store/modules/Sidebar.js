import requests from '../requests'

const state = {
  drawerVisibility: false,
  themeList: []
}

const getters = {
  drawerVisibility: state => state.drawerVisibility,
  themeList: state => state.themeList
}

const actions = {
  changeDrawerVisibility ({ commit, state }) {
    commit('changeDrawerVisibility')
  },
  getThemeList ({ commit, state }) {
    return requests.get(
      'http://zhihuapi.herokuapp.com/api/4/themes',
      commit,
      'getThemeList',
      true
    )
  }
}

const mutations = {
  changeDrawerVisibility (state) {
    state.drawerVisibility = !state.drawerVisibility
  },
  getThemeList (state, { res }) {
    state.themeList = res.data.others
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
