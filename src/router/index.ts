import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { loadLayoutMiddleware } from './loadLayout.middleware'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_APP_BASE_URL || '/'),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
