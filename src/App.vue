<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Toast from './widgets/Toast.vue'
</script>

<template>
	<AppLayout>
		<router-view />
	</AppLayout>

	<Toast />
</template>
