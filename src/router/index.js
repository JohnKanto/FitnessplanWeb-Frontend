import { createRouter, createWebHistory } from 'vue-router'
import Exercises from '@/views/ExercisesView.vue'
import Traindays from '@/views/TraindayView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
