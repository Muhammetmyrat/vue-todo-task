import type { Module, ActionContext } from 'vuex/types/index.d.ts'
import type { TodoItem } from '../types'

export interface TodoState {
	todos: TodoItem[]
	loading: Record<string, boolean>
}

export interface RootState {
	todo: TodoState
}

type TodoMutations = {
	SET_TODOS: TodoItem[]
	ADD_TODO: TodoItem
	UPDATE_TODO: TodoItem
	DELETE_TODO: number
	SET_LOADING: { key: string; value: boolean }
}

type TodoActionContext = {
	commit<K extends keyof TodoMutations>(key: K, payload: TodoMutations[K]): void
	dispatch: ActionContext<TodoState, RootState>['dispatch']
	state: TodoState
} & Omit<ActionContext<TodoState, RootState>, 'commit' | 'dispatch'>

const mockTodos: TodoItem[] = [
	{ id: 1, title: 'delectus aut autem', completed: false },
	{ id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
	{ id: 3, title: 'fugiat veniam minus', completed: false },
	{ id: 4, title: 'et porro tempora', completed: true },
	{ id: 5, title: 'laboriosam mollitia...', completed: false },
	{ id: 6, title: 'qui ullam ratione...', completed: false },
	{ id: 7, title: 'illo expedita consequatur...', completed: false },
	{ id: 8, title: 'quo adipisci enim...', completed: true },
	{ id: 9, title: 'molestiae perspiciatis ipsa', completed: false }
]

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const todosModule: Module<TodoState, RootState> = {
	namespaced: true,

	state: (): TodoState => ({
		todos: [],
		loading: {}
	}),

	getters: {
		getTodos(state): TodoItem[] {
			return state.todos
		},
		getLoading:
			state =>
			(key: string): boolean => {
				return !!state.loading[key]
			}
	},

	mutations: {
		SET_TODOS(state, todos: TodoItem[]) {
			state.todos = todos
		},
		ADD_TODO(state, todo: TodoItem) {
			state.todos.unshift(todo)
		},
		UPDATE_TODO(state, updatedTodo: TodoItem) {
			const index = state.todos.findIndex(t => t.id === updatedTodo.id)
			if (index !== -1) {
				state.todos.splice(index, 1, updatedTodo)
			}
		},
		DELETE_TODO(state, id: number) {
			state.todos = state.todos.filter(t => t.id !== id)
		},
		SET_LOADING(state, { key, value }: { key: string; value: boolean }) {
			state.loading[key] = value
		}
	},

	actions: {
		async fetchTodos({ commit }: TodoActionContext) {
			const key = 'fetchTodos'
			try {
				commit('SET_LOADING', { key, value: true })
				await delay(1000)
				commit('SET_TODOS', [...mockTodos])
			} catch (error) {
				console.error('fetchTodos error:', error)
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async addTodo({ commit }: TodoActionContext, title: string) {
			const key = 'addTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				await delay(800)
				const newTodo: TodoItem = {
					id: Date.now(),
					title,
					completed: false
				}
				commit('ADD_TODO', newTodo)
			} catch (error) {
				console.error('addTodo error:', error)
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async updateTodo({ commit }: TodoActionContext, updatedTodo: TodoItem) {
			const key = 'updateTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				await delay(700)
				commit('UPDATE_TODO', updatedTodo)
			} catch (error) {
				console.error('updateTodo error:', error)
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async deleteTodo({ commit }: TodoActionContext, id: number) {
			const key = 'deleteTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				await delay(500)
				commit('DELETE_TODO', id)
			} catch (error) {
				console.error('deleteTodo error:', error)
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		}
	}
}
