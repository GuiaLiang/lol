<template>
	<div class="items-container">
		<div class="item" v-for="(val, i) in this.content">
			<div class="left"></div>
			<div class="right"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Items',

		props: {
			content: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-container {
		width: 97%;
		padding: .2rem 5%;
		box-sizing: border-box;
		background-color:  rgba(204, 204, 204, 0.2);

		.item {
			box-sizing: border-box;
			width: 100%;
			height: 2.8rem;
			vertical-align: middle;
			padding: .2rem;
			background-color: #fff;

			.left {
				float: left;
				width: 20%;
				height: 2.6rem;
			}

			.right {
				height: 2.6rem;
			}
		}
	}
</style>