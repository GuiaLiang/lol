<template>
	<div class="loading-container">
		<div class="loading-wrap">
			<i class="loading-icon"></i>
			<span class="loading-text">正在登录</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Loading'
	}
</script>

<style lang="scss">
	.loading-container {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 12;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .6);

		.loading-wrap {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 2.6rem;
			height: 2.6rem;
			border-radius: .2rem;
			color: #eee;
			background: rgba(53, 53, 53, .8);

			i {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 12%;
				width: .72rem;
				height: .83rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				animation: loading 1s ease infinite;
			}

			.loading-text {
				font-size: 28px;
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: 20%;
			}
		}
	}

	@keyframes loading {
		0% { background-image: url('../assets/images/loading/teemo_dark_1.png'); }
		12.5% { background-image: url('../assets/images/loading/teemo_dark_2.png'); }
		25% { background-image: url('../assets/images/loading/teemo_dark_3.png'); }
		37.5% { background-image: url('../assets/images/loading/teemo_dark_4.png'); }
		50% { background-image: url('../assets/images/loading/teemo_dark_5.png'); }
		62.5% { background-image: url('../assets/images/loading/teemo_dark_6.png'); }
		85% { background-image: url('../assets/images/loading/teemo_dark_7.png'); }
		100% { background-image: url('../assets/images/loading/teemo_dark_8.png'); }
	}
</style>