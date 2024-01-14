import { createRouter, createWebHistory } from 'vue-router'
import Exercises from '@/views/ExercisesView.vue'
import Traindays from '@/views/TraindayView.vue'
import Aboutpage from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Traindays
  },
  {
    path: '/workout/:tid',
    name: 'Exercises',
    component: Exercises
  },
  {
    path: '/about',
    name: 'About',
    component: Aboutpage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
