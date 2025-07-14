<script setup lang="ts"></script>

<template>
	<div class="loader-wrapper">
		<span class="loader"></span>
	</div>
</template>

<style scoped lang="scss">
.loader-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1 1 0%;

	.loader {
		width: 40px;
		height: 40px;
		border: 5px solid var(--Primary-blue-color);
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
