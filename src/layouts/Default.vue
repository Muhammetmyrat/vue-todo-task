<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
	<div class="default-layout">
		<AppHeader />
		<router-view />
	</div>
</template>

<style lang="scss" scoped>
.default-layout {
	display: flex;
	flex-direction: column;
	flex: 1 1 0%;
}
</style>
