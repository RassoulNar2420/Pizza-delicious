import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrdersView from '@/views/OrdersView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogItemView from '@/views/BlogItemView.vue'
import ContactView from '@/views/ContactView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import UserOrdersView from '@/views/UserOrdersView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiredAuth: false}
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: {requiredAuth: false}
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: {requiredAuth: false}
    },
    {
      path: '/blog/:slug',
      name: 'blog-item',
      component: BlogItemView,
      meta: {requiredAuth: false}
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {requiredAuth: false}
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
      meta: {requiredAuth: false}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {requiredAuth: false}
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: UserProfileView,
      meta: {requiredAuth: true}
    },
    {
      path: '/user/orders',
      name: 'user-orders',
      component: UserOrdersView,
      meta: {requiredAuth: true}
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const targetRouteRequiredAuth = to.meta.requiredAuth
  const hasSession = authStore.hasSession

  if(targetRouteRequiredAuth && !hasSession){
    next(`/login?redirect_to=${to.path}`)
  }else{
    next()
  }
})


export default router
