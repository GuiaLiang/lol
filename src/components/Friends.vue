<template>
	<div class="friend-container">
		<div class="header-wrap" @touchend="changeTab">
			<div class="title friend" data-type="friend" :class="{cur: curTab==='friend'}">好友</div>
			<div class="title message" data-type="message" :class="{cur: curTab==='message'}">消息</div>
			<div class="add-icon" @touchend="showAddContent"></div>

			<div class="add-oper-wrap" v-show="isShowAdd">
				<div class="item"><span class="create-chat">发起群聊</span></div>
				<div class="item"><span class="add-friend">添加好友</span></div>
				<div class="item"><span class="friend-subscribe">好友订阅</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Friends',

		methods: {
			changeTab(e) {
				let target = e.target;
				if(target.className.indexOf('title') > -1 && target.className.indexOf('cur') < 0) {
					let type = target.getAttribute('data-type');
					this.curTab = type;
				}
			},

			showAddContent() {
				this.isShowAdd = !this.isShowAdd;
			},
		},

		data() {
			return {
				curTab: 'friend',
				isShowAdd: false
			}
		}
	}
</script>

<style lang="scss">
	@mixin addContent($img) {
		content: "";
		float: left;
		width: 0.56rem;
		height: 0.56rem;
		margin-top: 0.22rem;
		margin-left: 0.22rem;
		background: url('../assets/images/content/#{$img}') center no-repeat / contain;

	}

	.friend-container {
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;

		.header-wrap {
			width: 100%;
			height: 1rem;
			background: url('../assets/images/header_bg_big.jpg')  center no-repeat / cover;
			position: relative;

			.add-oper-wrap {
				position: absolute;
				top: 108%;
				right: 8%;
				width: 3.2rem;
				height: 3rem;
				background-color: rgba(0, 0, 0, .8);
				color: #fff;
				font-size: 28px;
				text-align: right;
				line-height: 1rem;

				&:before {
					content: "";
					position: absolute;
					top: -8%;
					right: 2%;
					transform: translateX(-0.2665rem);
					width: 0;
					height: 0;
					border: 0.14rem solid rgba(0, 0, 0, .8);
					border-top-color: transparent;
					border-left-color: transparent;
					border-right-color: transparent;

				}

				.item {
					width: 100%;
					height: 1rem;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(199,199,199,.6);
					padding-right: .5rem;

					&:last-child {
						border: none;
					}
				}

				.create-chat {
					&:before {
						@include addContent('create_new_conversion.png');
					}
				}

				.add-friend {
					&:before {
						@include addContent('add_new_friend.png');
					}
				}

				.friend-subscribe {
					&:before {
						@include addContent('subscribe_friend.png');
					}
				}
			}

			.add-icon {
				width: .533rem;
				height: .533rem;
				text-align: center;
				position: absolute;
				right: 10%;
				top: 50%;
				transform: translateY(-55%);
				color: #e4ce95;
				background: url('../assets/images/content/add_friend_btn_normal.png') center no-repeat / contain;
			}

			.title {
				width: 1.04rem;
				text-align: center;
				color: #e4ce95;
				position: absolute;
				top: 50%;
				transform: translateY(-55%);
				font-size: 30px;

				&.cur {
					font-size: 32px;
					color: #dedede;

					&:after {
						position: absolute;
						content: "";
						bottom: -0.16rem;
						left: 0;
						background: url('../assets/images/content/pager_tab_selected.png') center no-repeat / contain;
						width: 1.04rem;
						height: 0.1467rem;
					}
				}

				&.friend {
					left: 35%;
				}

				&.message {
					right: 35%;
				}
			}
		}
	}
</style>