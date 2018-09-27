import Vue from 'vue'
import Router from 'vue-router'
import Hero from '@/components/Hero'
import Posts from '@/components/Posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hero',
      component: Hero
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ],
  mode: 'history'
})
