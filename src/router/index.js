import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      component: () => import('@/components/common/TopSliderbar')
    },
    {
      path: '/',
      component: () => import('@/components/common/sidebar/SideBarView'),
      children: [
        {
          path: '',
          component: () => import('@/components/page/index/Index'),
          children: [
            {
              path: '',
              component: () => import('@/components/page/index/article/ArticleList')
            },
            {
              name: 'article',
              path: '/article/:id',
              component: () => import('@/components/page/index/article/Article')
            }
          ]
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/components/page/user/User'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/page/user/Login')
        }
      ]
    }
  ]
})
