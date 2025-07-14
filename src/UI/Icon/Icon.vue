<script setup lang="ts">
import { computed } from 'vue'
import icons from './icons'

const iconsMap = icons as Record<string, string>

const props = defineProps({
	name: {
		type: String,
		required: true
	}
})

const path = computed(() => iconsMap[props.name])
</script>

<template>
	<span class="icon" v-html="path"></span>
</template>

<style lang="scss" scoped>
.icon {
	display: flex;
}
</style>
