<template>
	<div class="content-container">
		<div class="fresh-loading">
			<i></i>
			<span class="text"> {{freshText}} </span>
		</div>

		<div class="carousel-wrap"></div>

		<div class="content-wrap">
			<router-view></router-view>
		</div>

		<div class="navga"></div>
	</div>
</template>

<script>
	export default {
		name: 'Content',

		data() {
			return {
				freshText: '下拉更新'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: relative;

		.carousel-wrap {
			height: 4.4rem;
		}

		.content-wrap {
			flex-grow: 1;
		}

		.navga {
			height: 1.6rem;
		}
	}
</style>