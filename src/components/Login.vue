<template>
	<div class="login-container">
		<div class="login-btn-wrap">
			<span class="login-way" :value="qqLogin" @touchend="login"> {{qqLogin}} </span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {LOADING_STATUS_ACTION} from '@/store/mutation-types'
	export default {
		data() {
			return {
				qqLogin: 'QQ登录'
			}
		},

		methods: {
			login(e) {
				this.$store.dispatch(LOADING_STATUS_ACTION, {status: 'show'});
				setTimeout(() => {
					this.$store.dispatch(LOADING_STATUS_ACTION, {status: 'hidden'});
					this.$router.push('/index');
				}, 3000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		width: 100%;
		height: 100%;
		background: url('../assets/images/login/start_up.jpg') center center no-repeat;
		background-size: cover;
		overflow: hidden;
		position: relative;
		
		.login-btn-wrap {
			position: absolute;
			z-index: 10;
			bottom: 3.6rem;
			left: 50%;
			transform: translateX(-50%);
			width: 6.03rem;
			height: 1.17rem;
			background: url('../assets/images/login/login_btn.gif') center center no-repeat;
			background-size: cover;

			.login-way {
				display: inline-block;
				width: 100%;
				text-align: center;
				height: 100%;
				line-height: 1.17rem;
				color: #f5d387;
				position: relative;
				left: 10%;

				&:before {
					content: "";
					position: absolute;
					top: 50%;
					left: 26%;
					transform: translateY(-50%);
					width: .43rem;
					height: .43rem;
					background: url('../assets/images/login/qq_icon.png') center center no-repeat;
					background-size: cover;
				}
			}
		}
	}
</style>