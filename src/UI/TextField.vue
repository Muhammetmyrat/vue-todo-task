<script setup lang="ts">
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'
import Icon from '~/UI/Icon'

type InputType = 'text' | 'tel' | 'password' | 'email' | 'number' | 'search'

interface Props {
	name?: string
	prependIcon?: string
	appendIcon?: string
	placeholder?: string
	label?: string
	floatingLabel?: string
	message?: string
	type?: InputType
	success?: string | boolean
	error?: string | boolean
	clickablePrevent?: boolean
	clickableAppend?: boolean
	disabled?: boolean
	background?: boolean
	transparent?: boolean
	width?: string
	height?: string
	code?: string
	readonly?: boolean
	border?: boolean
	search?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	prependIcon: '',
	appendIcon: '',
	placeholder: '',
	label: '',
	message: '',
	type: 'text',
	success: '',
	error: '',
	clickablePrevent: false,
	clickableAppend: false,
	disabled: false,
	background: false,
	transparent: false,
	width: '',
	height: '50px',
	readonly: false,
	border: false,
	search: false
})

defineEmits<{
	(e: 'click:prevent' | 'click:append'): void
	(e: 'update:modelValue' | 'value', value: string | number): void
}>()

const {
	value: fieldValue,
	errorMessage,
	meta,
	handleBlur,
	handleChange
} = useField(() => props.name || '', undefined, {
	validateOnValueUpdate: false,
	validateOnMount: false
})

const focus = ref(false)

const validationListeners = {
	change: handleChange,
	input: (evt: Event) => handleChange(evt, !!errorMessage.value)
}

const classes = computed(() => [
	'input',
	{
		'input--icon-prepend': props.prependIcon,
		'input--icon-append': props.appendIcon,
		'input--border': props.border,
		'input--success': props.success || (props.name && meta.valid),
		'input--error': props.error || (props.name && !!errorMessage.value),
		'input--disabled': props.disabled,
		'input--readonly': props.readonly,
		'input--background': props.background,
		'input--transparent': props.transparent,
		'input--search': props.search
	}
])

function handleInput(event: Event): void {
	const target = event.target as HTMLInputElement
	const value = target.value

	handleChange(value, false)
}

function handleOnBlur(evt: Event): void {
	focus.value = false
	handleBlur(evt, false)
}
</script>

<template>
	<div :class="classes">
		<label v-if="props.label" class="input__label">{{ props.label }}</label>

		<div class="input__body">
			<div
				v-if="props.prependIcon"
				:class="['input__icon-prepend', { 'input__icon--clickable': props.clickablePrevent }]"
				@click.stop="$emit('click:prevent')"
			>
				<Icon :name="props.prependIcon" />
			</div>

			<div class="input__field">
				<input
					:value="fieldValue"
					:readonly="props.readonly"
					:type="props.type"
					:placeholder="props.placeholder"
					:disabled="props.disabled"
					autocomplete="off"
					v-on="validationListeners"
					@focus="focus = true"
					@blur="handleOnBlur"
					@input="handleInput"
				/>
			</div>

			<div
				v-if="props.appendIcon"
				:class="['input__icon-append', { 'input__icon--clickable': props.clickableAppend }]"
				@click.stop="$emit('click:append')"
			>
				<Icon :name="props.appendIcon" />
			</div>
		</div>

		<div v-if="errorMessage || message" class="input__message">
			{{ errorMessage || message }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.input {
	position: relative;
	width: v-bind('props.width || "100%"');
	min-height: v-bind('props.height || "auto"');

	&__label {
		display: block;
		font-weight: 500;
		font-size: 12px;
		line-height: 1.6;
		color: var(--Text-2-color);
		padding-bottom: 3px;
	}

	&__floating-label {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 24px;
		font-weight: 400;
		font-size: 14px;
		letter-spacing: -0.01em;
		color: var(--Text-2-color);
		transition: all 0.3s ease;
		pointer-events: none;
		z-index: 1;
	}

	&__body {
		position: relative;
		border-radius: 14px;
		width: 100%;
		height: 100%;
		background: var(--Background-color);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			border: 1px solid var(--Separator-color);
			pointer-events: none;
		}
	}

	&__field {
		position: relative;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;

		input {
			width: 100%;
			height: 100%;
			background-color: transparent;
			padding: 8px 14px;
			border-radius: inherit;
			font-weight: 400;
			font-size: 14px;
			color: var(--Text-1-color);

			&::placeholder {
				color: var(--Text-2-color);
			}

			&[type='submit'] {
				cursor: pointer;
			}
		}
	}

	&__phone-code {
		width: 62px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 14px;
		line-height: 1.4;
		color: var(--Text-2-color);
		border-right: 1px solid var(--Separator-color-2);
	}

	&__icon-prepend,
	&__icon-append {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: var(--Text-1-color);
	}

	&__icon-prepend {
		left: 16px;
	}

	&__icon-append {
		right: 16px;
	}

	&__icon--clickable {
		cursor: pointer;
		pointer-events: all;
	}

	&__inner-label {
		position: absolute;
		right: 16px;
		font-size: 14px;
		color: var(--Text-2-color);
	}

	&__message {
		font-weight: 500;
		font-size: 12px;
		line-height: 1.6;
		color: var(--Text-2-color);
		padding-top: 3px;
	}

	// Modifiers
	&--icon-prepend {
		.input__field input {
			padding-left: 42px;
		}
	}

	&--icon-append {
		.input__field input {
			padding-right: 42px;
		}
	}

	&--border {
		.input__body::before {
			border-color: var(--Separator-color-2);
		}
	}

	&--floating {
		.input__field input {
			padding-top: 10px;
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 4px;
		}
	}

	&--focus {
		.input__body::before {
			border-color: var(--Primary-blue-color);
			transition: border-color 0.3s ease;
		}
	}

	&--focus-floating {
		.input__floating-label {
			top: 4px;
			transform: none;
			font-size: 10px;
		}

		.input__field input {
			padding-top: 10px;
		}
	}

	&--success {
		.input__label,
		.input__floating-label,
		.input__message {
			color: var(--Primary-blue-color);
		}

		.input__body::before {
			border-color: var(--Primary-blue-color) !important;
		}
	}

	&--error {
		animation: $invalid-animation-name 0.3s ease-in-out;

		.input__label,
		.input__floating-label,
		.input__message {
			color: var(--error-color);
		}

		.input__body::before {
			border-color: var(--error-color) !important;
		}
	}

	&--tel {
		.input__field input {
			padding-left: 10px;
			padding-right: 10px;
			font-weight: 500;
		}
	}

	&--search {
		.input__body,
		.input__field,
		.input__field input {
			border-radius: 8px;
		}
	}

	&--disabled {
		* {
			cursor: not-allowed;
			opacity: 0.7;
		}
	}

	&--transparent {
		.input__label {
			padding-bottom: 2px;
		}

		.input__body {
			height: 46px;
			border-radius: 10px;
			background: transparent;

			&::before {
				border-radius: 10px;
				border-color: var(--Background-2-color);
			}

			input {
				padding: 5px 40px 5px 14px;
			}
		}
	}

	&--background {
		.input__body {
			background-color: var(--Background-2-color);
		}
	}
}
</style>
