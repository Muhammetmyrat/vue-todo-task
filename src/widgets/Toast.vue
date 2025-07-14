<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/UI/Icon'
import { useStore } from 'vuex'

const store = useStore()

const getToasts = computed(() => store.getters['toast/getToasts'])
</script>

<template>
	<Teleport to="body">
		<div id="toast-container">
			<TransitionGroup name="toast">
				<div v-for="toastItem of getToasts" :key="toastItem.id" class="toast__box">
					<div
						:class="[
							'toast__item',
							{
								'toast__item--success': toastItem.status === 'success',
								'toast__item--warning': toastItem.status === 'warning',
								'toast__item--error': toastItem.status === 'error'
							}
						]"
					>
						<div class="toast__content">
							<span>
								<Icon :name="toastItem.status" />
							</span>
							<p>
								{{ toastItem.text }}
							</p>
						</div>
					</div>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style lang="scss" scoped>
#toast-container {
	position: fixed;
	right: 20px;
	top: 20px;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 12px;
	pointer-events: none;
}

.toast {
	&__box {
		animation: toast-in 0.3s ease-out forwards;
	}

	&-move,
	&-leave-active {
		transition: all 0.3s ease;
	}

	&-leave-to {
		opacity: 0;
		transform: translateX(100%);
	}

	&__item {
		display: flex;
		min-width: 280px;
		max-width: 328px;
		height: 60px;
		background: var(--Primary-blue-color);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		pointer-events: auto;
		border-radius: 6px;
		padding: 15px;

		&--success {
			background: var(--Primary-blue-color);
		}

		&--warning {
			background: var(--warning-color);
		}

		&--error {
			background: var(--error-color);
		}
	}

	&__content {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 15px;

		span {
			color: var(--Background-2-color);
		}

		p {
			font-weight: 500;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0%;
			color: var(--Background-2-color);
		}
	}
}

@keyframes toast-in {
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
</style>
