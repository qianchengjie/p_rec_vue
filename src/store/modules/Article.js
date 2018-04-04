import requests from '../requests'

const state = {
  labels: [],
  article: {},
  articleList: [],
  themeArticleListIndex: 0,
  topList: [],
  themeList: [],
  themeArticleList: [],
  articleListLoading: true
}

const getters = {
  article: state => state.article,
  articleList: state => state.articleList,
  themeArticleListIndex: state => state.themeArticleListIndex,
  topList: state => state.topList,
  themeList: state => state.themeList,
  themeArticleList: state => state.themeArticleList,
  articleListLoading: state => state.articleListLoading,
  labels: state => state.labels
}

const actions = {
  setThemeArticleListIndex ({ commit, state }, { index }) {
    commit('setThemeArticleListIndex', { index })
  },
  getArticleList ({ commit, state }) {
    return requests.get(
      'http://zhihuapi.herokuapp.com/api/4/news/latest',
      commit,
      'getArticleList',
      true
    )
  },
  getArticle ({ commit, state }, { articleId }) {
    return requests.get(
      'http://zhihuapi.herokuapp.com/api/4/news/' + articleId,
      commit,
      'getArticle',
      true
    )
  },
  getExtraInfo ({ commit, state }) {
    return requests.get('http://zhihuapi.herokuapp.com/api/4/story-extra/' + state.article.id, true)
  },
  getThemeList ({ commit, state }) {
    return requests.get(
      'http://zhihuapi.herokuapp.com/api/4/themes',
      commit,
      'getThemeList',
      true
    )
  },
  getThemeArticleList ({ commit, state }, { themeId }) {
    return requests.get(
      'http://zhihuapi.herokuapp.com/api/4/theme/' + themeId,
      { themeId },
      commit,
      'getThemeArticleList',
      true
    )
  },
  getLabels ({ commit, state }) {
    return requests.get(
      'getLabels',
      commit,
      'getLabels'
    )
  },
  getArticles ({ commit, state }, { labelId }) {
    return requests.get(
      '/article/getArticles/' + labelId,
      commit,
      'getArticles'
    )
  }
}

const mutations = {
  setThemeArticleListIndex (state, { index }) {
    state.themeArticleListIndex = index
  },
  getArticleList (state, { res }) {
    state.articleList = res.data.stories
    state.topList = []
    for (let item of res.data.top_stories) {
      state.topList.push({
        id: item.id,
        url: 'article/' + item.id,
        title: item.title,
        img: item.image,
        scrollTop: 0
      })
    }
    state.articleListLoading = false
  },
  getArticle (state, { res }) {
    state.article = res.data
  },
  getThemeList (state, { res }) {
    state.themeList = res.data.others
    state.themeArticleList = []
    for (let item of res.data.others) {
      state.themeArticleList.push({ themeId: item.id, content: {}, loading: true })
    }
    state.articleListLoading = false
  },
  getThemeArticleList (state, { res, payload }) {
    for (let i = 0; i < state.themeArticleList.length; i++) {
      if (state.themeArticleList[i].themeId === payload.themeId) {
        state.themeArticleList[i].content = res.data
        state.themeArticleList[i].loading = false
      }
    }
  },
  getLabels (state, { res }) {
    state.labels = res.data.data
  },
  getArticles (state, { res }) {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
