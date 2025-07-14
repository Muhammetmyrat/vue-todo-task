<template>
	<div class="modal-mask">
		<div class="modal-container">
			<div class="modal-header">
				<slot name="header"></slot>
			</div>

			<div class="modal-body">
				<slot name="body"></slot>
			</div>

			<div class="modal-footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<style>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	transition: opacity 0.3s ease;
}

.modal-container {
	width: 100%;
	max-width: 500px;
	margin: auto;
	padding: 30px;
	background-color: var(--Background-2-color);
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	border-radius: 14px;
}

.modal-header h3 {
	margin-top: 0;
	font-size: 24px;
	font-weight: 600;
	color: var(--Primary-blue-color);
}

.modal-body {
	margin: 20px 0;
}
</style>
