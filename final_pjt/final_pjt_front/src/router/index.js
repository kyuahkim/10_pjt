import { createRouter, createWebHistory } from 'vue-router'

import { useBankStore } from '@/stores/bank'

import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LogInView from '@/views/LogInView.vue'
import ProductsView from '@/views/ProductsView.vue'
import DetailView from '@/views/DetailView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: ProfileView
    },
  ]
})

export default router