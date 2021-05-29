<template>
	<div id="app" :class="{ 'ternobo-loading': loading }">
		<div v-if="loading" class="loading-container">
			<svg version="1" xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512.000000 512.000000" style="height: 64px; width: 64px">
				<path d="M106.3 164.8l.3 89.7 2.6 10.6c3.3 13.5 9.5 29.8 15.2 40.2 17.1 31.5 45.8 57.5 78.5 71.2 8.6 3.6 21.6 7.8 28.5 9l3.6.7V277h-65v-2.3c0-1.2.6-4.5 1.4-7.2 3.9-14.8 13.9-25.6 28-30.5 4.9-1.7 8.4-2 20.9-2h15l-.6-12.5c-2-39.7-17.4-74.3-45.7-102.6-21.9-22-48.3-36.9-76.8-43.3l-6.3-1.4.4 89.6zM395.2 128.6c-21.8 6.4-38.3 14.6-55.4 27.4-18 13.5-33.5 31.7-43.7 51.1-5.2 9.9-11.1 23.9-11.1 26.4 0 1.3 4.1 1.5 28.6 1.5h28.6l-.7 4.7c-2.2 15-12.2 28.3-25.6 34.2-6.1 2.7-15.5 4.1-28.1 4.1H277v158.9l3.3-.6c23.8-4.5 52.5-19.1 73.3-37.2 25.6-22.2 44.6-56.5 50.5-90.9 1.8-10.7 1.9-16.8 1.9-96.8 0-67.7-.3-85.4-1.2-85.3-.7 0-5 1.1-9.6 2.5z" style="fill: #191919"></path>
			</svg>
			<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>
		</div>
		<slot v-else></slot>
	</div>
</template>

<script>
export default {
	name: "AppLayout",
	props: ["loading"],
};
</script>
<style>
@-webkit-keyframes spinner-indicating {
	0% {
		transform: translateX(0);
		width: 80px;
	}

	50% {
		transform: translateX(190px);
		width: 0;
	}

	to {
		transform: translateX(0);
	}
}

@keyframes spinner-indicating {
	0% {
		transform: translateX(0);
		width: 80px;
	}

	50% {
		transform: translateX(190px);
	}
	100% {
		transform: translateX(-40px);
	}
}
</style>

<style lang="scss" scoped>
.ternobo-loading {
	display: flex;
	height: 100vh;
	width: 100vw;
	justify-content: center;
	align-items: center;
}
.loading-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.spinner {
	width: 212px;
	height: 5px;
	direction: ltr;
	background: white;
	margin-top: 40px;
	box-shadow: 0 6px 20px rgb(0 0 0 / 20%);
	overflow: hidden;
	.spinner-icon {
		background: #191919;
		height: 100%;
		transition: 0.7s all;
		border-radius: 5px;
		width: 80px;
		animation-name: spinner-indicating;
		animation-duration: 2s;
		animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		animation-iteration-count: infinite;
	}
}
</style>