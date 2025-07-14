<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Loader from '@/widgets/Loader.vue'
import TodoList from '../components/todo-list'
import TodoFormAdd from '../components/todo-form-add'
import TodoFormEdit from '../components/todo-form-edit'
import type { TodoItem } from '../types'

const LOADING_ACTIONS = {
	FETCH: 'fetchTodos',
	ADD: 'addTodo',
	UPDATE: 'updateTodo',
	DELETE: 'deleteTodo'
}

const store = useStore()

const currentTodo = ref<TodoItem | null>(null)
const isModalVisible = ref(false)

const todos = computed(() => store.getters['todos/getTodos'])
const loadingStates = computed(() => ({
	fetch: store.getters['todos/getLoading'](LOADING_ACTIONS.FETCH),
	add: store.getters['todos/getLoading'](LOADING_ACTIONS.ADD),
	update: store.getters['todos/getLoading'](LOADING_ACTIONS.UPDATE),
	delete: store.getters['todos/getLoading'](LOADING_ACTIONS.DELETE)
}))

function showEditModal(todo: TodoItem) {
	currentTodo.value = todo
	isModalVisible.value = true
}

function closeModal() {
	isModalVisible.value = false
}

async function addTodo(title: string) {
	await store.dispatch('todos/addTodo', title)
}

async function toggleTodoStatus(todo: TodoItem) {
	await store.dispatch('todos/updateTodo', {
		...todo,
		completed: !todo.completed
	})
}

async function updateTodo(title: string) {
	if (!currentTodo.value) return

	await store.dispatch('todos/updateTodo', {
		...currentTodo.value,
		title
	})

	closeModal()
}

async function deleteTodo(id: number) {
	await store.dispatch('todos/deleteTodo', id)
}

store.dispatch('todos/fetchTodos')
</script>

<template>
	<div class="todos page-pt">
		<div class="todos__container">
			<div class="todos__content">
				<h1 class="todos__title">ToDo List</h1>

				<Loader v-if="loadingStates.fetch" />

				<template v-else>
					<TodoFormAdd :loading="loadingStates.add" @add="addTodo" />

					<TodoList
						:loading="loadingStates.delete"
						:todos="todos"
						@edit="showEditModal"
						@toggle="toggleTodoStatus"
						@delete="deleteTodo"
					/>
				</template>
			</div>
		</div>

		<TodoFormEdit
			v-if="isModalVisible"
			:todo="currentTodo"
			:loading="loadingStates.update"
			@edit="updateTodo"
			@close="closeModal"
		/>
	</div>
</template>

<style lang="scss" scoped>
.todos {
	width: 100%;
	height: 100%;

	&__content {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.875rem;
	}

	&__title {
		font-size: 2.25rem;
		font-weight: 800;
		line-height: 1;
		text-align: center;
	}
}
</style>
