import { createStore } from 'vuex'
import toastModule from './modules/toast'
import { todosModule } from '@/modules/todos/store'

const store = createStore({
	modules: { toast: toastModule, todos: todosModule }
})

export default store
