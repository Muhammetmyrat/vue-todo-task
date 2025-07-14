import type { Router } from 'vue-router'

function Module() {
	return import('./Module.vue')
}

function Home() {
	return import('./pages/Home.vue')
}

const moduleRoute = {
	path: '/',
	component: Module,
	children: [
		{
			path: '',
			name: 'home',
			component: Home
		}
	]
}

export default (router: Router) => {
	router.addRoute(moduleRoute)
}
