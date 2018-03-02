import requests from '../requests'

const state = {
  article: {},
  articleList: [],
  topList: []
}

const getters = {
  article: state => state.article,
  articleList: state => state.articleList,
  topList: state => state.topList
}

const actions = {
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
  }
}

const mutations = {
  getArticleList (state, { res }) {
    state.articleList = []
    state.topList = []
    for (let item of res.data.top_stories) {
      state.topList.push({
        id: item.id,
        url: 'article/' + item.id,
        title: item.title,
        img: item.image
      })
    }
    for (let item of res.data.stories) {
      state.articleList.push({
        id: item.id,
        title: item.title,
        src: item.images[0]
      })
    }
    state.articleListLoading = false
  },
  getArticle (state, { res }) {
    state.article = res.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
