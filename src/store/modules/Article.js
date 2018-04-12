import Requests from '../requests'

const state = {
  article: {},
  comment: [],
  labels: [],
  labelsActive: 0,
  articleList: [],
  articleLoading: false,
  collectList: []
}

const getters = {
  article: state => state.article,
  comment: state => state.comment,
  labels: state => state.labels,
  articleList: state => state.articleList,
  labelsActive: state => state.labelsActive,
  articleLoading: state => state.articleLoading,
  collectList: state => state.collectList
}

const actions = {
  getArticle ({ commit }, payload) {
    return Requests.do('getArticle', commit, payload)
  },
  findComment ({ commit }, payload) {
    return Requests.do('findComment', commit, payload)
  },
  addComment ({ commit }, payload) {
    return Requests.do('addComment', commit, payload)
  },
  getLabels ({ commit }) {
    return Requests.do('getLabels', commit)
  },
  setLabelsActive ({ commit }, payload) {
    commit('setLabelsActive', payload)
  },
  getArticles ({ commit }, payload) {
    return Requests.do('getArticles', commit, payload)
  },
  getArticlesByLabelId ({ commit }, payload) {
    return Requests.do('getArticlesByLabelId', commit, payload, '/' + payload.labelId)
  },
  updateArticleLoading ({ commit }, payload) {
    commit('updateArticleLoading', payload)
  },
  addCollect ({ commit }, payload) {
    return Requests.do('addCollect', commit, payload)
  },
  cancelCollect ({ commit }, payload) {
    return Requests.do('cancelCollect', commit, payload)
  },
  addAgree ({ commit, state }, payload) {
    state.article.flagAgree === 1 ? state.article.agreeNum-- : state.article.agreeNum++
    state.article.flagAgree = state.article.flagAgree === 1 ? 0 : 1
    return Requests.do('addAgree', commit, payload)
  },
  addDisAgree ({ commit, state }, payload) {
    state.article.flagDisagree === 1 ? state.article.disagressNum-- : state.article.disagressNum++
    state.article.flagDisagree = state.article.flagDisagree === 1 ? 0 : 1
    return Requests.do('addDisAgree', commit, payload)
  },
  getCollectList ({ commit }, payload) {
    return Requests.do('getCollectList', commit, payload)
  },
  userAddLabel ({ commit }, payload) {
    let labelIds = ''
    for (let labelId of payload.labelIds) {
      labelIds += labelId + '/'
    }
    payload.labelIds = labelIds.substr(0, labelIds.length - 1)
    return Requests.do('userAddLabel', commit, payload)
  },
  userFocusOn ({ commit }, payload) {
    return Requests.do('userFocusOn', commit, payload)
  },
  dislike ({ commit }, payload) {
    return Requests.do('dislike', commit, payload)
  }
}

const mutations = {
  getArticle (state, { res, articleId }) {
    state.article = res.data.data
    // for (let i = 0; i < state.articleList.length; i++) {
    //   for (let j = 0; j < state.articleList[i].content.length; j++) {
    //     if (state.articleList[i].content[j].id === Number(articleId)) {
    //       state.article = state.articleList[i].content[j]
    //     }
    //   }
    // }
  },
  findComment (state, { res }) {
    state.comment = res.data.data
    state.comment.reverse()
  },
  addComment (state, { res, payload }) {
    if (res.data.code === 0) {
      if (!payload.pId) {
        state.comment.unshift(res.data.data)
      }
      state.article.plNum++
    }
  },
  getLabels (state, { res }) {
    state.labels = res.data.data
    state.articleList = []
    for (let i = 0; i <= state.labels.length; i++) {
      if (i === 0) {
        state.articleList.push({
          labelId: 0,
          labelName: '首页',
          content: [],
          scrollTop: 0,
          loading: true
        })
      } else {
        let label = state.labels[i - 1]
        state.articleList.push({
          labelId: label.id,
          labelName: label.labelName,
          content: [],
          scrollTop: 0,
          loading: true
        })
      }
    }
  },
  setLabelsActive (state, { index }) {
    state.labelsActive = index
  },
  getArticles (state, { res }) {
    console.log(res.data.data)
    state.articleList[0].content = res.data.data
    state.articleList[0].loading = false
  },
  getArticlesByLabelId (state, { res, payload }) {
    for (let i = 1; i < state.articleList.length; i++) {
      if (state.articleList[i].labelId === payload.labelId) {
        state.articleList[i].content = res.data.data
        state.articleList[i].loading = false
      }
    }
  },
  updateArticleLoading (state, { loading }) {
    state.articleLoading = loading
  },
  addCollect (state, { res }) {
    if (res.data.code === 0) {
      state.article.flagCollect = 1
    }
  },
  cancelCollect (state, { res }) {
    if (res.data.code === 0) {
      state.article.flagCollect = 0
    }
  },
  addAgree (state, { res }) {
    if (res.data.code !== 0) {
      state.article.flagAgree === 1 ? state.article.agreeNum-- : state.article.agreeNum++
      state.article.flagAgree = state.article.flagAgree === 1 ? 0 : 1
    }
  },
  addDisAgree (state, { res }) {
    if (res.data.code !== 0) {
      state.article.flagDisagree === 1 ? state.article.disagressNum-- : state.article.disagressNum++
      state.article.flagDisagree = state.article.flagDisagree === 1 ? 0 : 1
    }
  },
  getCollectList (state, { res }) {
    state.collectList = res.data.data
  },
  userAddLabel (state, { res }) {
    if (res.data.code === 0) {
      let userinfo = JSON.parse(localStorage.userinfo)
      userinfo.userType = 0
      localStorage.userinfo = JSON.stringify(userinfo)
    }
  },
  userFocusOn (state, { res }) {},
  dislike (state, { res, payload }) {
    console.log(res)
    if (res.data.code === 0) {
      for (let i = 0; i < state.articleList[state.labelsActive].content.length; i++) {
        if (state.articleList[state.labelsActive].content[i].id === payload.articleId) {
          state.articleList[state.labelsActive].content.splice(i, 1)
        }
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
