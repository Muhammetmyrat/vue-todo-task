import type { Module, ActionContext } from 'vuex/types/index.d.ts'

export interface Toast {
	id: number
	status: 'success' | 'error' | 'warning' | 'info'
	text: string
	timer?: ReturnType<typeof setTimeout>
}

export interface ToastState {
	toasts: Toast[]
}

export interface RootState {
	toast: ToastState
}

type Mutations = {
	ADD_TOAST: Toast
	REMOVE_TOAST: number
}

type ToastActionContext = {
	commit<K extends keyof Mutations>(key: K, payload: Mutations[K]): void
} & Omit<ActionContext<ToastState, RootState>, 'commit'>

const toastModule: Module<ToastState, RootState> = {
	namespaced: true,

	state: (): ToastState => ({
		toasts: []
	}),

	mutations: {
		ADD_TOAST(state, toast: Toast) {
			state.toasts.unshift(toast)
		},
		REMOVE_TOAST(state, id: number) {
			const index = state.toasts.findIndex(t => t.id === id)
			if (index !== -1) {
				clearTimeout(state.toasts[index].timer)
				state.toasts.splice(index, 1)
			}
		}
	},

	actions: {
		addToast({ commit }: ToastActionContext, payload: { text: string; status?: Toast['status'] }) {
			const id = Date.now()
			const toast: Toast = {
				id,
				text: payload.text,
				status: payload.status || 'success',
				timer: setTimeout(() => commit('REMOVE_TOAST', id), 3000)
			}
			commit('ADD_TOAST', toast)
			return () => commit('REMOVE_TOAST', id)
		}
	},

	getters: {
		getToasts(state): Toast[] {
			return state.toasts
		}
	}
}

export default toastModule
