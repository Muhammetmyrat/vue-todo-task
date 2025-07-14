<script lang="ts" setup>
import type { TodoItem } from '../../types'
import Checkbox from '@/UI/Checkbox.vue'
import Icon from '@/UI/Icon/Icon.vue'

interface Props {
	todos: TodoItem[]
	loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
	(e: 'toggle', id: TodoItem): void
	(e: 'edit', todo: TodoItem): void
	(e: 'delete', id: number): void
}>()

function handleToggle(todo: TodoItem) {
	emit('toggle', todo)
}

function handleEdit(todo: TodoItem) {
	emit('edit', todo)
}

function handleDelete(id: number) {
	emit('delete', id)
}
</script>

<template>
	<div class="todo-list">
		<div class="todo-list__items">
			<div
				v-for="todo in todos"
				:key="todo.id"
				class="todo-list__item"
				:class="['todo-list__item', { 'todo-list__item--completed': todo.completed }]"
			>
				<Checkbox
					:model-value="todo.completed"
					:disabled="loading"
					@update:model-value="handleToggle(todo)"
				/>
				<div class="todo-list__content">
					<div class="todo-list__title">{{ todo.title }}</div>
					<div class="todo-list__actions">
						<button
							class="todo-list__action"
							:disabled="loading"
							aria-label="Edit todo"
							@click="handleEdit(todo)"
						>
							<Icon name="pencil" />
						</button>
						<button
							class="todo-list__action"
							:disabled="loading"
							aria-label="Delete todo"
							@click="handleDelete(todo.id)"
						>
							<Icon name="trash" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use './todo-list.scss';
</style>
