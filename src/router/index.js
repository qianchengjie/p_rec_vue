import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: () => import('@/components/common/sidebar/SideBarView'),
      children: [
        {
          path: '',
          component: () => import('@/components/page/index/Index'),
          children: [
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
      redirect: '/',
      component: () => import('@/components/page/user/User'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/page/user/Login')
        },
        {
          path: 'labels',
          component: () => import('@/components/page/user/Labels')
        },
        {
          path: 'collections',
          component: () => import('@/components/page/user/Collections')
        },
        {
          path: 'article/:id',
          component: () => import('@/components/page/index/article/Article')
        },
        {
          path: 'model',
          component: () => import('@/components/page/user/Model')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
