<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/UI/Icon'

const props = defineProps({
	title: { type: String, default: '' },
	prependIcon: { type: String, default: '' },
	appendIcon: { type: String, default: '' },
	primary: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	outline: { type: Boolean, default: false },
	transparent: { type: Boolean, default: false },
	transparentWhite: { type: Boolean, default: false },
	block: { type: Boolean, default: false },
	small: { type: Boolean, default: false },
	large: { type: Boolean, default: false },
	danger: { type: Boolean, default: false },
	onlyIcon: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
	background: { type: Boolean, default: false },
	width: { type: String, default: '' },
	height: { type: String, default: '' },
	borderRadius: { type: String, default: '' },
	type: { type: String as () => 'button' | 'submit' | 'reset', default: 'button' }
})

const classes = computed(() => [
	'button',
	{
		button__block: props.block,
		button__outline: props.outline,
		button__transparent: props.transparent,
		'button__transparent--white': props.transparentWhite,
		button__disabled: props.disabled,
		button__danger: props.danger,
		button__loading: props.loading,
		button__primary: props.primary,
		button__background: props.background,
		'button__only-icon': props.onlyIcon
	}
])

const styles = computed(() => {
	const style: Record<string, string> = {}

	if (props.width) {
		style.width = `${props.width}px`
	}

	if (props.height) {
		style.height = `${props.height}px`
	}

	if (props.borderRadius) {
		style['border-radius'] = `${props.borderRadius}px`
	}

	return style
})
</script>

<template>
	<button :class="classes" :disabled="props.disabled" :type="type" :style="styles">
		<span v-if="props.prependIcon" class="button__icon-left">
			<Icon :name="props.prependIcon" />
		</span>
		<span v-if="props.title" class="button__content">
			{{ props.title }}
		</span>
		<span v-if="props.appendIcon" class="button__icon-right">
			<Icon :name="props.appendIcon" />
		</span>
	</button>
</template>

<style lang="scss" scoped>
.button {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	border-radius: 14px;
	padding-top: 8px;
	padding-right: 30px;
	padding-bottom: 8px;
	padding-left: 30px;
	gap: 10px;
	border: 0;
	outline: none;
	transition: all 0.3s ease;
	box-sizing: border-box;
	background: var(--Background-2-color);
	min-width: 150px;

	@media screen and (max-width: $mobileSmall) {
		cursor: none !important;
		user-select: none;
	}

	&:hover {
		background: var(--Separator-color);
	}

	&__background {
		background: var(--Background-color);

		&:hover {
			background: var(--Separator-color);
		}
	}

	// .button__icon-left
	&__icon-left {
		span {
			color: var(--Text-1-color);
		}
		&.rotate {
			transform: rotate(90deg);
		}
	}

	// .button__icon-right
	&__icon-right {
		span {
			color: var(--Text-1-color);
		}
	}
	&__only-icon {
		padding: 8px !important;
	}

	// .button__content
	&__content {
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		letter-spacing: 0.14px;
		color: var(--Text-1-color);
	}

	&.button__disabled {
		cursor: not-allowed !important;
		pointer-events: none !important;
		opacity: 0.6;
	}
	// .button__loading
	&__loading {
		&::after {
			content: '';
			width: 15px;
			height: 15px;
			border-radius: 50%;
			border: 2px solid var(--Black);
			border-left-color: transparent;
			position: absolute;
			top: 50%;
			left: 50%;
			animation: rotate 0.6s linear infinite;
			@keyframes rotate {
				0% {
					transform: translate(-50%, -50%) rotate(0deg);
				}
				100% {
					transform: translate(-50%, -50%) rotate(360deg);
				}
			}
		}
		.button__icon-left,
		.button__icon-right,
		.button__content {
			opacity: 0;
			visibility: hidden;
			display: none;
		}
	}

	// .button__primary
	&__primary {
		background: var(--Primary-blue-color);

		&:hover {
			background: var(--Primary-blue-color);
		}
		.button__content {
			color: var(--Background-2-color);
		}
		&.button__loading {
			&::after {
				border-color: var(--Background-2-color);
				border-left-color: transparent;
			}
		}
		.button__icon-left {
			span {
				color: var(--Background-2-color);
			}
		}
		.button__icon-right {
			span {
				color: var(--Background-2-color);
			}
		}
	}

	// .button__danger
	&__danger {
		background: var(--error-color);
		transition: all 0.3s ease;
		&:hover {
			background: var(--error-color);
		}
		.button__content {
			color: var(--Background-2-color);
		}
		.button__icon-right {
			span {
				color: var(--Background-2-color);
			}
		}
		.button__icon-left {
			span {
				color: var(--Background-2-color);
			}
		}
		&.button__loading {
			&::after {
				border-color: var(--Background-2-color);
				border-left-color: transparent;
			}
		}

		&.button__outline {
			background: transparent;
			color: var(--error-color);
			border-color: var(--error-color);
		}
	}
	&.button__outline {
		background: transparent;
		transition: all 0.3s ease;
		border: 1px solid var(--Separator-color-2);
		box-shadow: 0px -3px 6px 0px #f4f5fa99 inset;

		&:hover {
			background: transparent;
		}

		.button__content {
			color: var(--Text-1-color);
		}

		&.button__loading {
			&::after {
				border-color: var(--Primary-blue-color);
				border-left-color: transparent;
			}
		}
	}
	&.button__transparent {
		background: transparent;
		transition: all 0.3s ease;
		padding-right: 2px;
		padding-left: 2px;

		&:hover {
			background: transparent;
		}

		.button__content {
			color: var(--Primary-blue-color);
			font-weight: 400;
			font-size: 16px;
			line-height: 120%;
			letter-spacing: 0%;
		}
		.button__icon-right {
			span {
				color: var(--Primary-blue-color);
			}
		}
		.button__icon-left {
			span {
				color: var(--Primary-blue-color);
			}
		}
		&.button__loading {
			&::after {
				border-color: var(--Primary-blue-color);
				border-left-color: transparent;
			}
		}

		&--white {
			background: transparent;
			transition: all 0.3s ease;
			padding-right: 2px;
			padding-left: 2px;

			&:hover {
				background: transparent;
			}
			.button__content {
				color: var(--Background-2-color);
				font-weight: 400;
				font-size: 16px;
				line-height: 120%;
				letter-spacing: 0%;
			}
			.button__icon-right {
				span {
					color: var(--Background-2-color);
				}
			}
			.button__icon-left {
				span {
					color: var(--Background-2-color);
				}
			}
			&.button__loading {
				&::after {
					border-color: var(--Background-2-color);
					border-left-color: transparent;
				}
			}
		}
	}

	&__block {
		width: 100%;
	}
}
</style>
