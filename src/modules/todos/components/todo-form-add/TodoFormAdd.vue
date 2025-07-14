<script lang="ts" setup>
import TextField from '@/UI/TextField.vue'
import Button from '@/UI/Button.vue'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { todoAddSchema } from '../../schema'

interface Props {
	loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
	(e: 'add', title: string): void
}>()

const { handleSubmit, errors, resetForm } = useForm({
	initialValues: {
		title: ''
	},
	validationSchema: toTypedSchema(todoAddSchema),
	validateOnMount: false
})

const handleTodoAdd = handleSubmit(async formValues => {
	emit('add', formValues.title)

	resetForm()
})
</script>

<template>
	<form action="post" class="todo-form" @submit.prevent="handleTodoAdd">
		<div class="todo-form__field">
			<TextField placeholder="Todo" :error="errors.title" name="title" :disabled="loading" />
		</div>
		<Button title="Add Todo" type="submit" primary :disabled="loading" :loading="loading" />
	</form>
</template>

<style lang="scss" scoped>
@use './todo-form-add.scss';
</style>
