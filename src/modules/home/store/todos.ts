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
	{
		id: 5,
		title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
		completed: false
	},
	{ id: 6, title: 'qui ullam ratione quibusdam voluptatem quia omnis', completed: false },
	{ id: 7, title: 'illo expedita consequatur quia in', completed: false },
	{ id: 8, title: 'quo adipisci enim quam ut ab', completed: true },
	{ id: 9, title: 'molestiae perspiciatis ipsa', completed: false },
	{ id: 10, title: 'illo est ratione doloremque quia maiores aut', completed: true }
]

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function performWithLoading<T>(
	ctx: TodoActionContext,
	key: string,
	action: () => Promise<T>
): Promise<T | void> {
	try {
		ctx.commit('SET_LOADING', { key, value: true })
		return await action()
	} catch (error) {
		console.error(`${key} error:`, error)
	} finally {
		ctx.commit('SET_LOADING', { key, value: false })
	}
}

export const todosModule: Module<TodoState, RootState> = {
	namespaced: true,

	state: (): TodoState => ({
		todos: [],
		loading: {}
	}),

	getters: {
		getTodos: state => state.todos,
		getLoading: state => (key: string) => !!state.loading[key]
	},

	mutations: {
		SET_TODOS(state, todos) {
			state.todos = todos
		},
		ADD_TODO(state, todo) {
			state.todos.unshift(todo)
		},
		UPDATE_TODO(state, updated) {
			const index = state.todos.findIndex(t => t.id === updated.id)
			if (index !== -1) state.todos.splice(index, 1, updated)
		},
		DELETE_TODO(state, id) {
			state.todos = state.todos.filter(t => t.id !== id)
		},
		SET_LOADING(state, { key, value }) {
			state.loading[key] = value
		}
	},

	actions: {
		async fetchTodos(ctx: TodoActionContext) {
			await performWithLoading(ctx, 'fetchTodos', async () => {
				await delay(1000)
				ctx.commit('SET_TODOS', mockTodos)
			})
		},

		async addTodo(ctx: TodoActionContext, title: string) {
			await performWithLoading(ctx, 'addTodo', async () => {
				await delay(800)
				const newTodo: TodoItem = {
					id: Date.now(),
					title,
					completed: false
				}
				ctx.commit('ADD_TODO', newTodo)
			})
		},

		async updateTodo(ctx: TodoActionContext, updatedTodo: TodoItem) {
			await performWithLoading(ctx, 'updateTodo', async () => {
				await delay(700)
				ctx.commit('UPDATE_TODO', updatedTodo)
			})
		},

		async deleteTodo(ctx: TodoActionContext, id: number) {
			await performWithLoading(ctx, 'deleteTodo', async () => {
				await delay(500)
				ctx.commit('DELETE_TODO', id)
			})
		}
	}
}
