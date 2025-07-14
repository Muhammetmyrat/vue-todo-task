import type { Router } from 'vue-router'
import router from '../router'

type ModuleWithRouter = {
	router?: (router: Router) => void
}

function registerModule(module: ModuleWithRouter) {
	if (module.router) {
		module.router(router)
	}
}

export function registerModules(modules: Record<string, ModuleWithRouter>) {
	Object.keys(modules).forEach(moduleKey => {
		const module = modules[moduleKey]
		registerModule(module)
	})
}
