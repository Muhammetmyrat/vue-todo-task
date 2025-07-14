<script setup lang="ts">
import Icon from '~/UI/Icon'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: null
	},
	value: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	},
	readonly: {
		type: Boolean,
		default: false
	},
	checkedIcon: {
		type: String,
		default: () => 'checkBox'
	},
	uncheckedIcon: {
		type: String,
		default: () => 'checkBoxOutline'
	}
})
const emit = defineEmits<{
	(e: 'update:modelValue' | 'updateValue', value: boolean): void
}>()

function updateValue() {
	if (!props.disabled) {
		emit('update:modelValue', !props.modelValue)
		emit('updateValue', !props.modelValue)
	}
}
</script>

<template>
	<label
		:class="[
			'checkbox',
			{
				'checkbox--disabled': props.disabled,
				'checkbox--active': props.modelValue || props.value,
				'checkbox--error': props.error,
				'checkbox--readonly': props.readonly
			}
		]"
		:for="String(props.modelValue)"
		@click="updateValue"
	>
		<input
			autocomplete="off"
			:checked="props.modelValue || props.value"
			type="checkbox"
			:disabled="props.disabled"
		/>

		<span>
			<Icon :name="props.modelValue || props.value ? props.checkedIcon : props.uncheckedIcon" />
		</span>

		<p v-if="title">{{ title }}</p>
		<slot name="title"></slot>
	</label>
</template>

<style lang="scss" scoped>
.checkbox {
	cursor: pointer;
	display: flex;
	align-items: center;

	input {
		display: none;
	}

	span {
		color: var(--Text-2-color);
	}

	p {
		font-weight: 400;
		font-size: 16px;
		text-transform: capitalize;
		padding-left: 15px;
		color: var(--Text-1-color);
	}

	&--active {
		span {
			color: var(--Primary-blue-color);
		}
	}
	&--disabled {
		cursor: not-allowed;
		pointer-events: all !important;
	}
	&--error {
		animation: $invalid-animation-name 0.3s ease-in-out;
		span {
			color: var(--error-color);
		}
	}
	&--readonly {
		pointer-events: none;
	}
}
</style>
