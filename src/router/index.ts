import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/', name: 'Home', component: HomeView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
