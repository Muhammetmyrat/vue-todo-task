<script lang="ts" setup></script>

<template>
	<header class="header">
		<div class="header__wrapper">
			<div class="header__logo">
				<RouterLink to="/" class="header__logo-link">TODO App</RouterLink>
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
	min-height: 70px;
	padding-top: 70px;
	box-sizing: border-box;

	&__wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 70px;
		padding: 5px 20px;
		box-sizing: border-box;
		z-index: 10;
		border-bottom: 1px solid var(--Separator-color-2);
		background-color: var(--Background-2-color);
		box-shadow: 0 2px 8px var(--Separator-color-2);
	}

	&__logo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-shrink: 0;
		flex-grow: 0;
		min-width: 0;
		max-width: 100%;
	}

	&__logo-link {
		display: block;
		border: 0;
		text-decoration: none;
		font-size: 24px;
		font-weight: 700;
		transition: color 0.2s ease;

		&:hover {
			color: var(--Primary-blue-color);
		}
	}
}
</style>
