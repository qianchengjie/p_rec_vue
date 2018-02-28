const state = {
  isLoading: false,
  loading: false
}

const getters = {
  isLoading: state => state.isLoading,
  loading: state => state.loading
}

const actions = {
  updateLoading ({ commit, state }, loading) {
    commit('updateLoading', loading)
  }
}

const mutations = {
  updateLoadingStatus (state, { isLoading }) {
    state.isLoading = isLoading
  },
  updateLoading (state, loading) {
    state.loading = loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
