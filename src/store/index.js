import Vue from 'vue'
import Vuex from 'vuex'
import IsLoading from './modules/IsLoading'
import Sidebar from './modules/Sidebar'
import User from './modules/User'
import Article from './modules/Article'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    IsLoading,
    Sidebar,
    User,
    Article
  }
})
