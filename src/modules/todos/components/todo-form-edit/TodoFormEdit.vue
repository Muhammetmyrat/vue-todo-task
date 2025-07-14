<script lang="ts" setup>
import Modal from '@/widgets/Modal.vue'
import TextField from '@/UI/TextField.vue'
import Button from '@/UI/Button.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { todoAddSchema } from '../../schema'
import type { TodoItem } from '../../types'

interface Props {
	todo: TodoItem | null
	loading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'edit', title: string): void
}>()

const { handleSubmit, errors } = useForm({
	initialValues: {
		title: props.todo?.title
	},
	validationSchema: toTypedSchema(todoAddSchema),
	validateOnMount: false
})

const handleTodoEdit = handleSubmit(async formValues => {
	emit('edit', formValues.title)
})
</script>

<template>
	<Teleport to="body">
		<Modal>
			<template #header>
				<h3>Edit Todo «{{ todo?.title }}»</h3>
			</template>

			<template #body>
				<form action="post" class="todo-form-edit" @submit.prevent="handleTodoEdit">
					<div class="todo-form-edit__field">
						<TextField placeholder="Todo" :error="errors.title" name="title" :disabled="loading" />
					</div>

					<div class="todo-form-edit__actions">
						<Button
							title="Edit Todo"
							type="submit"
							primary
							:disabled="loading"
							:loading="loading"
							block
						/>
						<Button title="Close" outline block @click="$emit('close')" />
					</div>
				</form>
			</template>
		</Modal>
	</Teleport>
</template>

<style lang="scss" scoped>
@use './todo-form-edit.scss';
</style>
