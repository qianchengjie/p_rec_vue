const state = {
  drawerVisibility: false
}

const getters = {
  drawerVisibility: state => state.drawerVisibility
}

const actions = {
  changeDrawerVisibility ({ commit, state }) {
    commit('changeDrawerVisibility')
  }
}

const mutations = {
  changeDrawerVisibility (state) {
    state.drawerVisibility = !state.drawerVisibility
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
