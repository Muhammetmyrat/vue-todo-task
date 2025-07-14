import type { Router } from 'vue-router'

function Module() {
	return import('./Module.vue')
}

function Todos() {
	return import('./pages/Todos.vue')
}

const moduleRoute = {
	path: '/todos',
	component: Module,
	children: [
		{
			path: '',
			name: 'todos',
			component: Todos
		}
	]
}

export default (router: Router) => {
	router.addRoute(moduleRoute)
}
