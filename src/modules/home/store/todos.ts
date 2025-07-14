import type { ActionContext, Module } from 'vuex/types/index.d.ts'
import type { Todo } from '../types'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'

export interface TodoState {
	todos: Todo[]
	loading: Record<string, boolean>
}

export interface RootState {
	todo: TodoState
}

type TodoMutations = {
	SET_TODOS: Todo[]
	ADD_TODO: Todo
	UPDATE_TODO: Todo
	DELETE_TODO: number
	SET_LOADING: { key: string; value: boolean }
}

type TodoActionContext = {
	commit<K extends keyof TodoMutations>(key: K, payload: TodoMutations[K]): void
	dispatch: ActionContext<TodoState, RootState>['dispatch']
	state: TodoState
} & Omit<ActionContext<TodoState, RootState>, 'commit' | 'dispatch'>

async function handleErrorToast(
	dispatch: TodoActionContext['dispatch'],
	message = 'Something went wrong'
) {
	await dispatch(
		'toast/addToast',
		{
			text: message,
			status: 'error'
		},
		{ root: true }
	)
}

export const todosModule: Module<TodoState, RootState> = {
	namespaced: true,

	state: (): TodoState => ({
		todos: [],
		loading: {}
	}),

	getters: {
		getTodos(state): Todo[] {
			return state.todos
		},
		getLoading:
			state =>
			(key: string): boolean => {
				return !!state.loading[key]
			}
	},

	mutations: {
		SET_TODOS(state, todos: Todo[]) {
			state.todos = todos
		},
		ADD_TODO(state, todo: Todo) {
			state.todos.unshift(todo)
		},
		UPDATE_TODO(state, updatedTodo: Todo) {
			const index = state.todos.findIndex(t => t.id === updatedTodo.id)
			if (index !== -1) state.todos.splice(index, 1, updatedTodo)
		},
		DELETE_TODO(state, id: number) {
			state.todos = state.todos.filter(t => t.id !== id)
		},
		SET_LOADING(state, { key, value }: { key: string; value: boolean }) {
			state.loading[key] = value
		}
	},

	actions: {
		async fetchTodos({ commit, dispatch }: TodoActionContext) {
			const key = 'fetchTodos'
			try {
				commit('SET_LOADING', { key, value: true })
				const todos = await fetchTodos()
				commit('SET_TODOS', todos)
			} catch (error) {
				console.error(error)
				await handleErrorToast(dispatch, 'Failed to fetch todos')
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async addTodo({ commit, dispatch }: TodoActionContext, title: string) {
			const key = 'addTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				const newTodo = await createTodo(title)
				commit('ADD_TODO', newTodo)
				await dispatch(
					'toast/addToast',
					{
						text: 'Todo added successfully',
						status: 'success'
					},
					{ root: true }
				)
			} catch (error) {
				console.error(error)
				await handleErrorToast(dispatch, 'Failed to add todo')
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async updateTodo({ commit, dispatch }: TodoActionContext, todo: Todo) {
			const key = 'updateTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				const updated = await updateTodo(todo)
				commit('UPDATE_TODO', updated)
				await dispatch(
					'toast/addToast',
					{
						text: 'Todo updated successfully',
						status: 'info'
					},
					{ root: true }
				)
			} catch (error) {
				console.error(error)
				await handleErrorToast(dispatch, 'Failed to update todo')
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		},

		async deleteTodo({ commit, dispatch }: TodoActionContext, id: number) {
			const key = 'deleteTodo'
			try {
				commit('SET_LOADING', { key, value: true })
				await deleteTodo(id)
				commit('DELETE_TODO', id)
				await dispatch(
					'toast/addToast',
					{
						text: 'Todo deleted',
						status: 'warning'
					},
					{ root: true }
				)
			} catch (error) {
				console.error(error)
				await handleErrorToast(dispatch, 'Failed to delete todo')
			} finally {
				commit('SET_LOADING', { key, value: false })
			}
		}
	}
}
